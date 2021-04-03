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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userController = __importStar(require("../controllers/userController"));
var tourController = __importStar(require("../controllers/tourController"));
var verifyToken_1 = require("../helpers/verifyToken");
var path_1 = __importDefault(require("path"));
var routes = express_1.Router();
// User
routes.post('/auth/login', userController.login);
routes.post('/auth/register', userController.register);
routes.post('/auth/resetpassword', userController.resetpassword);
routes.post('/auth/verifyResetToken', userController.verifyResetToken);
routes.get('/user/:id', userController.user);
routes.get('/users', verifyToken_1.verifyToken, userController.users);
routes.delete('/user/:id', verifyToken_1.verifyToken, userController.deleteUser);
routes.patch('/user/:id/updateUserRole', verifyToken_1.verifyToken, userController.updateUserRole);
routes.patch('/user/:id/updatepassword', verifyToken_1.verifyToken, userController.updateUserPassword);
routes.patch('/user/:id', verifyToken_1.verifyToken, userController.updateUser);
// Tour
routes.get('/tour/:id', tourController.getTour);
// routes.post('/tour', verifyToken, tourController.addTour);
routes.post('/tour', tourController.addTour);
routes.post('/tour/s3sign', tourController.s3sign);
routes.get('/tours', verifyToken_1.verifyToken, tourController.getAllTours);
routes.delete('/tour/:id', verifyToken_1.verifyToken, tourController.deleteTour);
routes.get('/user/:id/tours', verifyToken_1.verifyToken, tourController.getUserTours);
// viewer
routes.get('/viewer', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '../', 'views', 'viewer.html'));
});
exports.default = routes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsic3JjL3JvdXRlcy9yb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQW9EO0FBQ3BELDRFQUFnRTtBQUNoRSw0RUFBZ0U7QUFDaEUsc0RBQXFEO0FBQ3JELDhDQUF3QjtBQUV4QixJQUFNLE1BQU0sR0FBRyxnQkFBTSxFQUFFLENBQUM7QUFHeEIsT0FBTztBQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNqRCxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN2RCxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNqRSxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBRXZFLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3QyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSx5QkFBVyxFQUFFLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4RCxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSx5QkFBVyxFQUFFLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUVuRSxNQUFNLENBQUMsS0FBSyxDQUFDLDBCQUEwQixFQUFFLHlCQUFXLEVBQUUsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3JGLE1BQU0sQ0FBQyxLQUFLLENBQUMsMEJBQTBCLEVBQUUseUJBQVcsRUFBRSxjQUFjLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUN6RixNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSx5QkFBVyxFQUFFLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUVsRSxPQUFPO0FBQ1AsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2hELDZEQUE2RDtBQUM3RCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0MsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBR25ELE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLHlCQUFXLEVBQUUsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzlELE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLHlCQUFXLEVBQUUsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ25FLE1BQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUseUJBQVcsRUFBRSxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7QUFHeEUsU0FBUztBQUNULE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUc7SUFDM0IsR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUM7QUFDdEUsQ0FBQyxDQUFDLENBQUM7QUFHSCxrQkFBZSxNQUFNLENBQUMifQ==