import modelAdmin from "../models/modelAdmin.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

async function checkAuth(req, res, next){
    try {

        const zeroUser = {
            name: dotenv.config().parsed.USERNAME,
            email: dotenv.config().parsed.EMAIL,
            password: bcrypt.hashSync(dotenv.config().parsed.PASSWORD, 5)    
        }

        const schemaAdminsLength = (await modelAdmin.find()).length;

        if (schemaAdminsLength === 0) {
            await modelAdmin.create(zeroUser)
            res.status(200).json("Admin added, now you mast be have edit password , name and email")
            next()
        } 
        next()
    } catch (error) {
        return res.status(404).json({message: "Error, this user not authorized."})
    }
}

export default checkAuth;