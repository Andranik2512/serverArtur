import jwt from "jsonwebtoken";
import SECRET from "../config.js";

const testAuth = (req, res, next) => {
    if(req.method === "OPTIONS"){
        next();
    }

    try {
        const token = req.headers.authorization;
        if(!token){
            return res.status(401).json({message: "User is not authorized"});
        }
        
        const decodedData = jwt.verify(token, SECRET);
        req.user = decodedData;
        next();
    } catch (error) {
        return res.status(403).json({message: error});
    }
}

export default testAuth;