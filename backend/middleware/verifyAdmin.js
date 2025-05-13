import User from "../models/user.model.js";

const isAdmin = async(req, res, next) => {
    const userAdmin = await User.findById(req.user.userId);

    if(userAdmin.role != "admin"){
        return res.status(400).json({ success: false, message: "Admin Login Required"})
    }

    if(userAdmin.role === "admin"){
    try{
        req.admin = true;
        next();
    } catch(error){
        console.log(error);
        res.status(500).json({ success: false, message:"Error"});
    }}
}

export default isAdmin