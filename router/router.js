import Router from "express";
import routerAdmin from "./adminRouter.js";
import typeRouter from "./typeRouter.js";
import tagRouter from "./tagRouter.js";
import productRouter from "./productRouter.js";
import orderRouter from "./orderRouter.js";
import paymentRouter from "./paymentRouter.js";

const router = new Router();

router.use('/admin', routerAdmin);
router.use('/admin/type', typeRouter);
router.use('/admin/tag', tagRouter);
router.use('/home', productRouter);
router.use('/order', orderRouter);
router.use('/payment', paymentRouter);
export default router;