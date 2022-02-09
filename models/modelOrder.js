import pkg from 'mongoose'
const { Schema, model, Types } = pkg;

const Order = new Schema({
    basket: [ 
        {
            item_id:{ type: Types.ObjectId, required: true },
            quantity: {type: Number, required: true},
            price: {type: Number, required: true},
        }
    ],
    total_price: {type: Number},
    order_date: {type: Date, default: Date.now},
    address: {type: String, required: true},
    name_client: {type: String, required: true},
    email_client: {type: String, required: true},
    phone: {type: Number, required: true},
    check_pay: {type:String, default: "Wait"}
})

export default model('Order', Order);