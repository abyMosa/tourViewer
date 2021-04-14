"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSS3 = void 0;
var aws_sdk_1 = __importDefault(require("aws-sdk"));
// export const AWSS3 = new AWS.S3({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });
exports.AWSS3 = new aws_sdk_1.default.S3({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzc2RrLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiYXdzc2RrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9EQUEwQjtBQUUxQixvQ0FBb0M7QUFDcEMsa0RBQWtEO0FBQ2xELDBEQUEwRDtBQUMxRCxNQUFNO0FBR08sUUFBQSxLQUFLLEdBQUcsSUFBSSxpQkFBRyxDQUFDLEVBQUUsQ0FBQztJQUM1QixNQUFNLEVBQUUsV0FBVztJQUNuQixXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUI7SUFDMUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCO0NBQ3JELENBQUMsQ0FBQyJ9