// const express = require('express');
// const router = express.Router();
// const stripe = require('stripe')('sk_test_51P4JcdSJeGYHz3q7TolsZEUSbMXVi71YuXlZ8s3mEEwmlkRi6n9QzQMgL0e36TVlAF9B4RjHxp6MvOQgA7zXP4sf00iN4lVMJZ');
// const Order = require('../model/Order');
// let Restaurant = require('../model/restaurant')
// let Product = require('../model/product')
// router.post("/payment", async(req, res) => {
//     const { products, restaurant } = req.body;

//     // console.log('slfnwifhwoifhwoi')
//     const lineItems = products.map((product) => ({
//         price_data: {
//             currency: "inr",
//             product_data: {
//                 name: product.name,
//                 images: [product.image]
//             },
//             unit_amount: product.price * 100,
//         },
//         quantity: product.quantity
//     }));

//     const session = await stripe.checkout.sessions.create({
//         payment_method_types: ["card"],
//         line_items: lineItems,
//         mode: "payment",
//         success_url: "http://localhost:3000/success",
//         cancel_url: "http://localhost:3000/cancel",
//     });

//     console.log(products);
//     // Save the order to your database
//     try {
//         const orders = products.map((product) => new Order({
//             restaurant_id: restaurant._id,
//             restaurant_name: restaurant.name,
//             restaurant_address: restaurant.address,
//             product_id: product._id,
//             name: product.name,
//             price: product.price,
//             quantity: product.quantity
//         }));




//         // res.json({ id: session.id });

//         await Order.insertMany(orders);

//         res.json({ id: session.id });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to store order' });
//     }

// });

// router.get('/past-orders', async(req, res) => {
//     try {
//         const orders = await Order.find();

//         if (!orders) {
//             return res.status(404).json({ message: 'No past orders found' });
//         }

//         const ordersWithDetails = await Promise.all(orders.map(async(order) => {
//             const restaurant = await Restaurant.findById(order.restaurant_id);
//             const products = await Product.find({ _id: { $in: order.product_id } });
//             return { order, restaurant, products };
//         }));

//         res.json(ordersWithDetails);
//     } catch (error) {
//         console.error('Error fetching past orders:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// // module.exports = router;


// module.exports = router;





const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51P4JcdSJeGYHz3q7TolsZEUSbMXVi71YuXlZ8s3mEEwmlkRi6n9QzQMgL0e36TVlAF9B4RjHxp6MvOQgA7zXP4sf00iN4lVMJZ');
const Order = require('../model/Order');
let Restraurant = require('../model/restaurant')
let Product = require('../model/product')
router.post("/payment", async(req, res) => {
    console.log(req.body);
    const { products, restro } = req.body;
    console.log(restro, "sdkjbsuyfgwufgwugfu");


    const lineItems = products.map((product) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: product.name,
                images: [product.image]
            },
            unit_amount: product.price * 100,
        },
        quantity: product.quantity
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
    });

    // Save the order to your database
    try {
        const orders = products.map((product) => new Order({
            restraurant_id: restro._id,
            restaurant_name: restro.name,
            restaurant_address: restro.address,
            product_id: product._id,
            name: product.name,
            price: product.price,
            quantity: product.quantity
        }));

        await Order.insertMany(orders);

        return res.send({ id: session.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to store order' });
    }
});

router.get('/past-orders', async(req, res) => {
    try {
        const orders = await Order.find();

        if (!orders) {
            return res.status(404).json({ message: 'No past orders found' });
        }

        const ordersWithDetails = await Promise.all(orders.map(async(order) => {
            const restaurant = await Restraurant.findById(order.restraurant_id);
            const products = await Product.find({ _id: { $in: order.product_id } });
            return { order, restaurant, products };
        }));

        return res.send(ordersWithDetails);
    } catch (error) {
        console.error('Error fetching past orders:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;


// module.exports = router;