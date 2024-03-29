const Tour = require("../models/Tour");
const User = require("../models/User");
const mongoose = require('mongoose');
// const decompress = require('decompress');
const path = require("path");
const { rootDir, pathToUpload, mkdirsSync } = require('../helpers/path');
const fs = require("fs");
const { unzip } = require('../helpers/unzip');
// const { url } = require("inspector");
var shell = require('shelljs');
const multer = require('multer');

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
    req.connection.setTimeout(3600000); //one hour
    console.log('zip file uploaded and addTour is now called');

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

    const { unzipPath, urlPath } = getStoragePaths(req.body.filePath, user._id);

    unzip(req.body.filePath, unzipPath, async ({ error, err }) => {
        if (error)
            res.status(400).send({ error: true, message: 'error unzipping tour', err: err });

        fs.unlinkSync(req.body.filePath);
        console.log('zip file deleted');

        let folderName = path.basename(req.body.filePath, '.zip');
        let filePath = path.resolve(unzipPath, folderName, 'tourData.json');

        let url = new URL(req.headers.referer);


        const tour = new Tour({
            name: req.body.name !== '' ? req.body.name : folderName,
            description: req.body.description,
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

        setTimeout(() => {
            if (url) {
                editTourData(filePath, urlPath, url.origin)
            }
            if (url.hostname !== "localhost") {
                shell.exec('pm2 restart 0', function (code, output) {
                    console.log('Exit code:', code);
                    console.log('Program output:', output);
                });
            }

        }, 4000);

    });
};

const editTourData = (filePath, urlPath, origin) => {

    let pathToTour = [origin, 'api', 'tours', urlPath].join('/');

    fs.access(filePath, fs.F_OK, (err) => {
        if (err) {
            console.error('fs access err', err);
            editTourData(filePath, urlPath, origin); // recursive
            return;
        }

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) console.log('fs read err', err);

            let json = JSON.parse(data);
            json.meshUrl = `${pathToTour}/mesh/mesh.mesh`;
            json.materialsUrl = `${pathToTour}/mesh/mesh.mtr`;
            json.meshTexturesPath = `${pathToTour}/mesh/`;
            json.collisionTreeUrl = `${pathToTour}/mesh/collision.cmesh`;
            json.highPolyCollisionTreeUrl = `${pathToTour}/mesh/highPolyCollision.cmesh`;
            json.panoramasPath = `${pathToTour}/pano/`;
            json.floors = json.floors.map(floor => {
                let imageName = floor.autoTextureUrl.split('/').reverse()[0];
                let userTextureImage = floor.userTextureUrl && floor.userTextureUrl.split('/').reverse()[0];
                return {
                    ...floor,
                    autoTextureUrl: `${pathToTour}/auto_floorplans/${imageName}`,
                    userTextureUrl: floor.userTextureUrl && `${pathToTour}/user_floorplans/${userTextureImage}`,
                }
            });

            fs.writeFile(filePath, JSON.stringify(json, null, 2), (err, result) => {
                if (err) console.log('fs write err', err);

                console.log('tourData Updated');
                return { error: false }
            });

        });

    })
}




const getStoragePaths = (p, id) => {

    let folderName = path.basename(p, '.zip');
    let timeStamp = Date.now().toString();
    const urlPath = [id, timeStamp, folderName].join('/');
    const unzipPath = path.resolve(rootDir, process.env.toursPublicPath, id.toString(), timeStamp);
    console.log(unzipPath);

    return { unzipPath, urlPath }
}


const updateTour = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send({ error: true, message: "Invalid tour id!" });

    if (!req.body.name && !req.body.description && !req.file)
        return res.status(400).send({ error: true, message: "Nothing to update!? one of the following is required: name, description or previewImage" });

    let tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(400).send({ error: true, message: "Tour not found" });

    if (req.file) {

        let tourPath = path.join(rootDir, 'public', tour.url);
        let previewLocation = path.join(tourPath, 'preview.jpg');
        let writeLocation = path.join(tourPath, 'preview-temp.jpg');

        fs.writeFile(writeLocation, req.file.buffer, 'binary', (e) => {
            if (e) {
                console.error(e);
                return res.status(400).send({ error: true, err: e, message: 'error writing buffer' });
            }

            fs.unlinkSync(previewLocation);
            fs.rename(writeLocation, previewLocation, err => {
                if (err) {
                    console.error(err);
                    return res.status(400).send({ error: true, err, message: 'error renaming' });
                }
            })

        });
    }

    let toUpdate = {}
    if (req.body.name && req.body.name !== '') {
        toUpdate.name = req.body.name;
    }
    if (req.body.description && req.body.description !== '') {
        toUpdate.description = req.body.description;
    }

    const updatedTour = await Tour.findOneAndUpdate(
        { _id: tour._id },
        { $set: toUpdate },
    );

    if (!updatedTour) return res.status(400).send({ error: true, message: "Unexpected Error!!" });

    res.status(200).send(updatedTour);
};

