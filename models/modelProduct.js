import pkg from 'mongoose';
const { Schema, model, Types } = pkg;

const Product = new Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true, default: 0},
    img_url: {type: String},
    description: {type: String},
    date_add: {type: Date, default: Date.now},
    order_counter: {type: Number, default: 0},
    types: [{type: Types.ObjectId, ref: 'Type'}],
    tags: [{type: Types.ObjectId, ref: 'Tag'}],
    slug: {type:String, required: true, unique: true},
})
export default model('Product', Product);