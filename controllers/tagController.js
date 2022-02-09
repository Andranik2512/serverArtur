import modelTag from "../models/modelTag.js";
import { validationResult } from "express-validator";
import modelType from "../models/modelType.js";
import createSlug from "../helpers/helper.js";

class TagController {
    async getAll (req, res){
        try {
            const typeTag = await modelTag.find();
            return res.json(typeTag);
        } catch (error) {
            res.status(500).json({message: error});
        }
    }

    async getOne (req, res){
        try {
           const {id} = req.params;
           const typeTag = await modelTag.findById(id);
           return res.status(200).json(typeTag); 
        } catch (error) {
            res.status(500).json({message: error});
        }
    }

    async addTag (req, res){
        try {
            const error = validationResult(req);
            if(!error.isEmpty()){
                return res.status(400).json({message: "Error"});
            }
           
            const {title ,type_id} = req.body;
            const checkTag = await modelTag.find({title: title})
            
            if (!checkTag.length) {
                const titleType = await modelType.findById(type_id)
                const slug = createSlug(titleType.title.toLowerCase(), title.toLowerCase())
                
                await modelTag.create({title, type_id, slug});
                return res.status(200).json({message: `title ${title} added.`});

            }

            return res.status(400).json('this tag used')
             
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async editTag (req, res){
        try {
            const {id} = req.params;
            const {title, type_id} = req.body;
            if (!id) {
                return res.status(400).json({message: `this id ${id} not found`});
            }
            const resDuplicate = await modelTag.find({
                $and: [
                    {_id: {$ne:  id}},
                    {title}
                ]
            })
            if(!resDuplicate.length){
                const updateTag = await modelTag.findByIdAndUpdate(id, {title, type_id}, {new: true});
                return res.status(200).json({message: updateTag});
            }
        } catch (error) {
            return res.status(500).json({message: error});
        }
    }

    async deleteTag(req, res){
        try {
            const {id} = req.params;
            if (!id) {
                res.status(400).json({message: `not found ${id}`})
            }
            const deleteTag = await modelTag.findByIdAndDelete(id);
            return res.status(200).json({result: deleteTag});
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

export default new TagController();