import Router from "express";
import productController from "../controllers/productController.js";
import sortSwitch from "../middleware/sortsMiddleware.js";

const productRouter = new Router();

productRouter.get('/', sortSwitch, productController.getAll);
productRouter.get('/get_one/:id', productController.getOne);

export default productRouter;
