import { Router } from 'express';
import * as userController from "../controllers/userController";

const routes = Router();
const path = require('path');


// User
routes.post('/auth/login', userController.login);
routes.post('/auth/register', userController.register);
routes.get('/users', userController.users);
routes.get('/user/:id', userController.user);

routes.get('/viewer', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'viewer.html'));
});


export default routes;