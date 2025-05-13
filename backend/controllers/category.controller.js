import Category from '../models/category.model.js';
import Sweet from '../models/sweet.model.js';

const fixCase = (temp) => {
    let tempArr = temp.trim().split(' ')
    let tempStr = '';
    tempArr.map((i) => {
        let c = i.trim()
        if(c != ''){
        tempStr += c[0].toUpperCase() + c.slice(1).toLowerCase() + ' ' }})
    return tempStr
}

//Add category be Admin
export const addCategory = async(req, res) => {
    const { name, image } = req.body;

    let fixedName = fixCase(name).trim();

    const existingCategory = await Category.findOne({"name" : fixedName});
    if(existingCategory){
        return res.status(400).json({ success: false, message: "Category already registered" })
    }

    const newCategory = new Category({ "name": fixedName, "image": image });

    try{
        await newCategory.save();
        res.status(200).json({ success: true, message: "Category added" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error - Data not uploaded" });
    }
}

//Delete category be Admin
export const deleteCategory = async(req, res) => {
    try{
        const currentCategory = await Category.findById(req.params.id);
        await Sweet.deleteMany({"category" : currentCategory.name});
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Category deleted and assosiated sweets removed" });
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error - Unable to delete" });
    }
}

//Updating category item info by Admin
export const updateCategory = async (req, res) => {
    const {name , image } = req.body;
    const newData = {
        "name" : fixCase(name).trim(), 
        "image" : image
    }
    console.log(newData,"123");
    const currentCategory = await Category.findById(req.params.id);

    try{
        await Sweet.updateMany({"category" : currentCategory.name},{ "category" : newData.name})
        await Category.findByIdAndUpdate(req.params.id, newData);
        res.status(200).json({ success: true, message: "Category Updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error - Data not updated" });
    }
};


//Get all categories
export const getCategory = async(req, res) => {
    try{
        const data = await Category.find({}).sort({"updatedAt": -1});
        res.status(200).json({ success: true, data: data});
    } catch(err) {
        res.status(500).json({ success: false, message: "Internal Server Error - Cannot get data" });
    }

}