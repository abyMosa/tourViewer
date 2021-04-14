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
    fileFilter: function (req, file, cb) {
        cb(null, path_1.default.extname(file.originalname) === '.zip');
    }
});
exports.tourUploader = upload.single('tour');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkTWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInNyYy9yb3V0ZXMvdXBsb2FkTWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBNEI7QUFDNUIsOENBQXdCO0FBRXhCLElBQU0sT0FBTyxHQUFHLGdCQUFNLENBQUMsV0FBVyxDQUFDO0lBQy9CLFdBQVcsRUFBRSxVQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUN2QixxQ0FBcUM7UUFDckMsRUFBRSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0QsUUFBUSxFQUFFLFVBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ3BCLElBQU0sUUFBUSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM3RCxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDN0IsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDaEMsQ0FBQztDQUNKLENBQUMsQ0FBQztBQUdILElBQU0sTUFBTSxHQUFHLGdCQUFNLENBQUM7SUFDbEIsT0FBTyxTQUFBO0lBQ1AsVUFBVSxFQUFFLFVBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ3RCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsY0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssTUFBTSxDQUFDLENBQUM7SUFDekQsQ0FBQztDQUNKLENBQUMsQ0FBQztBQUVVLFFBQUEsWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMifQ==