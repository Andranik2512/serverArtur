import pkg from 'mongoose';
const { model, Schema, Types } = pkg;

const Tag = new Schema({
    title: {type: String, required: true},
    slug: {type: String, unique: true, required: true},
    type_id: {type: Types.ObjectId, required: true, ref: 'Type'},
})

export default model('Tag', Tag);