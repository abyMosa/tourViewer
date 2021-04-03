"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cpUpload = void 0;
var multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.memoryStorage();
var upload = multer_1.default({ storage: storage }).single('tour');
var cpUpload = function (req, res, fn) { return ; };
exports.cpUpload = cpUpload;
 instanceof multer_1.default.MulterError;
{
    // A Multer error occurred when uploading.
    return res.status(400).send({ error: err });
}
if (err) {
    // An unknown error occurred when uploading.
    return res.status(400).send({ unknownError: err });
}
// const files = req.files as { [fieldname: string]: Express.Multer.File[] };
// // let imageFile = files.image[0];
// let tourFile = files.tour[0];
return res.status(200).send({ file: req.file });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkTWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInNyYy9oZWxwZXJzL3VwbG9hZE1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0Esa0RBQTRCO0FBRTVCLElBQUksT0FBTyxHQUFHLGdCQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7QUFDckMsSUFBTSxNQUFNLEdBQUcsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sU0FBQSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7QUFHM0MsSUFBTSxRQUFRLEdBQUcsVUFBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBRTVDLElBQUMsT0FBQSxBQUFELEVBQUMsQ0FBRCxDQUFBO0FBRkcsUUFBQSxRQUFRLFlBRVg7QUFBQyxBQUFELFlBQVksZ0JBQU0sQ0FBQyxXQUFXLENBQUE7QUFBRTtJQUN0QywwQ0FBMEM7SUFDMUMsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0NBQy9DO0FBQU0sSUFBSSxHQUFHLEVBQUU7SUFDWiw0Q0FBNEM7SUFDNUMsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0NBQ3REO0FBSUQsNkVBQTZFO0FBRzdFLHFDQUFxQztBQUNyQyxnQ0FBZ0M7QUFFaEMsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyJ9