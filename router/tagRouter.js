import Router from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {check} from 'express-validator';
import TagController from "../controllers/tagController.js";

const tagRouter = new Router();

tagRouter.post('/', authMiddleware, TagController.addTag);

tagRouter.get('/get_one/:id', authMiddleware, TagController.getOne);

tagRouter.put('/edit_tag/:id', authMiddleware, TagController.editTag);

tagRouter.get('/get_all', authMiddleware, TagController.getAll);

tagRouter.delete('/delete_tag/:id', authMiddleware, TagController.deleteTag);

export default tagRouter;
