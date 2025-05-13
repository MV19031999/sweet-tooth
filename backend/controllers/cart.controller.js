import User from '../models/user.model.js';

//Add to cart
export const addToCart = async(req, res) => {
    const itemId = req.body.itemId;
    try{
        const currentUser = await User.findOne({"_id": req.user.userId});
        const cart = await currentUser.cart;

        if(!cart[itemId]){
            cart[itemId] = 1;
        } else {
            cart[itemId] += 1;
        }

        await User.findByIdAndUpdate(req.user.userId, {"cart" : cart});
        res.status(200).json({ success: true });

    } catch(err) {
        console.log(err)
        res.status(400).json({ success: false, message: "Cannot add item to cart"})
    }

}

//Remove from cart
export const removeFromCart = async(req, res) => {
    const itemId = req.body.itemId;
    try{
        const currentUser = await User.findOne({"_id": req.user.userId});
        const cart = await currentUser.cart;
        
        cart[itemId] -= 1;

        await User.findByIdAndUpdate(req.user.userId, {"cart" : cart});
        res.status(200).json({ success: true });


    } catch(err) {
        console.log(err)
        res.status(400).json({ success: false, message: "Cannot remove item from cart"})
    }
}

//Delete item from cart
export const deleteFromCart = async(req, res) => {
    const itemId = req.body.itemId;
    try{
        const currentUser = await User.findOne({"_id": req.user.userId});
        const cart = await currentUser.cart;

        cart[itemId] = 0;

        await User.findByIdAndUpdate(req.user.userId, {"cart" : cart});
        res.status(200).json({ success: true });

    } catch(err) {
        console.log(err)
        res.status(400).json({ success: false, message: "Cannot delete item from cart"})
    }
}

//Fetch cart
export const getCart = async(req, res) => {
    try{
        const currentUser = await User.findOne({"_id": req.user.userId});
        const cart = await currentUser.cart;
        res.status(200).json({ success: true, data: cart})

    } catch(err) {
        console.log(err)
        res.status(400).json({ success: false, message: "Cannot get cart"})
    }

}