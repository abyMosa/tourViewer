const { Router } = require('express');
const userController = require("../controllers/userController");
const tourController = require("../controllers/tourController");
const Tour = require('../models/Tour');
const { verifyToken } = require('../helpers/verifyToken');
const { tourUploader, previewImageUploader } = require('./uploadMiddleware');
const { busboyMiddleware } = require('./busboyMiddleware');
const busboy = require('connect-busboy');

// let multipart = require('connect-multiparty');
// let multipartMiddleware = multipart();

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

// routes.post('/tour', verifyToken, tourUploader, tourController.addTour);
// routes.post('/tour', busboyMeddleWare, tourController.addTour);
// routes.post('/tour', multipartMiddleware, tourController.addTour);
// routes.post('/tour', busboy({ immediate: true }), tourController.addTour);
routes.post('/tour', tourUploader, tourController.addTour);

// routes.post('/tour/s3sign', tourController.s3sign);




routes.get('/tours', verifyToken, tourController.getAllTours);
routes.delete('/tour/:id', verifyToken, tourController.deleteTour);
// routes.delete('/tour/:id', tourController.deleteTour);

// routes.get('/user/:id/tours', tourController.getUserTours);
routes.get('/user/:id/tours', verifyToken, tourController.getUserTours);

routes.patch('/tour/:id', verifyToken, previewImageUploader, tourController.updateTour);
// routes.patch('/tour/:id', previewImageUploader, tourController.updateTour);


routes.get('/viewer', async (req, res) => {
    let { id, tour } = req.query;
    let contentPath = req.query['content-path'];
    let imageUrl = [contentPath + "" + tour, 'preview.jpg'].join('/');
    let label = null;
    let description = undefined;

    if (id) {
        tourObj = await Tour.findById(id);
        label = tourObj.name;
        description = tourObj.description;
    }

    let title = label || tour;
    let pageTitle = `${title} | RowiLAB Viewer`;

    res.status(200).render('viewer', { label: pageTitle, imageUrl, description });
});


module.exports = routes;