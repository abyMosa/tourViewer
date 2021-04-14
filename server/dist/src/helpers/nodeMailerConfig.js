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
exports.transport = nodemailer_1.createTransport({
    host: 'smtp.ionos.co.uk',
    port: 587,
    auth: {
        user: 'info@inspirepress.co.uk',
        pass: 'Abdelrhman0'
    }
});
var sendEmail = function (mailArgs) { return __awaiter(void 0, void 0, void 0, function () {
    var message, info_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                message = __assign({ from: 'info@inspirepress.co.uk' }, mailArgs);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, exports.transport.sendMail(message)];
            case 2:
                info_1 = _a.sent();
                return [2 /*return*/, new Promise(function (resolve) { return resolve(info_1); })];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, new Promise(function (resolve, reject) { return reject(error_1); })];
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
                html: "<p>Hi " + user.firstName + ",</p>\n            <p>You have requested to reset your password</p>\n            <p>Please, click the link below to reset your password</p>\n            <p><a href='" + link + "'>Reset Passwork</a></p>\n        "
                // cb: (err, info) => {
                //     if (err) {
                //         console.log(err);
                //         return new Promise(resolve => resolve(err));
                //     } else {
                //         // console.log(info);
                //         return new Promise(resolve => resolve(info));
                //     }
                // }
            })];
    });
}); };
exports.sendResetLinkEmail = sendResetLinkEmail;
var sendPasswordResetSuccessfulEmail = function (user) {
    return exports.sendEmail({
        to: user.email,
        subject: "Reset Password Successfull",
        html: "<p>Hi " + user.firstName + ",</p> <p>Your password has been reset successfully.</p> ",
        // cb: (err, info) => {
        //     if (err) {
        //         console.log(err);
        //         return new Promise(resolve => resolve(err));
        //     } else {
        //         return new Promise(resolve => resolve(info));
        //         // console.log(info);
        //     }
        // }
    });
};
exports.sendPasswordResetSuccessfulEmail = sendPasswordResetSuccessfulEmail;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZU1haWxlckNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInNyYy9oZWxwZXJzL25vZGVNYWlsZXJDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBNkM7QUFZaEMsUUFBQSxTQUFTLEdBQUcsNEJBQWUsQ0FBQztJQUNyQyxJQUFJLEVBQUUsa0JBQWtCO0lBQ3hCLElBQUksRUFBRSxHQUFHO0lBQ1QsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLHlCQUF5QjtRQUMvQixJQUFJLEVBQUUsYUFBYTtLQUN0QjtDQUNKLENBQUMsQ0FBQztBQUVJLElBQU0sU0FBUyxHQUFHLFVBQU8sUUFBa0I7Ozs7O2dCQUN4QyxPQUFPLGNBQ1QsSUFBSSxFQUFFLHlCQUF5QixJQUM1QixRQUFRLENBQ2QsQ0FBQTs7OztnQkFJZ0IscUJBQU0saUJBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUE7O2dCQUF4QyxTQUFPLFNBQWlDO2dCQUM5QyxzQkFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxNQUFJLENBQUMsRUFBYixDQUFhLENBQUMsRUFBQzs7O2dCQUU3QyxzQkFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNLElBQUssT0FBQSxNQUFNLENBQUMsT0FBSyxDQUFDLEVBQWIsQ0FBYSxDQUFDLEVBQUM7Ozs7S0FFOUQsQ0FBQTtBQWJZLFFBQUEsU0FBUyxhQWFyQjtBQUdNLElBQU0sa0JBQWtCLEdBQUcsVUFBTyxJQUFXLEVBQUUsSUFBWTs7UUFFOUQsc0JBQU8saUJBQVMsQ0FBQztnQkFDYixFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2QsT0FBTyxFQUFFLHdCQUF3QjtnQkFDakMsSUFBSSxFQUFFLFdBQVMsSUFBSSxDQUFDLFNBQVMsNktBR1gsSUFBSSx1Q0FDckI7Z0JBQ0QsdUJBQXVCO2dCQUN2QixpQkFBaUI7Z0JBQ2pCLDRCQUE0QjtnQkFDNUIsdURBQXVEO2dCQUN2RCxlQUFlO2dCQUNmLGdDQUFnQztnQkFDaEMsd0RBQXdEO2dCQUN4RCxRQUFRO2dCQUNSLElBQUk7YUFDUCxDQUFDLEVBQUM7O0tBQ04sQ0FBQTtBQXBCWSxRQUFBLGtCQUFrQixzQkFvQjlCO0FBRU0sSUFBTSxnQ0FBZ0MsR0FBRyxVQUFDLElBQVc7SUFDeEQsT0FBTyxpQkFBUyxDQUFDO1FBQ2IsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLO1FBQ2QsT0FBTyxFQUFFLDRCQUE0QjtRQUNyQyxJQUFJLEVBQUUsV0FBUyxJQUFJLENBQUMsU0FBUyw2REFBMEQ7UUFDdkYsdUJBQXVCO1FBQ3ZCLGlCQUFpQjtRQUNqQiw0QkFBNEI7UUFDNUIsdURBQXVEO1FBQ3ZELGVBQWU7UUFDZix3REFBd0Q7UUFDeEQsZ0NBQWdDO1FBQ2hDLFFBQVE7UUFDUixJQUFJO0tBQ1AsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFBO0FBZlksUUFBQSxnQ0FBZ0Msb0NBZTVDIn0=