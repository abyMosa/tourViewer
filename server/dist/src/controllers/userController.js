"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.updateUser = exports.updateUserPassword = exports.verifyResetToken = exports.resetpassword = exports.login = exports.register = exports.updateUserRole = exports.deleteUser = exports.user = exports.users = void 0;
var User_1 = __importStar(require("../models/User"));
var Token_1 = __importDefault(require("../models/Token"));
var bcrypt = __importStar(require("bcryptjs"));
var authValidation_1 = require("../helpers/authValidation");
var mongoose_1 = __importDefault(require("mongoose"));
var uuidv4_1 = require("uuidv4");
var nodeMailerConfig_1 = require("../helpers/nodeMailerConfig");
var verifyToken_1 = require("../helpers/verifyToken");
var users = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User_1.default.find()];
            case 1:
                users = _a.sent();
                res.status(200).send(users.map(authValidation_1.toUserNoPassword));
                return [2 /*return*/];
        }
    });
}); };
exports.users = users;
var user = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userNoPass;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id))
                    return [2 /*return*/, res.status(400).send({ error: true, message: "Invalid user id!" })];
                return [4 /*yield*/, User_1.default.findById(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(400).send({ error: true, message: "User not found" })];
                userNoPass = authValidation_1.toUserNoPassword(user);
                res.status(200).send(userNoPass);
                return [2 /*return*/];
        }
    });
}); };
exports.user = user;
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, deleted, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id))
                    return [2 /*return*/, res.status(400).send({ error: true, message: "Invalid user id!" })];
                return [4 /*yield*/, User_1.default.findById(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(400).send({ error: true, message: "User not found" })];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, user.delete()];
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
exports.deleteUser = deleteUser;
var updateUserRole = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, updatedUser, userNoPass;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id))
                    return [2 /*return*/, res.status(400).send({ error: true, message: "Invalid user id!" })];
                if (!req.body.role || ![User_1.UserRole.Admin, User_1.UserRole.Regular].includes(req.body.role))
                    return [2 /*return*/, res.status(400).send({ error: true, message: "Invalid user role!" })];
                return [4 /*yield*/, User_1.default.findById(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(400).send({ error: true, message: "User not found" })];
                return [4 /*yield*/, User_1.default.findOneAndUpdate({ _id: user._id }, { $set: { role: req.body.role } })];
            case 2:
                updatedUser = _a.sent();
                // let updatedUser = await User.findById(req.body.id);
                if (!updatedUser)
                    return [2 /*return*/, res.status(400).send({ error: true, message: "Unexpected Error!!" })];
                userNoPass = authValidation_1.toUserNoPassword(updatedUser);
                res.status(200).send(userNoPass);
                return [2 /*return*/];
        }
    });
}); };
exports.updateUserRole = updateUserRole;
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error, emailExist, salt, hashedPassword, users, admins, user, addedUser, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                error = authValidation_1.registerValidation(req.body).error;
                if (error)
                    return [2 /*return*/, res.status(400).send({ error: true, message: error.details[0].message })];
                return [4 /*yield*/, User_1.default.findOne({ email: req.body.email })];
            case 1:
                emailExist = _a.sent();
                if (emailExist)
                    return [2 /*return*/, res.status(400).send({ error: true, message: "User Exist" })];
                return [4 /*yield*/, bcrypt.genSalt(10)];
            case 2:
                salt = _a.sent();
                return [4 /*yield*/, bcrypt.hash(req.body.password, salt)];
            case 3:
                hashedPassword = _a.sent();
                return [4 /*yield*/, User_1.default.find()];
            case 4:
                users = _a.sent();
                return [4 /*yield*/, User_1.default.find({ role: User_1.UserRole.Admin })];
            case 5:
                admins = _a.sent();
                user = new User_1.default({
                    title: req.body.title,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    role: users.length === 0 || admins.length === 0 ? User_1.UserRole.Admin : User_1.UserRole.Regular,
                    password: hashedPassword
                });
                _a.label = 6;
            case 6:
                _a.trys.push([6, 8, , 9]);
                return [4 /*yield*/, user.save()];
            case 7:
                addedUser = _a.sent();
                // const token = generateToken(addedUser);
                // res.header("auth-token", token).send({ token: token });
                res.status(200).send();
                return [3 /*break*/, 9];
            case 8:
                error_2 = _a.sent();
                console.log(error_2);
                res.status(400).send({ error: true, message: error_2 });
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error, user, validPassword, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                error = authValidation_1.loginValidation(req.body).error;
                if (error)
                    return [2 /*return*/, res.status(400).send({ error: true, message: error.details[0].message })];
                return [4 /*yield*/, User_1.default.findOne({ email: req.body.email })];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(400).send({ error: true, message: "User doesn't Exist" })];
                return [4 /*yield*/, bcrypt.compare(req.body.password, user.password)];
            case 2:
                validPassword = _a.sent();
                if (!validPassword)
                    return [2 /*return*/, res.status(400).send({ error: true, message: "Incorrect password" })];
                token = verifyToken_1.generateToken(user);
                res.header("auth-token", token).send({ token: token });
                return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var resetpassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, token, resetToken, salt, hash, link, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.email)
                    return [2 /*return*/, res.status(400).send({ error: true, message: "Email is required" })];
                if (!req.body.origin)
                    return [2 /*return*/, res.status(400).send({ error: true, message: "Origin is required" })];
                return [4 /*yield*/, User_1.default.findOne({ email: req.body.email })];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(400).send({ error: true, message: "No User found with email " + req.body.email })];
                return [4 /*yield*/, Token_1.default.findOne({ user: user._id })];
            case 2:
                token = _a.sent();
                if (!token) return [3 /*break*/, 4];
                return [4 /*yield*/, token.deleteOne()];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                resetToken = uuidv4_1.uuid();
                return [4 /*yield*/, bcrypt.genSalt(10)];
            case 5:
                salt = _a.sent();
                return [4 /*yield*/, bcrypt.hash(resetToken, salt)];
            case 6:
                hash = _a.sent();
                return [4 /*yield*/, new Token_1.default({ user: user._id, token: hash, createdAt: Date.now() }).save()];
            case 7:
                _a.sent();
                link = req.body.origin + "/?token=" + resetToken + "&id=" + user._id;
                return [4 /*yield*/, nodeMailerConfig_1.sendResetLinkEmail(user, link)];
            case 8:
                result = _a.sent();
                console.log(result);
                res.status(200).send(result);
                return [2 /*return*/];
        }
    });
}); };
exports.resetpassword = resetpassword;
var verifyResetToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error, user, passwordResetToken, isValid, salt, hash, updatedUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.token)
                    return [2 /*return*/, res.status(400).send({ error: true, message: "Token is required" })];
                if (!req.body.password)
                    return [2 /*return*/, res.status(400).send({ error: true, message: "Password is required" })];
                error = authValidation_1.validatePassword(req.body.password).error;
                if (error)
                    return [2 /*return*/, res.status(400).send({ error: true, message: error.details[0].message })];
                if (!req.body.user)
                    return [2 /*return*/, res.status(400).send({ error: true, message: "User Id is required" })];
                if (!mongoose_1.default.Types.ObjectId.isValid(req.body.user))
                    return [2 /*return*/, res.status(400).send({ error: true, message: "Invalid user id!" })];
                return [4 /*yield*/, User_1.default.findById({ _id: req.body.user })];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(400).send({ error: true, message: "couldnt find user" })];
                return [4 /*yield*/, Token_1.default.findOne({ user: req.body.user })];
            case 2:
                passwordResetToken = _a.sent();
                if (!passwordResetToken)
                    return [2 /*return*/, res.status(400).send({ error: true, message: "Invalid or Expired password reset token" })];
                return [4 /*yield*/, bcrypt.compare(req.body.token, passwordResetToken.token)];
            case 3:
                isValid = _a.sent();
                if (!isValid)
                    return [2 /*return*/, res.status(400).send({ error: true, message: "Invalid or Expired password token" })];
                return [4 /*yield*/, bcrypt.genSalt(10)];
            case 4:
                salt = _a.sent();
                return [4 /*yield*/, bcrypt.hash(req.body.password, salt)];
            case 5:
                hash = _a.sent();
                return [4 /*yield*/, User_1.default.findOneAndUpdate({ _id: req.body.user }, { $set: { password: hash } }, { new: true })];
            case 6:
                updatedUser = _a.sent();
                if (!updatedUser)
                    return [2 /*return*/, res.status(400).send({ error: true, message: "Unexpected error" })];
                nodeMailerConfig_1.sendPasswordResetSuccessfulEmail(updatedUser);
                return [2 /*return*/, res.status(200).json()];
        }
    });
}); };
exports.verifyResetToken = verifyResetToken;
// to update pass while user is logged in. token must be provided
var updateUserPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error, user, salt, hashedPassword, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id))
                    return [2 /*return*/, res.status(400).send({ error: true, message: "Invalid user id!" })];
                if (!req.body.password)
                    return [2 /*return*/, res.status(400).send({ error: true, message: "Password is required!" })];
                error = authValidation_1.validatePassword(req.body.password).error;
                if (error)
                    return [2 /*return*/, res.status(400).send({ error: true, message: error.details[0].message })];
                return [4 /*yield*/, User_1.default.findById(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(400).send({ error: true, message: "User not found" })];
                return [4 /*yield*/, bcrypt.genSalt(10)];
            case 2:
                salt = _a.sent();
                return [4 /*yield*/, bcrypt.hash(req.body.password, salt)];
            case 3:
                hashedPassword = _a.sent();
                return [4 /*yield*/, User_1.default.updateOne({ _id: user._id }, { $set: { password: hashedPassword } }, { new: true })];
            case 4:
                results = _a.sent();
                if (results.nModified === 0)
                    return [2 /*return*/, res.status(400).send({ error: true, message: "Unexpected Error" })];
                res.status(200).send(results);
                return [2 /*return*/];
        }
    });
}); };
exports.updateUserPassword = updateUserPassword;
// to update pass while user is logged in. token must be provided
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id))
                    return [2 /*return*/, res.status(400).send({ error: true, message: "Invalid user id!" })];
                if (!req.body.title || !req.body.firstName || !req.body.lastName || !req.body.email)
                    return [2 /*return*/, res.status(400).send({ error: true, message: "Required fields are title, firstName, lastame, and email" })];
                return [4 /*yield*/, User_1.default.findById(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(400).send({ error: true, message: "User not found" })];
                error = authValidation_1.validateUpdatedUser(req.body.password).error;
                if (error)
                    return [2 /*return*/, res.status(400).send({ error: true, message: error.details[0].message })];
                return [4 /*yield*/, User_1.default.updateOne({ _id: user._id }, {
                        $set: {
                            title: req.body.title,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                        }
                    }, { new: true })];
            case 2:
                results = _a.sent();
                if (results.nModified === 0)
                    return [2 /*return*/, res.status(400).send({ error: true, message: "Unexpected Error" })];
                res.status(200).send(results);
                return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlckNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzcmMvY29udHJvbGxlcnMvdXNlckNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHFEQUF3RTtBQUN4RSwwREFBb0M7QUFDcEMsK0NBQW1DO0FBRW5DLDREQUF5STtBQUN6SSxzREFBZ0M7QUFDaEMsaUNBQThCO0FBQzlCLGdFQUFtRztBQUNuRyxzREFBdUQ7QUFHaEQsSUFBSSxLQUFLLEdBQUcsVUFBTyxHQUFZLEVBQUUsR0FBYTs7OztvQkFDckMscUJBQU0sY0FBSSxDQUFDLElBQUksRUFBRSxFQUFBOztnQkFBekIsS0FBSyxHQUFHLFNBQWlCO2dCQUM3QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGlDQUFnQixDQUFDLENBQUMsQ0FBQzs7OztLQUVyRCxDQUFDO0FBSlMsUUFBQSxLQUFLLFNBSWQ7QUFFSyxJQUFJLElBQUksR0FBRyxVQUFPLEdBQVksRUFBRSxHQUFhOzs7OztnQkFDaEQsSUFBSSxDQUFDLGtCQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7b0JBQy9DLHNCQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxFQUFDO2dCQUVuRSxxQkFBTSxjQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUE7O2dCQUF6QyxJQUFJLEdBQUcsU0FBa0M7Z0JBQzdDLElBQUksQ0FBQyxJQUFJO29CQUFFLHNC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