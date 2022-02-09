import Router from "express";
import AuthController from "../controllers/authorizationAdminController.js";
import verificationMiddleware from "../middleware/verificationMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {check} from 'express-validator';
import productController from "../controllers/productController.js";
import sortSwitch from "../middleware/sortsMiddleware.js";

const routerAdmin = new Router();

routerAdmin.get('/', verificationMiddleware);

routerAdmin.post('/', AuthController.authorization);

routerAdmin.post('/add_new_admin', authMiddleware, [
    check('name', 'name is empty, its error').notEmpty(),
    check('password', 'password is empty, its error').isLength({min:4, max:10})
], AuthController.registration);

routerAdmin.get('/all_admin', authMiddleware, AuthController.getAll);

routerAdmin.get('/get_one/:id', authMiddleware, AuthController.getOne);

routerAdmin.put('/edit_admin/:id', authMiddleware,[
    check('name', 'name is empty, its error').notEmpty(),
    check('password', 'password is empty, its error').isLength({min:4, max:10})
], AuthController.editAdmin);

routerAdmin.delete('/delete_admin/:id', authMiddleware, AuthController.deleteAdmin);

routerAdmin.post('/add_prod', authMiddleware, productController.addProd);

routerAdmin.get('/get_all_products', authMiddleware, sortSwitch, productController.getAll);

routerAdmin.get('/get_one_prod/:id', authMiddleware, productController.getOne);

routerAdmin.delete('/delete_prod/:id', authMiddleware, productController.deleteProd);

routerAdmin.put('/edit_product/:id', authMiddleware, productController.editProd);


export default routerAdmin;