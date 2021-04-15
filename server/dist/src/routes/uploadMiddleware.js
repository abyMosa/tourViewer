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
        cb(null, './dist/zips');
    },
    filename: function (req, file, cb) {
        var filePath = path_1.default.join('./dist/zips', file.originalname);
        req.body.filePath = filePath;
        cb(null, file.originalname);
    },
});
var upload = multer_1.default({
    storage: storage,
    // dest: './zips',
    fileFilter: function (req, file, cb) {
        cb(null, path_1.default.extname(file.originalname) === '.zip');
    }
});
exports.tourUploader = upload.single('tour');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkTWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInNyYy9yb3V0ZXMvdXBsb2FkTWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBNEI7QUFDNUIsOENBQXdCO0FBRXhCLElBQU0sT0FBTyxHQUFHLGdCQUFNLENBQUMsV0FBVyxDQUFDO0lBQy9CLFdBQVcsRUFBRSxVQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUN2QixxQ0FBcUM7UUFFckMsb0NBQW9DO1FBQ3BDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNELFFBQVEsRUFBRSxVQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUNwQixJQUFNLFFBQVEsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDN0QsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Q0FDSixDQUFDLENBQUM7QUFFSCxJQUFNLE1BQU0sR0FBRyxnQkFBTSxDQUFDO0lBQ2xCLE9BQU8sU0FBQTtJQUNQLGtCQUFrQjtJQUNsQixVQUFVLEVBQUUsVUFBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDdEIsRUFBRSxDQUFDLElBQUksRUFBRSxjQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxNQUFNLENBQUMsQ0FBQztJQUN6RCxDQUFDO0NBQ0osQ0FBQyxDQUFDO0FBRVUsUUFBQSxZQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyJ9