const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const loginRouter = require('./routes/login');
const Restrorouter = require('./routes/restaurant');
const Productrouter = require('./routes/product');
let paymentMethod = require('./routes/payment')
let ratingRoutes = require('./routes/rating')
const cors = require('cors');

const app = express();
const Port = 7000;
mongoose.connect("mongodb://127.0.0.1:27017/Zomato")
    .then(() => {
        console.log("MongoDB connected")
    })
    .catch(err => console.error(err))

app.use(cors())

app.use(express.json({ extended: true })); // Middleware to parse JSON
// Use the routes defined in restaurantRoutes.js file
app.use('/api', Restrorouter)
app.use('/api', Productrouter)
app.use("/api", userRouter);
app.use("/api", loginRouter);
app.use("/api", paymentMethod);
app.use("/api", ratingRoutes);


app.listen(Port, (req, res) => {
    console.log(`server is running on Port ${Port}`);
})