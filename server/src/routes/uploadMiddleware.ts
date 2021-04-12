import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.uploadPath!);
    },
    filename: (req, file, cb) => {
        const filePath = path.join(process.env.uploadPath!, file.originalname);
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