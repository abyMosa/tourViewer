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
// import { S3 } from "aws-sdk";
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
    var tour, deleted, error_1;
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
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, tour.delete()];
            case 3:
                deleted = _a.sent();
                res.status(200).send(deleted);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(400).send({
                        error: true,
                        message: "error " + error_1.message
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteTour = deleteTour;
var getAllTours = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tours;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Tour_1.default.find().sort({ date: -1 })];
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
                return [4 /*yield*/, Tour_1.default.find({ user: req.params.id }).sort({ date: -1 })];
            case 2:
                tours = _a.sent();
                res.status(200).send(tours);
                return [2 /*return*/];
        }
    });
}); };
exports.getUserTours = getUserTours;
var addTour = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, tour, addedTour, error_2, errs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.user)
                    return [2 /*return*/, res.status(400).send({ error: true, message: "user is required!" })];
                if (!mongoose_1.default.Types.ObjectId.isValid(req.body.user))
                    return [2 /*return*/, res.status(400).send({ error: true, message: "Invalid user id!" })];
                return [4 /*yield*/, User_1.default.findById(req.body.user)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).send({
                            error: true,
                            message: "Could not find a user with id " + req.body.device
                        })];
                }
                tour = new Tour_1.default({
                    name: req.body.name,
                    image: req.body.image,
                    url: req.body.url,
                    user: req.body.user,
                });
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, tour.save()];
            case 3:
                addedTour = _a.sent();
                res.send(addedTour);
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                errs = Object.keys(error_2.errors).map(function (er) { return error_2.errors[er].message; });
                res.status(400).send({ error: true, message: errs.join(', ') });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.addTour = addTour;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG91ckNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzcmMvY29udHJvbGxlcnMvdG91ckNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0RBQTZDO0FBQzdDLHdEQUFrQztBQUNsQyxzREFBZ0M7QUFFaEMsNkJBQTZCO0FBQzdCLHVDQUFxQztBQUNyQyxnQ0FBZ0M7QUFJekIsSUFBSSxPQUFPLEdBQUcsVUFBTyxHQUFZLEVBQUUsR0FBYTs7Ozs7Z0JBQ25ELElBQUksQ0FBQyxrQkFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO29CQUMvQyxzQkFBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxDQUFDLEVBQUM7Z0JBRXRELHFCQUFNLGNBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBQTs7Z0JBQXpDLElBQUksR0FBRyxTQUFrQztnQkFDN0MsSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDUCxzQkFBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQzs0QkFDeEIsS0FBSyxFQUFFLElBQUk7NEJBQ1gsT0FBTyxFQUFFLDJCQUF5QixHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUk7eUJBQ3BELENBQUMsRUFBQTtpQkFDTDtnQkFDRCxzQkFBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQzs7O0tBQ3JDLENBQUM7QUFaUyxRQUFBLE9BQU8sV0FZaEI7QUFFSyxJQUFJLFVBQVUsR0FBRyxVQUFPLEdBQVksRUFBRSxHQUFhOzs7Oztn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