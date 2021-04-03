import { Request, Response } from "express";
import Tour, { ITour } from "../models/Tour";
import User from "../models/User";
import mongoose from 'mongoose';
import multer from 'multer';
// import AWS from "aws-sdk";
import { AWSS3 } from "../../awssdk";
// import { S3 } from "aws-sdk";



export let getTour = async (req: Request, res: Response) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send({ message: "Invalid tour id!" });

    let tour = await Tour.findById(req.params.id);
    if (!tour) {
        return res.status(400).send({
            error: true,
            message: `No tour found with id ${req.params.id}`
        })
    }
    return res.status(200).send(tour);
};

export let deleteTour = async (req: Request, res: Response) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send({ message: "Invalid tour id!" });

    let tour = await Tour.findById(req.params.id);
    if (!tour) {
        return res.status(400).send({
            error: true,
            message: `No tour found with id ${req.params.id}`
        })
    }

    try {
        const deleted = await tour.delete();
        res.status(200).send(deleted);

    } catch (error) {
        return res.status(400).send({
            error: true,
            message: `error ${error.message}`
        })
    }
};

export let getAllTours = async (req: Request, res: Response) => {
    let tours = await Tour.find().sort({ date: -1 });
    res.status(200).send(tours);
};

export let getUserTours = async (req: Request, res: Response) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send({ message: "Invalid user id!" });

    let user = await User.findById(req.params.id);
    if (!user) {
        return res.status(400).send({
            error: true,
            message: `No user found with id ${req.params.id}`
        })
    }

    let tours = await Tour.find({ user: req.params.id }).sort({ date: -1 });
    res.status(200).send(tours);
};


export let addTour = async (req: Request, res: any) => {
    if (!req.body.user)
        return res.status(400).send({ error: true, message: "user is required!" });

    if (!mongoose.Types.ObjectId.isValid(req.body.user))
        return res.status(400).send({ error: true, message: "Invalid user id!" });


    let user = await User.findById(req.body.user);
    if (!user) {
        return res.status(400).send({
            error: true,
            message: `Could not find a user with id ${req.body.device}`
        });
    }

    const tour: ITour = new Tour({
        name: req.body.name,
        image: req.body.image,
        url: req.body.url,
        user: req.body.user,
    });

    try {
        const addedTour = await tour.save();
        res.send(addedTour);

    } catch (error) {
        let errs = Object.keys(error.errors).map(er => error.errors[er].message);
        res.status(400).send({ error: true, message: errs.join(', ') });
    }
};


// export const s3sign = (req: Request, res: Response) => {

//     const fileName = req.body.fileName;
//     const fileType = req.body.fileType;
//     // Set up the payload of what we are sending to the S3 api
//     const s3Params = {
//         Bucket: process.env.AWS_BUCKET_NAME,
//         Key: fileName,
//         Expires: 50,
//         ContentType: fileType,
//         ACL: 'public-read'
//     };

//     // Make a request to the S3 API to get a signed URL which we can use to upload our file
//     AWSS3.getSignedUrl('putObject', s3Params, (err: any, data: any) => {
//         if (err) {
//             console.log(err);
//             res.json({ success: false, error: err })
//         }
//         // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
//         const returnData = {
//             signedRequest: data,
//             url: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileName}`
//         };
//         res.json({ success: true, aws: { returnData } });
//     });
// }

export const s3sign = (req: Request, res: Response) => {


    const s3Params = (fileName: string, fileType: string) => {
        return {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Expires: 50,
            ContentType: fileType,
            ACL: 'public-read'
        }
    };

    AWSS3.getSignedUrl('putObject', s3Params(req.body.image.fileName, req.body.image.fileType), (err: any, data: any) => {
        if (err) {
            console.log(err);
            res.json({ success: false, error: err })
        }
        // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.

        const imageReturnData = {
            signedRequest: data,
            url: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${req.body.image.fileName}`
        };

        AWSS3.getSignedUrl('putObject', s3Params(req.body.tour.fileName, req.body.tour.fileType), (error: any, tourData: any) => {
            if (error) {
                console.log(error);
                res.json({ success: false, error: error })
            }
            const tourReturnData = {
                signedRequest: tourData,
                url: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${req.body.tour.fileName}`
            };

            res.json({ success: true, aws: { image: imageReturnData, tour: tourReturnData } });
        })


    });
}