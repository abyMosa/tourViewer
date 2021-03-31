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
var routes = express_1.Router();
var path = require('path');
// User
routes.post('/auth/login', userController.login);
routes.post('/auth/register', userController.register);
routes.get('/users', userController.users);
routes.get('/user/:id', userController.user);
routes.get('/viewer', function (req, res) {
    res.sendFile(path.join(__dirname, '../', 'views', 'viewer.html'));
});
exports.default = routes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsic3JjL3JvdXRlcy9yb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQWlDO0FBQ2pDLDRFQUFnRTtBQUVoRSxJQUFNLE1BQU0sR0FBRyxnQkFBTSxFQUFFLENBQUM7QUFDeEIsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRzdCLE9BQU87QUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDakQsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdkQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzNDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUU3QyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHO0lBQzNCLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO0FBQ3RFLENBQUMsQ0FBQyxDQUFDO0FBR0gsa0JBQWUsTUFBTSxDQUFDIn0=