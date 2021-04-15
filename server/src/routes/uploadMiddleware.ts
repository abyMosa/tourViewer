import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null, process.env.uploadPath!);
        cb(null, './dist/zips');
    },
    filename: (req, file, cb) => {
        if (!fs.existsSync('./dist/zips')) {
            fs.mkdirSync('./dist/zips');
        }

        const filePath = path.join('./dist/zips', file.originalname);
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

export const tourUploader = upload.single('tour');