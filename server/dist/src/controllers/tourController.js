"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3sign = exports.addTour = exports.getUserTours = exports.getAllTours = exports.deleteTour = exports.getTour = void 0;
var Tour_1 = __importDefault(require("../models/Tour"));
var User_1 = __importDefault(require("../models/User"));
var mongoose_1 = __importDefault(require("mongoose"));
// import AWS from "aws-sdk";
var awssdk_1 = require("../../awssdk");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var uploadMiddleware_1 = require("../routes/uploadMiddleware");
var multer_1 = __importDefault(require("multer"));
var getTour = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tour;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id))
                    return [2 /*return*/, res.status(400).send({ message: "Invalid tour id!" })];
                return [4 /*yield*/, Tour_1.default.findById(req.params.id)];
            case 1:
                tour = _a.sent();
                if (!tour) {
                    return [2 /*return*/, res.status(400).send({
                            error: true,
                            message: "No tour found with id " + req.params.id
                        })];
                }
                return [2 /*return*/, res.status(200).send(tour)];
        }
    });
}); };
exports.getTour = getTour;
var deleteTour = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tour;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id))
                    return [2 /*return*/, res.status(400).send({ message: "Invalid tour id!" })];
                return [4 /*yield*/, Tour_1.default.findById(req.params.id)];
            case 1:
                tour = _a.sent();
                if (!tour) {
                    return [2 /*return*/, res.status(400).send({
                            error: true,
                            message: "No tour found with id " + req.params.id
                        })];
                }
                try {
                    fs_1.default.rmdir('./dist/public/' + tour.url, { recursive: true }, function (err) { return __awaiter(void 0, void 0, void 0, function () {
                        var deleted;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (err) {
                                        console.log("Not Folder", err);
                                        return [2 /*return*/, res.status(400).send({
                                                error: true,
                                                message: 'unexpected error',
                                                errorObj: err
                                            })];
                                    }
                                    console.log("Folder Deleted!");
                                    if (!tour) return [3 /*break*/, 2];
                                    return [4 /*yield*/, tour.delete()];
                                case 1:
                                    deleted = _a.sent();
                                    return [2 /*return*/, res.status(200).send(deleted)];
                                case 2: return [2 /*return*/, res.status(500).send({ error: true, message: 'unexpected error' })];
                            }
                        });
                    }); });
                }
                catch (error) {
                    return [2 /*return*/, res.status(400).send({
                            error: true,
                            message: "error " + error.message
                        })];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.deleteTour = deleteTour;
var getAllTours = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tours;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Tour_1.default.find().sort({ createdAt: -1 })];
            case 1:
                tours = _a.sent();
                res.status(200).send(tours);
                return [2 /*return*/];
        }
    });
}); };
exports.getAllTours = getAllTours;
var getUserTours = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, tours;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id))
                    return [2 /*return*/, res.status(400).send({ message: "Invalid user id!" })];
                return [4 /*yield*/, User_1.default.findById(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).send({
                            error: true,
                            message: "No user found with id " + req.params.id
                        })];
                }
                return [4 /*yield*/, Tour_1.default.find({ user: req.params.id }).sort({ createdAt: -1 })];
            case 2:
                tours = _a.sent();
                res.status(200).send(tours);
                return [2 /*return*/];
        }
    });
}); };
exports.getUserTours = getUserTours;
var addTour = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        uploadMiddleware_1.tourUploader(req, res, function (err) { return __awaiter(void 0, void 0, void 0, function () {
            var user, unzipPath, urlPath, tour, addedTour, error_1, errs;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!req.body.user)
                            return [2 /*return*/, res.status(400).send({ error: true, message: "user is required!" })];
                        if (!mongoose_1.default.Types.ObjectId.isValid(req.body.user))
                            return [2 /*return*/, res.status(400).send({ error: true, message: "Invalid user id!" })];
                        return [4 /*yield*/, User_1.default.findById(req.body.user)];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(400).send({
                                    error: true,
                                    message: "Could not find a user with id " + req.body.user
                                })];
                        }
                        if (!req.body.filePath) {
                            return [2 /*return*/, res.status(400).send({
                                    error: true,
                                    message: "Could not find a req.body.filePath " + req.body.filePath
                                })];
                        }
                        // else { return res.send({ filePath: req.body.filePath }); }
                        if (err instanceof multer_1.default.MulterError) {
                            // A Multer error occurred when uploading.
                            res.status(400).send(err);
                        }
                        else if (err) {
                            // An unknown error occurred when uploading.
                            res.status(400).send(err);
                        }
                        unzipPath = (_a = getStoragePaths(req.body.filePath, user._id), _a.unzipPath), urlPath = _a.urlPath;
                        tour = new Tour_1.default({
                            name: req.body.name,
                            url: 'tours/' + urlPath,
                            user: req.body.user,
                        });
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, tour.save()];
                    case 3:
                        addedTour = _b.sent();
                        res.send(addedTour);
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        errs = Object.keys(error_1.errors).map(function (er) { return error_1.errors[er].message; });
                        res.status(400).send({ error: true, message: errs.join(', ') });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
