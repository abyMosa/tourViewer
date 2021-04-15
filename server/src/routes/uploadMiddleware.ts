import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null, process.env.uploadPath!);

        // let uploadPath = process.env.NODE
        cb(null, './dist/zips');
    },
    filename: (req, file, cb) => {
        const filePath = path.join('./dist/zips', file.originalname);
        req.body.filePath = filePath;
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage,
    // dest: './zips',
    fileFilter: (req, file, cb) => {
        cb(null, path.extname(file.originalname) === '.zip');
    }
});

export const tourUploader = upload.single('tour');