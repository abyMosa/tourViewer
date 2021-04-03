"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.verifyToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var verifyToken = function (req, res, next) {
    var token = req.header('auth-token');
    if (!token)
        return res.status(401).send('Access Denied!');
    try {
        var verified = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (err) {
        return res.status(400).send('Invaild Token!');
    }
};
exports.verifyToken = verifyToken;
var generateToken = function (user) {
    var token = jsonwebtoken_1.default.sign({
        _id: user._id,
        title: user.title,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        registered: user.registered,
        role: user.role
    }, process.env.TOKEN_SECRET);
    return token;
};
exports.generateToken = generateToken;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZ5VG9rZW4uanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzcmMvaGVscGVycy92ZXJpZnlUb2tlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQSw4REFBK0I7QUFFeEIsSUFBTSxXQUFXLEdBQUcsVUFBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO0lBQ3ZFLElBQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdkMsSUFBSSxDQUFDLEtBQUs7UUFBRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFFMUQsSUFBSTtRQUNBLElBQU0sUUFBUSxHQUFHLHNCQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQWEsQ0FBQyxDQUFDO1FBQzlELElBQUksRUFBRSxDQUFDO0tBRVY7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNWLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUNqRDtBQUNMLENBQUMsQ0FBQTtBQVhZLFFBQUEsV0FBVyxlQVd2QjtBQUVNLElBQU0sYUFBYSxHQUFHLFVBQUMsSUFBVztJQUNyQyxJQUFNLEtBQUssR0FBRyxzQkFBRyxDQUFDLElBQUksQ0FDbEI7UUFDSSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7UUFDYixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7UUFDakIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1FBQ3pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtRQUN2QixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7UUFDakIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1FBQzNCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtLQUNsQixFQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBYSxDQUM1QixDQUFDO0lBQ0YsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQyxDQUFBO0FBZFksUUFBQSxhQUFhLGlCQWN6QiJ9