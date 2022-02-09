import { validationResult } from "express-validator";
import modelProduct from "../models/modelProduct.js";
import modelTag from "../models/modelTag.js";
import { randomUUID } from "crypto";
import path from 'path';

class productController{
    async getAll(req, res){
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return res.status(400).json({message: "error"});
            }
            
            let {tags, types, limit, page, sort} = req.body;
            
            limit = limit || 9;
            page = page || 1;

            let offset = page * limit - limit;
            let countPage;
            let finnedDevices;
           
            if(!types && !tags){ 
                countPage = (await modelProduct.find().count() / limit).toFixed();
                finnedDevices = await modelProduct.find().sort({price: sort}).limit(limit).skip(offset);
            }
            if(!types && tags){
                countPage = (await modelProduct.find({tags}).count() / limit).toFixed();
                finnedDevices = await modelProduct.find({tags}).sort({price: sort}).limit(limit).skip(offset)
            }
            if(types && !tags){
                countPage = (await modelProduct.find({types}).count() / limit).toFixed();
                finnedDevices = await modelProduct.find({types}).sort({price: sort}).limit(limit).skip(offset)
            }
            if(types && tags){
                countPage = (await modelProduct.find({types, tags}).count() / limit).toFixed();
                finnedDevices = await modelProduct.find({types, tags}).sort({price: sort}).limit(limit).skip(offset)
            }
            
            return res.json({finnedDevices, countPage});

        } catch (error) {
            return res.status(500).json({message: `something wrong ${error}`});
        }
    }

    async addProd(req, res){
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return res.status(400).json({message: "error"});
            }
           
            if (Object.keys(req.body).length === 5) {
                
                const { title, price, description, tag, slug } = req.body;
                const {img} =  req.files;

                let types = [];
                let tags = JSON.parse(tag);

                for (let i = 0; i < tags.length; i++) {
                    types.push((await modelTag.findById(tags[i].trim())).type_id);
                }

                const checkSlug = await modelProduct.find({slug:slug});
                if (checkSlug.length) {
                    return res.status(400).json({message: "choice any"})
                }
                
                let img_url = randomUUID() + '.jpg';
                img.mv(path.resolve('static', img_url));
                
                const newProd = await modelProduct.create({ title, price, img_url, description, types, tags, slug })
                return res.json(newProd)

            }
            return res.status(404).json({message: 'input must be not empty'})
           
        } catch (error) {
            return res.status(500).json({message: error});
        }
    }

    async getOne(req, res){
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return res.status(400).json({message: "error"});
            }
            const {id} = req.params
            const findetProd = await modelProduct.findById(id);
            return res.json(findetProd);

        } catch (error) {
            res.status(500).json({message: error});
        }
    }

    async deleteProd(req, res){
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return res.status(400).json({message: "error"});
            }

            const {id} = req.params;
            if (!id) {
                return res.status(400).json({message: "not found"})
            }

            const deleteProd = await modelProduct.findByIdAndDelete(id);
            return res.json(deleteProd);

        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async editProd(req, res){
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return res.status(400).json({message: "error"});
            }
           
            const {id} = req.params;
            const { title, price, description, tag, slug } = req.body;
            const {img} = req.files || '';
            const old_data = await modelProduct.findById(id);
            let new_img;

            if (!id) {
                return res.status(404).json({message: "not  found"});
            }

            const resDuplicate = await modelProduct.find({
                $and: [
                    {_id: {$ne: id}},
                    {slug}
                ]
            })
 
            if(!img){
                new_img = old_data.img_url
            } else{
                new_img = randomUUID() + '.jpg';
                img.mv(path.resolve('static', new_img));
            }

            let types = [];
            let tags = JSON.parse(tag)
            for (let i = 0; i < tags.length; i++) {
                types.push((await modelTag.findById(tags[i].trim())).type_id);
            }

            if (!resDuplicate.length) {
                const updateProduct = await modelProduct.findByIdAndUpdate(
                    id, 
                    { 
                        title, 
                        price, 
                        img_url: new_img, 
                        description, 
                        tags,
                        types, 
                        slug 
                    },
                    {
                        new: true
                    }
                )

                return res.json(updateProduct);
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

export default new productController();