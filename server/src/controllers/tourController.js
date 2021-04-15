const Tour = require("../models/Tour");
const User = require("../models/User");
const mongoose = require('mongoose');
// import decompress from 'decompress';
const path = require("path");
const fs = require("fs");
// import { tourUploader } from "../routes/uploadMiddleware";
// import multer from 'multer';
// import extract from 'extract-zip';
// import DecompressZip from 'decompress-zip';


const getTour = async (req, res) => {
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

const deleteTour = async (req, res) => {
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


const getAllTours = async (req, res) => {
    let tours = await Tour.find().sort({ createdAt: -1 });
    res.status(200).send(tours);
};

const getUserTours = async (req, res) => {
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


const addTour = async (req, res) => {

    // tourUploader(req, res, async (err) => {

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


    // if req.body.filePath is undefined fail TODO::

    const { unzipPath, urlPath } = getStoragePaths(req.body.filePath, user._id);

    fs.unlink(req.body.filePath, (err) => {
        if (err) {
            console.log('err:: deleting the compressed file', err);
            return res.status(400).send(err);
        }

        return res.status(200).send('done');
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

    // unzipper.on('error', function (err) {
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

    // })

};

const getStoragePaths = (p, id) => {

    let folderName = path.basename(p, '.zip');
    let timeStamp = Date.now().toString();
    const urlPath = [id, timeStamp, folderName].join('/');
    const unzipPath = './public/tours/' + urlPath;
    createPublicFolder();
    return { unzipPath, urlPath }
}

const createPublicFolder = () => {
    if (!fs.existsSync('./public')) {
        fs.mkdirSync('./public');
    }

    if (!fs.existsSync('./public/tours')) {
        fs.mkdirSync('./public/tours');
    }
}


module.exports.getTour = getTour;
module.exports.deleteTour = deleteTour;
module.exports.getAllTours = getAllTours;
module.exports.getUserTours = getUserTours;
module.exports.addTour = addTour;