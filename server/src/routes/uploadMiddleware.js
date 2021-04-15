const multer = require('multer');
const path = require('path');
const fs = require('fs');

const setUploadFolder = () => {
    if (!fs.existsSync('./zips')) {
        fs.mkdirSync('./zips');
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null, process.env.uploadPath!);
        cb(null, './zips');
    },
    filename: (req, file, cb) => {

        const filePath = path.join('./zips', file.originalname);
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