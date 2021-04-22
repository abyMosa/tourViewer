const path = require("path");
// const rootDir = require('../helpers/path');
const StreamZip = require('node-stream-zip');
const fs = require("fs");

const unzip = async (filePath, unzipPath, cb) => {

    let zip = new StreamZip({ file: filePath, storeEntries: true });

    zip.on('error', function (err) {
        console.error('[ERROR]', err);
        // return new Promise((resolve, reject) => reject(err));
        cb({ error: true, err });
    });

    zip.on('ready', function () {
        console.log('All entries read: ' + zip.entriesCount);
        //console.log(zip.entries());
        cb({ error: false });
    });

    zip.on('entry', function (entry) {
        var pathname = path.resolve(unzipPath, entry.name);
        // if (/\.\./.test(path.relative(filePath, pathname))) {
        //     console.warn("[zip warn]: ignoring maliciously crafted paths in zip file:", entry.name);
        //     return;
        // }

        let has__MACOSX = pathname.indexOf('__MACOSX') !== -1;
        if (has__MACOSX) {
            console.warn('has __MACOSX -- file ignored', pathname.indexOf('__MACOSX'), pathname);
            return
        }

        if ('/' === entry.name[entry.name.length - 1]) {
            console.log('[DIR]', entry.name);
            return;
        }

        console.log('[FILE]', entry.name);

        zip.stream(entry.name, function (err, stream) {
            if (err) { console.error('Error:', err.toString()); return; }

            stream.on('error', function (err) { console.log('[ERROR]', err); return; });

            // // example: save contents to file
            fs.mkdir(path.dirname(pathname), { recursive: true }, err => {
                stream.pipe(fs.createWriteStream(pathname));
            });
        });


    });

}


const unzipSync = async (filePath, unzipPath) => {
    let zip = new StreamZip.async({ file: filePath, storeEntries: true });
    fs.mkdirSync(unzipPath);
    await zip.extract(null, unzipPath);
    await zip.close();
}



module.exports.unzip = unzip;
module.exports.unzipSync = unzipSync;