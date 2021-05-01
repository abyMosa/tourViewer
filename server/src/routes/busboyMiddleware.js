const path = require('path');
const rootDir = require('../helpers/path');
const fs = require('fs');

const busboyMeddleWare = (req, res, next) => {

    req.pipe(req.busboy);

    let user = null;
    let name = null;

    req.busboy.on('field', (fieldName, value) => {
        if (fieldName === 'user') {
            user = value;
            console.log(`User '${user} `);
            req.body.user = user;
        }

        if (fieldName === 'name') {
            name = value;
            console.log(`name '${name} `);
            req.body.name = name;
        }
    });

    req.busboy.on('file', (fieldname, file, filename) => {
        console.log(`Upload of '${filename}' started`);
        console.log('fieldname', fieldname, process.env.uploadPath);

        const pathToUpload = path.resolve(rootDir, process.env.uploadPath);
        const filePath = path.join(pathToUpload, path.basename(filename, '.zip'));
        req.body.filePath = filePath;

        // Create a write stream of the new file
        const fstream = fs.createWriteStream(path.join(pathToUpload, filename));
        // Pipe it trough
        file.pipe(fstream);

        // On finish of the upload
        fstream.on('close', () => {
            console.log(`Upload of '${filename}' finished`);
            // res.redirect('back');
            next();
        });
    });

}


module.exports.busboyMeddleWare = busboyMeddleWare;