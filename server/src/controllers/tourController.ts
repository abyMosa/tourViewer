import { Request, Response } from "express";
import Tour, { ITour } from "../models/Tour";
import User from "../models/User";
import mongoose from 'mongoose';
// import AWS from "aws-sdk";
import { AWSS3 } from "../../awssdk";
import decompress from 'decompress';
import path from "path";
import fs from "fs";
import { tourUploader } from "../routes/uploadMiddleware";
import multer from 'multer';
import extract from 'extract-zip';
import DecompressZip from 'decompress-zip';


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

        fs.rmdir('./dist/public/' + tour.url, { recursive: true }, async (err) => {
            if (err) {
                console.log("Not Folder", err);
                return res.status(400).send({
                    error: true,
                    message: 'unexpected error',
                    errorObj: err
                })
            }

            console.log("Folder Deleted!");
            if (tour) {
                const deleted = await tour.delete();
                return res.status(200).send(deleted);
            } else {
                return res.status(500).send({ error: true, message: 'unexpected error' })
            }
        });


    } catch (error) {
        return res.status(400).send({
            error: true,
            message: `error ${error.message}`
        })
    }
};


export let getAllTours = async (req: Request, res: Response) => {
    let tours = await Tour.find().sort({ createdAt: -1 });
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

    let tours = await Tour.find({ user: req.params.id }).sort({ createdAt: -1 });
    res.status(200).send(tours);
};


export let addTour = async (req: Request, res: any) => {

    tourUploader(req, res, async (err: any) => {

        if (!req.body.user)
            return res.status(400).send({ error: true, message: "user is required!" });

        if (!mongoose.Types.ObjectId.isValid(req.body.user))
            return res.status(400).send({ error: true, message: "Invalid user id!" });


        let user = await User.findById(req.body.user);
        if (!user) {
            return res.status(400).send({
                error: true,
                message: `Could not find a user with id ${req.body.user}`
            });
        }

        if (!req.body.filePath) {
            return res.status(400).send({
                error: true,
                message: `Could not find a req.body.filePath ${req.body.filePath}`
            });
        }
        // else { return res.send({ filePath: req.body.filePath }); }


        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            return res.status(400).send(err);
        } else if (err) {
            // An unknown error occurred when uploading.
            return res.status(400).send(err);
        }

        // if req.body.filePath is undefined fail TODO::

        const { unzipPath, urlPath } = getStoragePaths(req.body.filePath, user._id);

        fs.unlink(req.body.filePath, (err) => {
            if (err) {
                console.log('err:: deleting the compressed file', err);
                return res.status(400).send(err);
            }

            return res.status(200);
        })

        // try {
        //     await decompress(req.body.filePath, unzipPath);
        //     fs.unlink(req.body.filePath, (err) => {
        //         if (err) console.log('err:: deleting the compressed file', err);

        //         console.log('zip file deleted');
        //     })

        // } catch (error) {
        //     console.log(error);
        //     return res.status(400).send({ error: true, message: "error unzipping the tour, is it a zip file?" });
        // }

        // try {
        //     await extract(req.body.filePath, { dir: unzipPath, defaultDirMode: 0o777 });
        //     fs.unlink(req.body.filePath, (err) => {
        //         if (err) console.log('err:: deleting the compressed file', err);

        //         console.log('zip file deleted');
        //     })

        // } catch (error) {
        //     // console.log(error);
        //     return res.status(400).send({ error: true, message: "error unzipping the tour, is it a zip file?", errorObj: error });
        // }

        // var unzipper = new DecompressZip(req.body.filePath);
        // unzipper.extract({
        //     path: unzipPath,
        //     // restrict: true
        // });

        // unzipper.on('error', function (err: any) {
        //     // console.log('Caught an error');
        //     return res.status(400).send({ error: true, message: "error unzipping the tour, is it a zip file?", errorObj: err });
        // });

        // unzipper.on('extract', async () => {

        //     fs.unlink(req.body.filePath, (err) => {
        //         if (err) console.log('err:: deleting the compressed file', err);

        //         console.log('zip file deleted');
        //     })

        //     const tour: ITour = new Tour({
        //         name: req.body.name,
        //         url: 'tours/' + urlPath,
        //         user: req.body.user,
        //     });

        //     try {
        //         const addedTour = await tour.save();
        //         res.send(addedTour);

        //     } catch (error) {
        //         let errs = Object.keys(error.errors).map(er => error.errors[er].message);
        //         res.status(400).send({ error: true, message: errs.join(', ') });
        //     }

        // });



        // const tour: ITour = new Tour({
        //     name: req.body.name,
        //     url: 'tours/' + urlPath,
        //     user: req.body.user,
        // });

        // try {
        //     const addedTour = await tour.save();
        //     res.send(addedTour);

        // } catch (error) {
        //     let errs = Object.keys(error.errors).map(er => error.errors[er].message);
        //     res.status(400).send({ error: true, message: errs.join(', ') });
        // }

    })

};

const getStoragePaths = (p: string, id: string) => {

    let folderName = path.basename(p, '.zip');
    let timeStamp = Date.now().toString();
    const urlPath = [id, timeStamp, folderName].join('/');
    const unzipPath = './dist/public/tours/' + urlPath;
    createPublicFolder();
    return { unzipPath, urlPath }
}

const createPublicFolder = () => {
    if (!fs.existsSync('./dist/public')) {
        fs.mkdirSync('./dist/public');
    }

    if (!fs.existsSync('./dist/public/tours')) {
        fs.mkdirSync('./dist/public/tours');
    }
}

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