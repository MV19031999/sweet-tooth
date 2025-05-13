import dotenv from "dotenv";
import cors from "cors";
import express from "express";

import connectDB from "./config/db.js"
import sweetRouter from "./routes/sweetRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js";
import categoryRouter from "./routes/categoryRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => (res.send("Server Connected")))

//API Endpoints
app.use('/api/sweet' , sweetRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/category', categoryRouter);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server listening at http://localhost:${PORT}`);
})