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
var sendEmail = function (mailArgs) {
    var message = __assign({ from: 'info@inspirepress.co.uk' }, mailArgs);
    exports.transport.sendMail(message, function (err, info) { return mailArgs.cb(err, info); });
};
exports.sendEmail = sendEmail;
var sendResetLinkEmail = function (user, link) {
    exports.sendEmail({
        to: user.email,
        subject: "Reset Password Request",
        html: "<p>Hi " + user.firstName + ",</p>\n            <p>You have requested to reset your password</p>\n            <p>Please, click the link below to reset your password</p>\n            <p><a href='" + link + "'>Reset Passwork</a></p>\n        ",
        cb: function (err, info) {
            if (err) {
                // console.log(err);
            }
            else {
                // console.log(info);
            }
        }
    });
};
exports.sendResetLinkEmail = sendResetLinkEmail;
var sendPasswordResetSuccessfulEmail = function (user) {
    exports.sendEmail({
        to: user.email,
        subject: "Reset Password Successfull",
        html: "<p>Hi " + user.firstName + ",</p> <p>Your password has been reset successfully.</p> ",
        cb: function (err, info) {
            if (err) {
                // console.log(err);
            }
            else {
                // console.log(info);
            }
        }
    });
};
exports.sendPasswordResetSuccessfulEmail = sendPasswordResetSuccessfulEmail;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZU1haWxlckNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInNyYy9oZWxwZXJzL25vZGVNYWlsZXJDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBNkM7QUFZaEMsUUFBQSxTQUFTLEdBQUcsNEJBQWUsQ0FBQztJQUNyQyxJQUFJLEVBQUUsa0JBQWtCO0lBQ3hCLElBQUksRUFBRSxHQUFHO0lBQ1QsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLHlCQUF5QjtRQUMvQixJQUFJLEVBQUUsYUFBYTtLQUN0QjtDQUNKLENBQUMsQ0FBQztBQUVJLElBQU0sU0FBUyxHQUFHLFVBQUMsUUFBa0I7SUFDeEMsSUFBTSxPQUFPLGNBQ1QsSUFBSSxFQUFFLHlCQUF5QixJQUM1QixRQUFRLENBQ2QsQ0FBQTtJQUVELGlCQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxVQUFDLEdBQUcsRUFBRSxJQUFJLElBQUssT0FBQSxRQUFRLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDO0FBQ3ZFLENBQUMsQ0FBQTtBQVBZLFFBQUEsU0FBUyxhQU9yQjtBQUdNLElBQU0sa0JBQWtCLEdBQUcsVUFBQyxJQUFXLEVBQUUsSUFBWTtJQUV4RCxpQkFBUyxDQUFDO1FBQ04sRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLO1FBQ2QsT0FBTyxFQUFFLHdCQUF3QjtRQUNqQyxJQUFJLEVBQUUsV0FBUyxJQUFJLENBQUMsU0FBUyw2S0FHWCxJQUFJLHVDQUNyQjtRQUNELEVBQUUsRUFBRSxVQUFDLEdBQUcsRUFBRSxJQUFJO1lBQ1YsSUFBSSxHQUFHLEVBQUU7Z0JBQ0wsb0JBQW9CO2FBQ3ZCO2lCQUFNO2dCQUNILHFCQUFxQjthQUN4QjtRQUNMLENBQUM7S0FDSixDQUFDLENBQUM7QUFDUCxDQUFDLENBQUE7QUFsQlksUUFBQSxrQkFBa0Isc0JBa0I5QjtBQUVNLElBQU0sZ0NBQWdDLEdBQUcsVUFBQyxJQUFXO0lBQ3hELGlCQUFTLENBQUM7UUFDTixFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUs7UUFDZCxPQUFPLEVBQUUsNEJBQTRCO1FBQ3JDLElBQUksRUFBRSxXQUFTLElBQUksQ0FBQyxTQUFTLDZEQUEwRDtRQUN2RixFQUFFLEVBQUUsVUFBQyxHQUFHLEVBQUUsSUFBSTtZQUNWLElBQUksR0FBRyxFQUFFO2dCQUNMLG9CQUFvQjthQUN2QjtpQkFBTTtnQkFDSCxxQkFBcUI7YUFDeEI7UUFDTCxDQUFDO0tBQ0osQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFBO0FBYlksUUFBQSxnQ0FBZ0Msb0NBYTVDIn0=