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
var decompress_1 = __importDefault(require("decompress"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
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
    var user, unzipPath, urlPath, error_1, tour, addedTour, error_2, errs;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                // if (!req.body.user)
                //     return res.status(400).send({ error: true, message: "user is required!" });
                // if (!mongoose.Types.ObjectId.isValid(req.body.user))
                //     return res.status(400).send({ error: true, message: "Invalid user id!" });
                // let user = await User.findById(req.body.user);
                // if (!user) {
                //     return res.status(400).send({
                //         error: true,
                //         message: `Could not find a user with id ${req.body.device}`
                //     });
                // }
                // if (!req.body.filePath) {
                //     return res.status(400).send({
                //         error: true,
                //         message: `Could not find a req.body.filePath ${req.body.filePath}`
                //     });
                // }
                // tourUploader(req, res, async (err: any) => {
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
                            message: "Could not find a user with id " + req.body.device
                        })];
                }
                if (!req.body.filePath) {
                    return [2 /*return*/, res.status(400).send({
                            error: true,
                            message: "Could not find a req.body.filePath " + req.body.filePath
                        })];
                }
                unzipPath = (_a = getStoragePaths(req.body.filePath, user._id), _a.unzipPath), urlPath = _a.urlPath;
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, decompress_1.default(req.body.filePath, unzipPath)];
            case 3:
                _b.sent();
                fs_1.default.unlink(req.body.filePath, function (err) {
                    if (err)
                        console.log('err:: deleting the compressed file', err);
                    console.log('zip file deleted');
                });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(400).send({ error: true, message: "error unzipping the tour, is it a zip file?" })];
            case 5:
                tour = new Tour_1.default({
                    name: req.body.name,
                    url: 'tours/' + urlPath,
                    user: req.body.user,
                });
                _b.label = 6;
            case 6:
                _b.trys.push([6, 8, , 9]);
                return [4 /*yield*/, tour.save()];
            case 7:
                addedTour = _b.sent();
                res.send(addedTour);
                return [3 /*break*/, 9];
            case 8:
                error_2 = _b.sent();
                errs = Object.keys(error_2.errors).map(function (er) { return error_2.errors[er].message; });
                res.status(400).send({ error: true, message: errs.join(', ') });
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.addTour = addTour;
var getStoragePaths = function (p, id) {
    var folderName = path_1.default.basename(p, '.zip');
    var timeStamp = Date.now();
    var urlPath = [id, timeStamp, folderName].join('/');
    var unzipPath = './dist/public/tours/' + urlPath;
    return { unzipPath: unzipPath, urlPath: urlPath };
    // if (!fs.existsSync(unzipPath)) {
    //     return { unzipPath, urlPath }
    // } else {
    //     const newP = 
    //     return getStoragePath(newP, id);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG91ckNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzcmMvY29udHJvbGxlcnMvdG91ckNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0RBQTZDO0FBQzdDLHdEQUFrQztBQUNsQyxzREFBZ0M7QUFDaEMsNkJBQTZCO0FBQzdCLHVDQUFxQztBQUNyQywwREFBb0M7QUFDcEMsOENBQXdCO0FBQ3hCLDBDQUFvQjtBQUtiLElBQUksT0FBTyxHQUFHLFVBQU8sR0FBWSxFQUFFLEdBQWE7Ozs7O2dCQUNuRCxJQUFJLENBQUMsa0JBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztvQkFDL0Msc0JBQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxFQUFDO2dCQUV0RCxxQkFBTSxjQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUE7O2dCQUF6QyxJQUFJLEdBQUcsU0FBa0M7Z0JBQzdDLElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ1Asc0JBQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7NEJBQ3hCLEtBQUssRUFBRSxJQUFJOzRCQUNYLE9BQU8sRUFBRSwyQkFBeUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFJO3lCQUNwRCxDQUFDLEVBQUE7aUJBQ0w7Z0JBQ0Qsc0JBQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUM7OztLQUNyQyxDQUFDO0FBWlMsUUFBQSxPQUFPLFdBWWhCO0FBRUssSUFBSSxVQUFVLEdBQUcs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