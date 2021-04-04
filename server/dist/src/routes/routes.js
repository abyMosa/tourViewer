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
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userController = __importStar(require("../controllers/userController"));
var tourController = __importStar(require("../controllers/tourController"));
var verifyToken_1 = require("../helpers/verifyToken");
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
// // viewer
// routes.get('/viewer', (req, res) => {
//     res.sendFile(path.join(__dirname, '../', 'views', 'viewer.html'));
// });
exports.default = routes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsic3JjL3JvdXRlcy9yb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQW9EO0FBQ3BELDRFQUFnRTtBQUNoRSw0RUFBZ0U7QUFDaEUsc0RBQXFEO0FBR3JELElBQU0sTUFBTSxHQUFHLGdCQUFNLEVBQUUsQ0FBQztBQUd4QixPQUFPO0FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZELE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2pFLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFFdkUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzdDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLHlCQUFXLEVBQUUsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hELE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLHlCQUFXLEVBQUUsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRW5FLE1BQU0sQ0FBQyxLQUFLLENBQUMsMEJBQTBCLEVBQUUseUJBQVcsRUFBRSxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDckYsTUFBTSxDQUFDLEtBQUssQ0FBQywwQkFBMEIsRUFBRSx5QkFBVyxFQUFFLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3pGLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLHlCQUFXLEVBQUUsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRWxFLE9BQU87QUFDUCxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDaEQsNkRBQTZEO0FBQzdELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7QUFHbkQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUseUJBQVcsRUFBRSxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDOUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUseUJBQVcsRUFBRSxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDbkUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSx5QkFBVyxFQUFFLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUd4RSxZQUFZO0FBQ1osd0NBQXdDO0FBQ3hDLHlFQUF5RTtBQUN6RSxNQUFNO0FBR04sa0JBQWUsTUFBTSxDQUFDIn0=