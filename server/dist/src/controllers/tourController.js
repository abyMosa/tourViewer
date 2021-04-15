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
// import decompress from 'decompress';
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
// import extract from 'extract-zip';
// import DecompressZip from 'decompress-zip';
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
    var user, unzipPath, urlPath;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
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
                            message: "Could not find a user with id " + req.body.user
                        })];
                }
                if (!req.body.filePath) {
                    return [2 /*return*/, res.status(400).send({
                            error: true,
                            message: "Could not find a req.body.filePath " + req.body.filePath
                        })];
                }
                unzipPath = (_a = getStoragePaths(req.body.filePath, user._id), _a.unzipPath), urlPath = _a.urlPath;
                fs_1.default.unlink(req.body.filePath, function (err) {
                    if (err) {
                        console.log('err:: deleting the compressed file', err);
                        return res.status(400).send(err);
                    }
                    return res.status(200).send('done');
                });
                return [2 /*return*/];
        }
    });
}); };
exports.addTour = addTour;
var getStoragePaths = function (p, id) {
    var folderName = path_1.default.basename(p, '.zip');
    var timeStamp = Date.now().toString();
    var urlPath = [id, timeStamp, folderName].join('/');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG91ckNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzcmMvY29udHJvbGxlcnMvdG91ckNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0RBQTZDO0FBQzdDLHdEQUFrQztBQUNsQyxzREFBZ0M7QUFDaEMsNkJBQTZCO0FBQzdCLHVDQUFxQztBQUNyQyx1Q0FBdUM7QUFDdkMsOENBQXdCO0FBQ3hCLDBDQUFvQjtBQUdwQixxQ0FBcUM7QUFDckMsOENBQThDO0FBR3ZDLElBQUksT0FBTyxHQUFHLFVBQU8sR0FBWSxFQUFFLEdBQWE7Ozs7O2dCQUNuRCxJQUFJLENBQUMsa0JBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztvQkFDL0Msc0JBQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxFQUFDO2dCQUV0RCxxQkFBTSxjQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUE7O2dCQUF6QyxJQUFJLEdBQUcsU0FBa0M7Z0JBQzdDLElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ1Asc0JBQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7NEJBQ3hCLEtBQUssRUFBRSxJQUFJOzRCQUNYLE9BQU8sRUFBRSwyQkFBeUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFJO3lCQUNwRCxDQUFDLEVBQUE7aUJBQ0w7Z0JBQ0Qsc0JBQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUM7OztLQUNyQyxDQUFDO0FBWlMsUUFBQSxPQUFP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