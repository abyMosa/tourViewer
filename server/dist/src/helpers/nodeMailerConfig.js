"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPasswordResetSuccessfulEmail = exports.sendResetLinkEmail = exports.sendEmail = exports.transport = void 0;
var nodemailer_1 = require("nodemailer");
// dre7am@hotmail.com
exports.transport = nodemailer_1.createTransport({
    host: 'smtp.ionos.co.uk',
    port: 587,
    auth: {
        user: 'info@inspirepress.co.uk',
        pass: 'Abdelrhman0'
    }
});
var sendEmail = function (mailArgs) { return __awaiter(void 0, void 0, void 0, function () {
    var message, info, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                message = __assign({ from: 'info@inspirepress.co.uk' }, mailArgs);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, exports.transport.sendMail(message)];
            case 2:
                info = _a.sent();
                return [2 /*return*/, info];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, error_1];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.sendEmail = sendEmail;
var sendResetLinkEmail = function (user, link) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, exports.sendEmail({
                to: user.email,
                subject: "Reset Password Request",
                html: "<p>Hi " + user.firstName + ",</p>\n            <p>You have requested to reset your password</p>\n            <p>Please, click the link below to reset your password</p>\n            <p><a href='" + link + "'>Reset Passwork</a></p>\n        ",
                cb: function (err, info) {
                    if (err) {
                        console.log(err);
                        return new Promise(function (resolve) { return resolve(err); });
                    }
                    else {
                        // console.log(info);
                        return new Promise(function (resolve) { return resolve(info); });
                    }
                }
            })];
    });
}); };
exports.sendResetLinkEmail = sendResetLinkEmail;
var sendPasswordResetSuccessfulEmail = function (user) {
    exports.sendEmail({
        to: user.email,
        subject: "Reset Password Successfull",
        html: "<p>Hi " + user.firstName + ",</p> <p>Your password has been reset successfully.</p> ",
        cb: function (err, info) {
            if (err) {
                console.log(err);
            }
            else {
                // console.log(info);
            }
        }
    });
};
exports.sendPasswordResetSuccessfulEmail = sendPasswordResetSuccessfulEmail;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZU1haWxlckNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInNyYy9oZWxwZXJzL25vZGVNYWlsZXJDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBNkM7QUFXN0MscUJBQXFCO0FBRVIsUUFBQSxTQUFTLEdBQUcsNEJBQWUsQ0FBQztJQUNyQyxJQUFJLEVBQUUsa0JBQWtCO0lBQ3hCLElBQUksRUFBRSxHQUFHO0lBQ1QsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLHlCQUF5QjtRQUMvQixJQUFJLEVBQUUsYUFBYTtLQUN0QjtDQUNKLENBQUMsQ0FBQztBQUVJLElBQU0sU0FBUyxHQUFHLFVBQU8sUUFBa0I7Ozs7O2dCQUN4QyxPQUFPLGNBQ1QsSUFBSSxFQUFFLHlCQUF5QixJQUM1QixRQUFRLENBQ2QsQ0FBQTs7OztnQkFJZ0IscUJBQU0saUJBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUE7O2dCQUF4QyxJQUFJLEdBQUcsU0FBaUM7Z0JBQzlDLHNCQUFPLElBQUksRUFBQzs7O2dCQUVaLHNCQUFPLE9BQUssRUFBQzs7OztLQUVwQixDQUFBO0FBYlksUUFBQSxTQUFTLGFBYXJCO0FBR00sSUFBTSxrQkFBa0IsR0FBRyxVQUFPLElBQVcsRUFBRSxJQUFZOztRQUU5RCxzQkFBTyxpQkFBUyxDQUFDO2dCQUNiLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDZCxPQUFPLEVBQUUsd0JBQXdCO2dCQUNqQyxJQUFJLEVBQUUsV0FBUyxJQUFJLENBQUMsU0FBUyw2S0FHWCxJQUFJLHVDQUNyQjtnQkFDRCxFQUFFLEVBQUUsVUFBQyxHQUFHLEVBQUUsSUFBSTtvQkFDVixJQUFJLEdBQUcsRUFBRTt3QkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNqQixPQUFPLElBQUksT0FBTyxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFaLENBQVksQ0FBQyxDQUFDO3FCQUMvQzt5QkFBTTt3QkFDSCxxQkFBcUI7d0JBQ3JCLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQWIsQ0FBYSxDQUFDLENBQUM7cUJBQ2hEO2dCQUNMLENBQUM7YUFDSixDQUFDLEVBQUM7O0tBQ04sQ0FBQTtBQXBCWSxRQUFBLGtCQUFrQixzQkFvQjlCO0FBRU0sSUFBTSxnQ0FBZ0MsR0FBRyxVQUFDLElBQVc7SUFDeEQsaUJBQVMsQ0FBQztRQUNOLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSztRQUNkLE9BQU8sRUFBRSw0QkFBNEI7UUFDckMsSUFBSSxFQUFFLFdBQVMsSUFBSSxDQUFDLFNBQVMsNkRBQTBEO1FBQ3ZGLEVBQUUsRUFBRSxVQUFDLEdBQUcsRUFBRSxJQUFJO1lBQ1YsSUFBSSxHQUFHLEVBQUU7Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNwQjtpQkFBTTtnQkFDSCxxQkFBcUI7YUFDeEI7UUFDTCxDQUFDO0tBQ0osQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFBO0FBYlksUUFBQSxnQ0FBZ0Msb0NBYTVDIn0=