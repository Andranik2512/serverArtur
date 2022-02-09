import modelType from "../models/modelType.js";
import modelProduct from "../models/modelProduct.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

class TypeController {
    async getAll (req, res){
        try {
            const typeTag = await modelType.find();
            return res.json(typeTag);
        } catch (error) {
            res.status(500).json({message: error});
        }
    }

    async getOne (req, res){
        try {
           const {id} = req.params;
           const typeTag = await modelType.findById(id);
           return res.status(200).json(typeTag); 
        } catch (error) {
            res.status(500).json({message: error});
        }
    }

    async addType (req, res){
        try {
            const error = validationResult(req);
            if(!error.isEmpty()){
                return res.status(400).json({message: "Error"});
            }

            const {title} = req.body;
        
            const checkTitle = await modelType.findOne({title});
            if (!checkTitle) {
                await modelType.create({title});
                return res.status(200).json({message: `title ${title} added.`});
            }
            return res.status(400).json('this type used')

        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async editType (req, res){
        try {
            const {id} = req.params;
            const {title} = req.body;
            if (!id) {
                return res.status(400).json({message: `this id ${id} not found`});
            }
            const resDuplicate = await modelType.find({
                $and: [
                    {_id: {$ne:  id}},
                    {title}
                ]
            })
            if(!resDuplicate.length){
                const updateType = await modelType.findByIdAndUpdate(id, {title}, {new: true});
                return res.status(200).json({message: updateType});
            }
        } catch (error) {
            return res.status(500).json({message: error});
        }
    }

    async deleteType(req, res){
        try {
            const {id} = req.params;
            if (!id) {
                res.status(400).json({message: `not found ${id}`})
            }

            const deleteType = await modelType.findByIdAndDelete(id);
            
            return res.status(200).json({result: deleteType});
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

export default new TypeController();