const multer = require('multer');
const path = require('path');
const fs = require('fs');

const setUploadFolder = () => {
    if (!fs.existsSync(process.env.uploadPath)) {
        fs.mkdirSync(process.env.uploadPath);
    }

    if (!fs.existsSync('./public')) {
        fs.mkdirSync('./public');
    }

    if (!fs.existsSync(process.env.toursPublicPath)) {
        fs.mkdirSync(process.env.toursPublicPath);
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.uploadPath + '/');
    },
    filename: (req, file, cb) => {

        const filePath = path.join(process.env.uploadPath, file.originalname);
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

module.exports.tourUploader = upload.single('tour');
module.exports.setUploadFolder = setUploadFolder;