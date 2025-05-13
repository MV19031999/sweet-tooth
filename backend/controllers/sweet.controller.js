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

//Adding sweet item by Admin
export const addSweet = async (req, res) => {
    const {name , image, price, description, ingredients, category} = req.body;

    let fixedIngredients = [];
    fixedIngredients += ingredients.map((itm) => fixCase(itm).trim());
    let backToArryIng = fixedIngredients.split(",");

    let fixedDescription = description.trim()

    const newSweet = new Sweet({
        "name" : fixCase(name), 
        "image" : image, 
        "price" : price, 
        "description" : fixedDescription[0].toUpperCase() + fixedDescription.slice(1).toLowerCase(), 
        "ingredients" : backToArryIng, 
        "category" : category
    })

    try{
        await newSweet.save();
        res.status(200).json({ success: true, message: "Sweet added" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error - Data not uploaded" });
    }
};

//Delete sweet item by Admin
export const removeSweet = async (req, res) => {
    try{
        await Sweet.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Sweet deleted" });
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error - Unable to delete sweet item" });
    }
}

//Updating sweet item info by Admin
export const updateSweet = async (req, res) => {
    const {name , image, price, description, ingredients, category} = req.body;

    let fixedIngredients = [];
    fixedIngredients += ingredients.map((itm) => fixCase(itm).trim());
    let backToArryIng = fixedIngredients.split(",");

    let fixedDescription = description.trim()

    const newData = {
        "name" : fixCase(name), 
        "image" : image, 
        "price" : price, 
        "description" : fixedDescription[0].toUpperCase() + fixedDescription.slice(1).toLowerCase(), 
        "ingredients" : backToArryIng, 
        "category" : category
    }

    try{
        await Sweet.findByIdAndUpdate(req.params.id, newData);
        res.status(200).json({ success: true, message: "Sweet Updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error - Data not updated" });
    }
};

//Updating sweet item availability by Admin
export const availSweet = async (req, res) => {
    const { available } = req.body;

    try{
        await Sweet.findByIdAndUpdate(req.params.id, {"available" : available}, {timestamps: false});
        res.status(200).json({ success: true, message: "Availability Updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error - Data not updated" });
    }
};


//Getting all sweet items
export const listSweet = async (req, res) => {
    try{
        const sweetsList = await Sweet.find({}).sort({"updatedAt": -1});
        res.status(200).json({ success: true, data: sweetsList });;
    }catch(error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error - Unable to get sweet list" });
    }
};


