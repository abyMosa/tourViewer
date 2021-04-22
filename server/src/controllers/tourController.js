const Tour = require("../models/Tour");
const User = require("../models/User");
const mongoose = require('mongoose');
const decompress = require('decompress');
const path = require("path");
const rootDir = require('../helpers/path');
const fs = require("fs");
const { unzip, unzipSync } = require('../helpers/unzip');
// const JSZip = require('jszip');
// const mkdir = require('mkdirp');
// const unzip = require('unzip');
// const StreamZip = require('node-stream-zip');




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
        let tourseg = tour.url.split('/');
        tourseg.pop();
        tourseg.shift();
        const tourUrl = tourseg.join('/');
        const tourPath = path.join(rootDir, process.env.toursPublicPath, tourUrl);
        console.log(tourPath);

        fs.rmdir(tourPath, { recursive: true }, async (err) => {
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


        // let deleted = removeDir(tourPath);

        // if (!deleted) {
        //     return res.status(400).send({ error: true, message: 'unexpected error deleted false' })

        // } else {
        //     if (tour) {
        //         const deleted = await tour.delete();
        //         return res.status(200).send(deleted);
        //     } else {
        //         return res.status(500).send({ error: true, message: 'unexpected error' })
        //     }
        // }


    } catch (error) {
        return res.status(400).send({
            error: true,
            message: `error ${error.message}`
        })
    }
};

const removeDir = (path) => {
    if (fs.existsSync(path)) {
        const files = fs.readdirSync(path);

        if (files.length > 0) {
            files.forEach(function (filename) {
                if (fs.statSync(path + "/" + filename).isDirectory()) {
                    removeDir(path + "/" + filename);
                } else {
                    fs.unlinkSync(path + "/" + filename);
                }
            })
            fs.rmdirSync(path);
        } else {
            fs.rmdirSync(path);
        }

        return true;
    } else {
        return false;
    }
}

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

    req.connection.setTimeout(300000); //300 seconds

    const { unzipPath, urlPath } = getStoragePaths(req.body.filePath, user._id);

    // try {
    //     await decompress(req.body.filePath, unzipPath, {
    //         filter: file => {
    //             const fileAr = file.path.split("\\");
    //             return !fileAr.includes('__MACOSX') || !file.path.startsWith('__MACOSX');
    //         },
    //         strip: 1,
    //     });
    //     fs.unlink(req.body.filePath, (err) => {
    //         if (err) console.log('err:: deleting the compressed file', err);

    //         console.log('zip file deleted');
    //     })

    // } catch (error) {
    //     console.log(error);
    //     return res.status(400).send({ error: true, message: "error unzipping the tour, is it a zip file?", errorObj: error, filePath: req.body.filePath });
    // }

    unzip(req.body.filePath, unzipPath, async ({ error, err }) => {
        if (error)
            res.status(400).send({ error: true, message: 'error unzipping tour', err: err });

        fs.unlinkSync(req.body.filePath);
        console.log('zip file deleted');


        const tour = new Tour({
            name: req.body.name,
            url: 'tours/' + urlPath,
            user: req.body.user,
        });

        try {
            const addedTour = await tour.save();
            res.send(addedTour);

        } catch (error) {
            let errs = Object.keys(error.errors).map(er => error.errors[er].message);
            res.status(400).send({ error: true, message: errs.join(', ') });
        }
    });

    // try {
    //     await unzip(req.body.filePath, unzipPath);
    //     fs.unlink(req.body.filePath, (err) => {
    //         if (err) console.log('err:: deleting the compressed file', err);

    //         console.log('zip file deleted');
    //     })
    // } catch (error) {
    //     console.log(error);
    //     return res.status(400).send({
    //         error: true,
    //         message: "error unzipping the tour, is it a zip file?",
    //         errorObj: error,
    //         filePath: req.body.filePath
    //     });
    // }



};

const getStoragePaths = (p, id) => {

    let folderName = path.basename(p, '.zip');
    let timeStamp = Date.now().toString();
    const urlPath = [id, timeStamp, folderName].join('/');
    const unzipPath = path.resolve(rootDir, process.env.toursPublicPath, id.toString(), timeStamp);
    console.log(unzipPath);

    return { unzipPath, urlPath }
}


const updateTourName = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send({ error: true, message: "Invalid tour id!" });

    if (!req.body.name)
        return res.status(400).send({ error: true, message: "Tour Name Required!" });

    let tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(400).send({ error: true, message: "Tour not found" });

    const updatedTour = await Tour.findOneAndUpdate(
        { _id: tour._id },
        { $set: { name: req.body.name } },
    );

    if (!updatedTour) return res.status(400).send({ error: true, message: "Unexpected Error!!" });

    res.status(200).send(updatedTour);
};


module.exports.getTour = getTour;
module.exports.deleteTour = deleteTour;
module.exports.getAllTours = getAllTours;
module.exports.getUserTours = getUserTours;
module.exports.addTour = addTour;
module.exports.updateTourName = updateTourName;