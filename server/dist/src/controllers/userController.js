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
exports.login = exports.register = exports.user = exports.users = void 0;
var User_1 = __importDefault(require("../models/User"));
var bcrypt = __importStar(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var authValidation_1 = require("../helpers/authValidation");
var mongoose_1 = __importDefault(require("mongoose"));
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
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error, emailExist, salt, hashedPassword, user, addedUser, token, error_1;
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
                user = new User_1.default({
                    title: req.body.title,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hashedPassword
                });
                _a.label = 4;
            case 4:
                _a.trys.push([4, 6, , 7]);
                return [4 /*yield*/, user.save()];
            case 5:
                addedUser = _a.sent();
                token = jsonwebtoken_1.default.sign({ _id: user._id, firstName: user.firstName, lastName: user.lastName }, process.env.TOKEN_SECRET);
                res.header("auth-token", token).send({ token: token });
                return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.log(error_1);
                res.status(400).send({ error: true, message: error_1 });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
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
                token = jsonwebtoken_1.default.sign({ _id: user._id, firstName: user.firstName, lastName: user.lastName }, process.env.TOKEN_SECRET);
                res.header("auth-token", token).send({ token: token });
                return [2 /*return*/];
        }
    });
}); };
exports.login = login;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlckNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzcmMvY29udHJvbGxlcnMvdXNlckNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHdEQUE4RDtBQUM5RCwrQ0FBbUM7QUFDbkMsOERBQStCO0FBQy9CLDREQUFrRztBQUNsRyxzREFBZ0M7QUFHekIsSUFBSSxLQUFLLEdBQUcsVUFBTyxHQUFZLEVBQUUsR0FBYTs7OztvQkFDckMscUJBQU0sY0FBSSxDQUFDLElBQUksRUFBRSxFQUFBOztnQkFBekIsS0FBSyxHQUFHLFNBQWlCO2dCQUM3QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGlDQUFnQixDQUFDLENBQUMsQ0FBQzs7OztLQUVyRCxDQUFDO0FBSlMsUUFBQSxLQUFLLFNBSWQ7QUFFSyxJQUFJLElBQUksR0FBRyxVQUFPLEdBQVksRUFBRSxHQUFhOzs7OztnQkFDaEQsSUFBSSxDQUFDLGtCQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7b0JBQy9DLHNCQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxFQUFDO2dCQUVuRSxxQkFBTSxjQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUE7O2dCQUF6QyxJQUFJLEdBQUcsU0FBa0M7Z0JBQzdDLElBQUksQ0FBQyxJQUFJO29CQUFFLHNCQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFDO2dCQUcvRSxVQUFVLEdBQW9CLGlDQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN6RCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzs7OztLQUNwQyxDQUFDO0FBVlMsUUFBQSxJQUFJLFFBVWI7QUFFSyxJQUFJLFFBQVEsR0FBRyxVQUFPLEdBQVksRUFBRSxHQUFhOzs7OztnQkFFNUMsS0FBSyxHQUFLLG1DQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBakMsQ0FBa0M7Z0JBQy9DLElBQUksS0FBSztvQkFBRSxzQkFBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBQztnQkFHeEUscUJBQU0sY0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUE7O2dCQUExRCxVQUFVLEdBQUcsU0FBNkM7Z0JBQ2hFLElBQUksVUFBVTtvQkFBRSxzQkFBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxDQUFDLEVBQUM7Z0JBR3ZFLHFCQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUE7O2dCQUEvQixJQUFJLEdBQUcsU0FBd0I7Z0JBQ2QscUJBQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsRUFBQTs7Z0JBQTNELGNBQWMsR0FBRyxTQUEwQztnQkFHM0QsSUFBSSxHQUFVLElBQUksY0FBSSxDQUFDO29CQUN6QixLQUFLLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLO29CQUNyQixTQUFTLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTO29CQUM3QixRQUFRLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRO29CQUMzQixLQUFLLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLO29CQUNyQixRQUFRLEVBQUUsY0FBYztpQkFDM0IsQ0FBQyxDQUFDOzs7O2dCQUVtQixxQkFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUE7O2dCQUE3QixTQUFTLEdBQUcsU0FBaUI7Z0JBQzdCLEtBQUssR0FBRyxzQkFBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFhLENBQUMsQ0FBQztnQkFDekgsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7Ozs7Z0JBR3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBSyxDQUFDLENBQUM7Z0JBQ25CLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBSyxFQUFFLENBQUMsQ0FBQzs7Ozs7S0FHN0QsQ0FBQztBQS9CUyxRQUFBLFFBQVEsWUErQmpCO0FBRUssSUFBTSxLQUFLLEdBQUcsVUFBTyxHQUFZLEVBQUUsR0FBYTs7Ozs7Z0JBRTNDLEtBQUssR0FBSyxnQ0FBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBOUIsQ0FBK0I7Z0JBQzVDLElBQUksS0FBSztvQkFBRSxzQkFBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBQztnQkFHOUUscUJBQU0sY0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUE7O2dCQUFwRCxJQUFJLEdBQUcsU0FBNkM7Z0JBQzFELElBQUksQ0FBQyxJQUFJO29CQUFFLHNCQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxFQUFDO2dCQUVqRSxxQkFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBQTs7Z0JBQXRFLGFBQWEsR0FBRyxTQUFzRDtnQkFDNUUsSUFBSSxDQUFDLGFBQWE7b0JBQUUsc0JBQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxDQUFDLEVBQUM7Z0JBRTFGLEtBQUssR0FBRyxzQkFBRyxDQUFDLElBQUksQ0FDbEIsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUNyRSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQWEsQ0FDNUIsQ0FBQztnQkFFRixHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzs7OztLQUMxRCxDQUFBO0FBbEJZLFFBQUEsS0FBSyxTQWtCakIifQ==