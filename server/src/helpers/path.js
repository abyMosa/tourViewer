const path = require('path');
const fs = require('fs-extra');

const mkdirsSync = (dirname) => {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

const rootDir = path.dirname(process.mainModule.filename);
const pathToUpload = () => path.resolve(rootDir, process.env.uploadPath);

module.exports.rootDir = rootDir;
module.exports.pathToUpload = pathToUpload;
module.exports.mkdirsSync = mkdirsSync;