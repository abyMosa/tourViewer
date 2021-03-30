"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserNoPassword = exports.loginValidation = exports.registerValidation = void 0;
var joi_1 = __importDefault(require("@hapi/joi"));
var registerValidation = function (data) {
    var schema = joi_1.default.object({
        title: joi_1.default.string().min(2).max(255).required(),
        firstName: joi_1.default.string().min(3).max(255).required(),
        lastName: joi_1.default.string().min(4).max(255).required(),
        email: joi_1.default.string().min(6).max(255).email().required(),
        password: joi_1.default.string().min(6).max(1025).required()
    });
    return schema.validate(data);
};
exports.registerValidation = registerValidation;
var loginValidation = function (data) {
    var schema = joi_1.default.object({
        email: joi_1.default.string().min(6).max(255).email().required(),
        password: joi_1.default.string().min(6).max(1025).required()
    });
    return schema.validate(data);
};
exports.loginValidation = loginValidation;
var toUserNoPassword = function (user) {
    var userNoPass = {
        _id: user._id,
        title: user.title,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        registered: user.registered,
    };
    return userNoPass;
};
exports.toUserNoPassword = toUserNoPassword;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aFZhbGlkYXRpb24uanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzcmMvaGVscGVycy9hdXRoVmFsaWRhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBNEI7QUFHckIsSUFBTSxrQkFBa0IsR0FBRyxVQUFDLElBQVc7SUFDMUMsSUFBTSxNQUFNLEdBQUcsYUFBRyxDQUFDLE1BQU0sQ0FBQztRQUN0QixLQUFLLEVBQUUsYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFO1FBQzlDLFNBQVMsRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUU7UUFDbEQsUUFBUSxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRTtRQUNqRCxLQUFLLEVBQUUsYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFO1FBQ3RELFFBQVEsRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUU7S0FDckQsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pDLENBQUMsQ0FBQTtBQVRZLFFBQUEsa0JBQWtCLHNCQVM5QjtBQUVNLElBQU0sZUFBZSxHQUFHLFVBQUMsSUFBVztJQUN2QyxJQUFNLE1BQU0sR0FBRyxhQUFHLENBQUMsTUFBTSxDQUFDO1FBQ3RCLEtBQUssRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDdEQsUUFBUSxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRTtLQUNyRCxDQUFDLENBQUM7SUFDSCxPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakMsQ0FBQyxDQUFBO0FBTlksUUFBQSxlQUFlLG1CQU0zQjtBQUVNLElBQU0sZ0JBQWdCLEdBQUcsVUFBQyxJQUFXO0lBQ3hDLElBQUksVUFBVSxHQUFvQjtRQUM5QixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7UUFDYixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7UUFDakIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1FBQ3pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtRQUN2QixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7UUFDakIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO0tBQzlCLENBQUE7SUFDRCxPQUFPLFVBQVUsQ0FBQztBQUN0QixDQUFDLENBQUE7QUFWWSxRQUFBLGdCQUFnQixvQkFVNUIifQ==