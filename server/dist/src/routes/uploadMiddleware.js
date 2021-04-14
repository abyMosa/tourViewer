"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tourUploader = void 0;
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, process.env.uploadPath!);
        // let uploadPath = process.env.NODE
        cb(null, './zips');
    },
    filename: function (req, file, cb) {
        var filePath = path_1.default.join('./zips', file.originalname);
        req.body.filePath = filePath;
        cb(null, file.originalname);
    },
});
var upload = multer_1.default({
    // storage,
    dest: './zips',
    fileFilter: function (req, file, cb) {
        cb(null, path_1.default.extname(file.originalname) === '.zip');
    }
});
exports.tourUploader = upload.single('tour');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkTWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInNyYy9yb3V0ZXMvdXBsb2FkTWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBNEI7QUFDNUIsOENBQXdCO0FBRXhCLElBQU0sT0FBTyxHQUFHLGdCQUFNLENBQUMsV0FBVyxDQUFDO0lBQy9CLFdBQVcsRUFBRSxVQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUN2QixxQ0FBcUM7UUFFckMsb0NBQW9DO1FBQ3BDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUNELFFBQVEsRUFBRSxVQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUNwQixJQUFNLFFBQVEsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDeEQsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Q0FDSixDQUFDLENBQUM7QUFHSCxJQUFNLE1BQU0sR0FBRyxnQkFBTSxDQUFDO0lBQ2xCLFdBQVc7SUFDWCxJQUFJLEVBQUUsUUFBUTtJQUNkLFVBQVUsRUFBRSxVQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUN0QixFQUFFLENBQUMsSUFBSSxFQUFFLGNBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLE1BQU0sQ0FBQyxDQUFDO0lBQ3pELENBQUM7Q0FDSixDQUFDLENBQUM7QUFFVSxRQUFBLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDIn0=