exports.addTour = addTour;
var getStoragePaths = function (p, id) {
    var folderName = path_1.default.basename(p, '.zip');
    var timeStamp = Date.now().toString();
    var urlPath = [id, timeStamp, folderName].join('/');
    // const unzipPath = './dist/public/tours/' + folderName;
    var unzipPath = './dist/public/tours/' + urlPath;
    createPublicFolder();
    return { unzipPath: unzipPath, urlPath: urlPath };
};
var createPublicFolder = function () {
    if (!fs_1.default.existsSync('./dist/public')) {
        fs_1.default.mkdirSync('./dist/public');
    }
    if (!fs_1.default.existsSync('./dist/public/tours')) {
        fs_1.default.mkdirSync('./dist/public/tours');
    }
    // if (!fs.existsSync(`./dist/public/tours/${folderName}`)) {
    //     fs.mkdirSync(`./dist/public/tours/${folderName}`);
    // }
};
// export const s3sign = (req: Request, res: Response) => {
//     const fileName = req.body.fileName;
//     const fileType = req.body.fileType;
//     // Set up the payload of what we are sending to the S3 api
//     const s3Params = {
//         Bucket: process.env.AWS_BUCKET_NAME,
//         Key: fileName,
//         Expires: 50,
//         ContentType: fileType,
//         ACL: 'public-read'
//     };
//     // Make a request to the S3 API to get a signed URL which we can use to upload our file
//     AWSS3.getSignedUrl('putObject', s3Params, (err: any, data: any) => {
//         if (err) {
//             console.log(err);
//             res.json({ success: false, error: err })
//         }
//         // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
//         const returnData = {
//             signedRequest: data,
//             url: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileName}`
//         };
//         res.json({ success: true, aws: { returnData } });
//     });
// }
var s3sign = function (req, res) {
    var s3Params = function (fileName, fileType) {
        return {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Expires: 50,
            ContentType: fileType,
            ACL: 'public-read'
        };
    };
    awssdk_1.AWSS3.getSignedUrl('putObject', s3Params(req.body.image.fileName, req.body.image.fileType), function (err, data) {
        if (err) {
            console.log(err);
            res.json({ success: false, error: err });
        }
        // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
        var imageReturnData = {
            signedRequest: data,
            url: "https://" + process.env.AWS_BUCKET_NAME + ".s3.amazonaws.com/" + req.body.image.fileName
        };
        awssdk_1.AWSS3.getSignedUrl('putObject', s3Params(req.body.tour.fileName, req.body.tour.fileType), function (error, tourData) {
            if (error) {
                console.log(error);
                res.json({ success: false, error: error });
            }
            var tourReturnData = {
                signedRequest: tourData,
                url: "https://" + process.env.AWS_BUCKET_NAME + ".s3.amazonaws.com/" + req.body.tour.fileName
            };
            res.json({ success: true, aws: { image: imageReturnData, tour: tourReturnData } });
        });
    });
};
exports.s3sign = s3sign;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG91ckNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzcmMvY29udHJvbGxlcnMvdG91ckNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0RBQTZDO0FBQzdDLHdEQUFrQztBQUNsQyxzREFBZ0M7QUFDaEMsNkJBQTZCO0FBQzdCLHVDQUFxQztBQUVyQyw4Q0FBd0I7QUFDeEIsMENBQW9CO0FBQ3BCLCtEQUEwRDtBQUMxRCxrREFBNEI7QUFLckIsSUFBSSxPQUFPLEdBQUcsVUFBTyxHQUFZLEVBQUUsR0FBYTs7Ozs7Z0JBQ25ELElBQUksQ0FBQyxrQkFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO29CQUMvQyxzQkFBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxDQUFDLEVBQUM7Z0JBRXRELHFCQUFNLGNBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBQTs7Z0JBQXpDLElBQUksR0FBRyxTQUFrQztnQkFDN0MsSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDUCxzQkFBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQzs0QkFDeEIsS0FBSyxFQUFFLElBQUk7NEJBQ1gsT0FBTyxFQUFFLDJCQUF5QixHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUk7eUJBQ3BELENBQUMsRUFBQTtpQkFDTDtnQkFDRCxzQkFBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQzs7O0tBQ3JDLENBQUM7QUFaUyxRQUFBLE9BQU8sV0FZaEI7QUFFSyxJ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