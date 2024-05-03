const express = require('express');
const router = express.Router();
const Restaurant = require('../model/restaurant.js');
const Product = require("../model/product")
    ///send the product details in the server
router.post("/product", async(req, res) => {
    console.log(req.body);
    try {
        console.log("mm aaagaya");
        const { name, descriptions, price, image, restroId } = req.body;
        console.log(restroId);
        // alert(restroId);
        //get the restaurant by id from the database



        const product = new Product({
            name,
            descriptions,
            image,
            price,
            restaurant: restroId
        });

        const savedData = await product.save();
        res.send({
            savedData,
            mgs: "Product Added  Successfully"
        });

    } catch {
        res.status(500).json({
            err: "errrrrrrr"
        })

    }
})


//finding the all product

router.get("/product", async(req, res) => {
    try {
        let product = await Product.find();
        if (product) {
            return res.send(product)
        } else {
            return res.send("No Data Found")
        }
    } catch {
        res.send("errrrrr")
    }
})

///get perticular product by id

router.get("/product/:id", async(req, res) => {
    try {
        const id = req.params.id;
        let product = await Product.findById(id);
        if (product) {
            return res.send(product)
        } else {
            return res.send("No Product Found")
        }
    } catch {
        res.send("errrrrr")
    }
})




/////// update the product data


router.patch("/product/:id", async(req, res) => {
    try {
        const id = req.params.id;
        let product = await Product.findByIdAndUpdate(id, req.body, {
            new: true
        });
        if (product) {
            return res.send(product)
        } else {
            return res.send("No Data Found")
        }
    } catch {
        res.send("errrrrr")
    }
})


////////delete perticular product

router.delete("/product/:id", async(req, res) => {
    try {
        const id = req.params.id;
        let product = await Product.findById(id);
        if (product) {
            await Product.findByIdAndDelete(id);
            return res.send("Product Deleted Successfully")
        } else {
            return res.send("No Data Found")
        }
    } catch {
        res.send("errrrrr")
    }
})


module.exports = router;