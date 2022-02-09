import Router from 'express';
import paymentController from '../controllers/paymentController.js';

const paymentRouter = new Router();
//
paymentRouter.post('/',  paymentController.createCheckout);

export default paymentRouter;