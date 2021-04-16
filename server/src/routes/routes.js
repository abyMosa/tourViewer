const { Router } = require('express');
const userController = require("../controllers/userController");
const tourController = require("../controllers/tourController");
const { verifyToken } = require('../helpers/verifyToken');
const { tourUploader } = require('./uploadMiddleware');

const routes = Router();

// User
routes.post('/auth/login', userController.login);
routes.post('/auth/register', userController.register);
routes.post('/auth/resetpassword', userController.resetpassword);
routes.post('/auth/verifyResetToken', userController.verifyResetToken);

routes.get('/user/:id', userController.user);
routes.get('/users', verifyToken, userController.users);
routes.delete('/user/:id', verifyToken, userController.deleteUser);

routes.patch('/user/:id/updateUserRole', verifyToken, userController.updateUserRole);
routes.patch('/user/:id/updatepassword', verifyToken, userController.updateUserPassword);
routes.patch('/user/:id', verifyToken, userController.updateUser);

// Tour
routes.get('/tour/:id', tourController.getTour);
// routes.post('/tour', tourController.addTour);

// routes.post('/tour', verifyToken, tourController.addTour);
routes.post('/tour', tourUploader, tourController.addTour);
// routes.post('/tour/s3sign', tourController.s3sign);

routes.get('/tours', verifyToken, tourController.getAllTours);
// routes.delete('/tour/:id', verifyToken, tourController.deleteTour);
routes.delete('/tour/:id', tourController.deleteTour);
routes.get('/user/:id/tours', verifyToken, tourController.getUserTours);



module.exports = routes;