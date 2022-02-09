import Router from 'express'
import orderController from '../controllers/orderController.js'

const orderRouter = new Router()

orderRouter.post('/', orderController.createOrder);
orderRouter.delete('/:id', orderController.deleteOrder);
orderRouter.put('/', orderController.changeStatusPay);

export default orderRouter;