const updateFullTour = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send({ error: true, message: "Invalid tour id!" });

    if (!req.body.name && !req.body.description && !req.files)
        return res.status(400).send({ error: true, message: "Nothing to update!? one of the following is required: name, description or previewImage" });

    let tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(400).send({ error: true, message: "Tour not found" });

    if (req.files) {
        req.files.forEach(file => {
            console.log(file.fieldname);
            switch (file.fieldname) {
                case "previewImage":
                    replaceFile(tour, file, 'preview.jpg');
                    console.log('replace previewImage');
                    break;
                case "userDataFile":
                    replaceFile(tour, file, 'userData.json');
                    console.log('replace UserData file');
                    break;
                case "tourDataFile":
                    replaceFile(tour, file, 'tourData.json');
                    console.log('replace tourData file');
                    break;

                default:
                    break;
            }
        });

    }

    let toUpdate = {}
    if (req.body.name && req.body.name !== '') {
        toUpdate.name = req.body.name;
    }
    if (req.body.description && req.body.description !== '') {
        toUpdate.description = req.body.description;
    }

    const updatedTour = await Tour.findOneAndUpdate(
        { _id: tour._id },
        { $set: toUpdate },
    );

    if (!updatedTour) return res.status(400).send({ error: true, message: "Unexpected Error!!" });

    res.status(200).send(updatedTour);
};

const replaceFile = (tour, file, fileNameIncExt) => {
    let tourPath = path.join(rootDir, 'public', tour.url);
    let fileLocation = path.join(tourPath, fileNameIncExt);
    let writeLocation = path.join(tourPath, `temp-${fileNameIncExt}`);

    fs.writeFile(writeLocation, file.buffer, 'binary', (e) => {
        if (e) {
            console.error(e);
            // return res.status(400).send({ error: true, err: e, message: 'error writing buffer' });
        }

        fs.unlinkSync(fileLocation);
        fs.rename(writeLocation, fileLocation, err => {
            if (err) {
                console.error(err);
                // return res.status(400).send({ error: true, err, message: 'error renaming' });
            }
        })
    });
}

const uploadTourChunks = async (req, res) => {

    console.log('file upload...');
    // Create a folder based on the file hash and move the default uploaded files under the current hash folder.Convenient for subsequent file merge.
    const { name, total, index, size, hash } = req.body;

    console.log('hash & index', hash, index);
    console.log('req.file.path', req.file.path);

    const uploadPath = pathToUpload();
    const chunksPath = path.join(uploadPath, hash, '/');
    if (!fs.existsSync(chunksPath)) mkdirsSync(chunksPath);
    fs.renameSync(req.file.path, chunksPath + hash + '-' + index);

    return res.status(200).send('Success');
}

const mergeTourChunks = async (req, res) => {

    const { size, name, total, hash, tourName, description, user } = req.body;
    // Get the slice file based on the hash value.
    // Create Storage File
    // merge.
    const uploadPath = pathToUpload();
    const chunksPath = path.join(uploadPath, hash, '/');
    const filePath = path.join(uploadPath, name);
    // Read all chunks file names stored in the array
    const chunks = fs.readdirSync(chunksPath);
    // Create Storage File
    fs.writeFileSync(filePath, '');
    if (chunks.length !== total || chunks.length === 0) {
        return res.status(400).send('Number of slice files does not match');
    }

    for (let i = 0; i < total; i++) {
        // Append Write to File
        fs.appendFileSync(filePath, fs.readFileSync(chunksPath + hash + '-' + i));
        // Delete chunk used this time
        fs.unlinkSync(chunksPath + hash + '-' + i);
    }
    fs.rmdirSync(chunksPath);

    const { unzipPath, urlPath } = getStoragePaths(filePath, user);
    return unzipTour(filePath, unzipPath, urlPath, tourName, description, user, req.headers.referer, res);

    // File merge succeeded, file information can be stored in the library.
    // return res.status(200).send('Merge succeeded');
}

