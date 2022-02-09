import Router from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {check} from 'express-validator';
import TypeController from "../controllers/typeController.js";

const typeRouter = new Router();

typeRouter.post('/', authMiddleware, TypeController.addType);

typeRouter.get('/get_one/:id', authMiddleware, TypeController.getOne);

typeRouter.put('/edit_type/:id', authMiddleware, TypeController.editType);

typeRouter.get('/get_all', authMiddleware, TypeController.getAll);

typeRouter.delete('/delete_type/:id', authMiddleware, TypeController.deleteType);

export default typeRouter;