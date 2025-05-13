import mongoose from "mongoose";

const sweetSchema = new mongoose.Schema({
    name: {type:String, required:true},
    image: {type:String, required:true},
    price: {type:Number, required:true},
    description: {type:String, required:true},
    ingredients:{type:Array, required:true},
    category: {type:String, required:true},
    available: {type: Boolean, default: true}
},{ timestamps: true})

const Sweet = mongoose.model('Sweet', sweetSchema);

export default Sweet;