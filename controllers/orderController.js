import modelOrder from "../models/modelOrder.js";
import nodemailer from "../nodemailer.js";

class orderController{
    async createOrder(req, res){
        try {
            const {basket, address, name_client, email_client, phone} = req.body;
            let total_price = 0;
            basket.map(el => {
                total_price = el.quantity * el.price
            })
            const order = await modelOrder.create({basket, total_price, address, name_client, email_client, phone})
            nodemailer(email_client, {basket, total_price});
            return res.json(order)

        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async deleteOrder(req, res){
        try {
            const {id} = req.params;
            if(!id){
                return res.json('not found')
            }
            const deleteOrder = await modelOrder.findByIdAndDelete(id);
            return res.json(deleteOrder);

        } catch (error) {
            return res.status(500).json(error)
        }
        
    }

    async changeStatusPay(req, res){
        try {
            const {_id, check_pay } = req.body;
            const result = await modelOrder.findByIdAndUpdate(_id, {check_pay: check_pay})
            return res.json(result)

        } catch (error) {
            return res.status(500).json(error)
        }
    }

}

export default new orderController();