import modelAdmin from "../models/modelAdmin.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import JWT from "jsonwebtoken";
import SECRET from "../config.js";


const generationToken = (id, name) => {
    const payload = {
        "id": id,
        "name": name,
    }
    return JWT.sign(payload, SECRET, {expiresIn: "24h"});
}

class AuthController {
    async authorization(req, res) {
        try {
            const error = validationResult(req);
            
            if (!error.isEmpty()) {
                return res.status(400).json({message: "error"});
            } else {
                
                const {email, password} = req.body;
                const findAdmin = await modelAdmin.findOne({email});
                const validPassword = bcrypt.compareSync(password, findAdmin.password);
                const token = generationToken(findAdmin._id, findAdmin.email);

                if (!findAdmin) {
                    return res.status(400).json({message: `This "${email}" not found. Try again.`})
                } 
            
                if (!validPassword) {
                    return res.status(400).json("Password wrong");
                }
        
                return res.json(token)
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    } 

    async registration(req, res) {
        try {
            const error = validationResult(req);
            if(!error.isEmpty()){
                return res.status(400).json({message: "Error"});
            } 
            
            const {name, email, password} = req.body;
           
            const checkEmail = await modelAdmin.findOne({email});

            if (!checkEmail) {
                const hashPassword = bcrypt.hashSync(password, 5);
                await modelAdmin.create({name, email, password:hashPassword});
                return res.status(200).json({message: "your create new admin"});
            }
            
            return res.status(404).json({message: "Choice any email"})
            
        } catch (error) {
            return res.status(500).json({message: error});
        }
    }

    async getAll(req, res){
        try {
            const admins = await modelAdmin.find();
            return res.json(admins);
        } catch (error) {
            res.status(500).json({message: error});
        }
    }

    async getOne(req, res){
        try {
            const {id} = req.params;
            const admin = await modelAdmin.findById(id);
            return res.json(admin);
        } catch (error) {
            res.status(500).json({message: error});
        }
    }

    async editAdmin(req, res){
        try {
            const {id} = req.params;
            const {name, email, password} = req.body;
            if (!id) {
                res.status(400).json({message: "not found"})
            }
            const resDuplicate = await modelAdmin.find({
                $and: [
                    {_id: {$ne: id}},
                    {email}
                ]
            })
            if(!resDuplicate.length){
                const hashPassword = bcrypt.hashSync(password, 5);
                const updateAdmin = await modelAdmin.findByIdAndUpdate(id, {name, email, hashPassword}, {new: true})
                return res.json(updateAdmin);
            }
            
            return res.json({message: `this email ${email} zanyat`})
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async deleteAdmin(req, res){
        try {
            const {id} = req.params;
            if (!id) {
                res.status(400).json({message: `not found ${id}`});
            }
            const delAd = await modelAdmin.findByIdAndDelete(id);
            
            return res.json(delAd)
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}


export default new AuthController();