const unzipTour = async (zipPath, unzipPath, urlPath, name, description, user, referer, res) => {
    unzip(zipPath, unzipPath, async ({ error, err }) => {
        if (error)
            return res.status(400).send({ error: true, message: 'error unzipping tour', err: err });

        fs.unlinkSync(zipPath);
        console.log('zip file deleted');

        let folderName = path.basename(zipPath, '.zip');
        let filePath = path.resolve(unzipPath, folderName, 'tourData.json');

        let url = new URL(referer);

        const tour = new Tour({
            name: name !== '' ? name : folderName,
            description: description,
            url: 'tours/' + urlPath,
            user: user,
        });

        try {
            const addedTour = await tour.save();
            res.status(200).send(addedTour);

        } catch (error) {
            // let errs = Object.keys(error.errors).map(er => error.errors[er].message);
            // res.status(400).send({ error: true, message: errs.join(', ') });
            res.status(400).send({ error: true, message: 'Error Adding Tour', errs: error });
        }

        return setTimeout(() => {
            if (url) {
                editTourData(filePath, urlPath, url.origin)
            }
            if (url.hostname !== "localhost") {
                shell.exec('pm2 restart 0', function (code, output) {
                    console.log('Exit code:', code);
                    console.log('Program output:', output);
                });
            }

        }, 4000);

    });
}


const renderTour = async (req, res) => {
    let id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).send({ error: true, message: "Invalid tour id!" });

    let tour = await Tour.findById(id);
    if (!tour) return res.status(400).send({ error: true, message: "Tour not found" });


    let APP_URL = process.env.APP_URL;
    let geoCvId = tour.url.split('/').reverse()[0];
    let tourUrlAr = tour.url.split('/');
    let imageUrl = [APP_URL, tourUrlAr.join('/'), 'preview.jpg'].join('/');
    let pageUrl = [APP_URL, 'tours', id].join('/');

    tourUrlAr.pop();
    let tourUrlNoGeoId = tourUrlAr.join('/') + '/';
    let contentPath = [APP_URL, tourUrlNoGeoId].join('/');
    let viewerLink = `${APP_URL}/viewer?id=${id}&tour=${geoCvId}&content-path=${contentPath}`;


    let description = tour.description;
    let title = tour.name || geoCvId;
    let pageTitle = `${title} | ${process.env.APP_NAME}`;
    let siteName = process.env.APP_NAME;

    res.status(200).render('tour', { siteName, pageTitle, imageUrl, description, viewerLink, pageUrl });
}


const updateTourData = async (req, res) => {


    if (!mongoose.Types.ObjectId.isValid(req.body.tour._id))
        return res.status(400).send({ error: true, message: "Invalid tour id!" });

    if (!req.body.tourData)
        return res.status(400).send({ error: true, message: "Tour Data required" });

    let tour = await Tour.findById(req.body.tour._id);
    if (!tour) return res.status(400).send({ error: true, message: "Tour not found" });

    let tourPath = path.join(rootDir, 'public', tour.url);
    let fileLocation = path.join(tourPath, 'tourData.json');
    console.log('fileLocation', fileLocation);

    fs.writeFile(fileLocation, JSON.stringify(req.body.tourData, null, 2), (err, result) => {
        if (err) {
            console.log('fs write err', err);
            return res.status(400).send({ error: true, message: "error writing TourData.json", err });
        }

        console.log('tourData Updated');
        return res.status(200).send();
    });
}

const updateUserData = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.body.tour._id))
        return res.status(400).send({ error: true, message: "Invalid tour id!" });

    if (!req.body.userData)
        return res.status(400).send({ error: true, message: "User Data required" });

    let tour = await Tour.findById(req.body.tour._id);
    if (!tour) return res.status(400).send({ error: true, message: "Tour not found" });

    let tourPath = path.join(rootDir, 'public', tour.url);
    let fileLocation = path.join(tourPath, 'userData.json');
    console.log('fileLocation', fileLocation);

    fs.writeFile(fileLocation, JSON.stringify(req.body.userData, null, 2), (err, result) => {
        if (err) {
            console.log('fs write err', err);
            return res.status(400).send({ error: true, message: "error writing userData.json", err });
        }

        console.log('userData Updated');
        return res.status(200).send();
    });
}


module.exports.getTour = getTour;
module.exports.deleteTour = deleteTour;
module.exports.getAllTours = getAllTours;
module.exports.getUserTours = getUserTours;
module.exports.addTour = addTour;
module.exports.updateTour = updateTour;
module.exports.updateFullTour = updateFullTour;
module.exports.uploadTourChunks = uploadTourChunks;
module.exports.mergeTourChunks = mergeTourChunks;
module.exports.renderTour = renderTour;
module.exports.updateTourData = updateTourData;
module.exports.updateUserData = updateUserData;