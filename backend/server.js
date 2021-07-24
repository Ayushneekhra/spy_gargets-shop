const express = require("express");
const { errorHandler } = require("./middlewares/errorMiddleware");
require("colors");
const products = require("./data/products");
const dotenv = require("dotenv");
const connectDb = require("./config/config");
const productRoutes = require("./routes/productsRoute");
const usersRoutes = require("./routes/UsersRoute");
const orderRoutes = require("./routes/orderRoute");
  
const app = express()
dotenv.config();

app.use(express.json()); 
//connecting to mongodb database
connectDb();
//middleware bodyparser

//dotenv config
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Node Server</h1>");
});

app.use("/api", productRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", orderRoutes);
app.get("/api/config/paypal", (req,res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
})
app.use(errorHandler);

const port = 4000 
app.listen(process.env.PORT || port, () => {
    console.log("server are start 8080"); 
});
