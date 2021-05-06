const multer = require('multer');
const path = require('path');
const { rootDir, pathToUpload, mkdirsSync } = require('../helpers/path');
const fs = require('fs');

const setUploadFolder = () => {


    // const pathToUpload = path.resolve(rootDir, process.env.uploadPath);
    const pathToPublic = path.resolve(rootDir, 'public');
    const pathToPublicTours = path.resolve(rootDir, process.env.toursPublicPath);

    // console.log(pathToUpload, pathToPublic, pathToPublicTours);

    if (!fs.existsSync(pathToUpload())) {
        fs.mkdirSync(pathToUpload());
    }

    if (!fs.existsSync(pathToPublic)) {
        fs.mkdirSync(pathToPublic);
    }

    if (!fs.existsSync(pathToPublicTours)) {
        fs.mkdirSync(pathToPublicTours);
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // const pathToUpload() = path.resolve(rootDir, process.env.uploadPath);
        cb(null, pathToUpload());
    },
    filename: (req, file, cb) => {
        // const pathToUpload() = path.resolve(rootDir, process.env.uploadPath);
        const uploadPath = pathToUpload();
        const filePath = path.join(uploadPath, file.originalname);
        req.body.filePath = filePath;
        cb(null, file.originalname);
    },
});


const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        cb(null, path.extname(file.originalname) === '.zip');
    }
});


const previewImageStorage = multer.memoryStorage();
const previewImageUploader = multer({
    storage: previewImageStorage,
    fileFilter: (req, file, cb) => {
        cb(null, path.extname(file.originalname) === '.jpg');
    }
});





const chunkStorage = multer.diskStorage({
    destination: (req, file, cb) => {

        const uploadPath = pathToUpload();
        const uploadTempPath = path.join(uploadPath, 'temp');

        if (!fs.existsSync(uploadTempPath)) mkdirsSync(uploadTempPath);
        cb(null, uploadTempPath);
    },
    // filename: (req, file, cb) => {
    //     cb(null, file.originalname);
    // },
});

const chunkUpload = multer({
    storage: chunkStorage,
    // fileFilter: (req, file, cb) => {
    //     cb(null, path.extname(file.originalname) === '.zip');
    // }
});



module.exports.tourUploader = upload.single('tour');
module.exports.chunkUploader = chunkUpload.single('file');
module.exports.previewImageUploader = previewImageUploader.single('previewImage');

module.exports.setUploadFolder = setUploadFolder;