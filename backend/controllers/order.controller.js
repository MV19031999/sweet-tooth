import Order from "../models/order.model.js";
import User from "../models/user.model.js";

//Place new order
export const placeOrder = async(req, res) => {
    try{
        const userId = req.user.userId;
        const { items, address, payment, amount } = req.body;

        const newOrder = new Order({
            "userId" : userId,
            "items" :  items,
            "amount" : amount,
            "address" : address,
            "payment" : payment
        })

        await newOrder.save()
        await User.findByIdAndUpdate(userId,{cart: {}});
        res.status(200).json({ success: true, message: "Order Placed"})

    } catch(err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Failed to place order" });
    }
}

//Get all orders for a user
export const getUserOrder = async(req, res) => {
        try{
            const userOrders = await Order.find({"userId" : req.user.userId}).sort({date: -1});
            res.status(200).json({ success: true, data: userOrders})
        } catch(err) {
            console.log(err);
            return res.status(500).json({ success: false, message: "Unable to get order information" });
        }
}

//Get all orders for admin
export const getAllOrder = async(req, res) => {
    try{
        const allOrders = await Order.find({}).sort({"updatedAt": -1});
        res.status(200).json({ success: true, data: allOrders})
    } catch(err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Unable to get order information" });
    }
}

//Update of order by admin
export const updateOrder = async(req, res) => {
    try{
        const { status } = req.body;
        await Order.findByIdAndUpdate(req.params.id, {"status" : status});
        res.status(200).json({ success: true, message: "Order Updated"})
    } catch(err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Unable to get order information" });
    }
}