const Restaurant = require("../model/restaurant")
const express = require('express');
const router = express.Router();

/////send the restro details in thd database
router.post("/restro", async(req, res) => {
    console.log(req.body, "shreyaaa");
    try {
        const restaurant = new Restaurant(req.body);
        console.log(restaurant, "rrrrrrrrrrrr");

        const savedData = await restaurant.save();
        return res.send({
            savedData,
            mgs: "Restaurant Created Successfully"
        });

    } catch {
        res.status(500).json({
            err: "errr"
        })

    }
})


//finding the perticular resto

router.get("/restro", async(req, res) => {
    try {
        let restaurant = await Restaurant.find();
        if (restaurant) {
            return res.send(restaurant)
        } else {
            return res.send("No Data Found")
        }
    } catch {
        res.send("errrrrr")
    }
})

///get perticular restaurant by id

router.get("/restro/:id", async(req, res) => {
    try {
        const id = req.params.id;
        let restaurant = await Restaurant.findById(id);
        if (restaurant) {
            return res.send(restaurant)
        } else {
            return res.send("No Data Found")
        }
    } catch {
        res.send("errrrrr")
    }
})

/////// update the restro data


router.patch("/restro/:id", async(req, res) => {
    try {
        const id = req.params.id;
        let restaurant = await Restaurant.findByIdAndUpdate(id, req.body, {
            new: true
        });
        if (restaurant) {
            return res.send(restaurant)
        } else {
            return res.send("No Data Found")
        }
    } catch {
        res.send("errrrrr")
    }
})







////////delete perticular restro

router.delete("/restro/:id", async(req, res) => {
    try {
        const id = req.params.id;
        let restaurant = await Restaurant.findById(id);
        if (restaurant) {
            await Restaurant.findByIdAndDelete(id);
            return res.send("Restaurant Deleted Successfully")
        } else {
            return res.send("No Data Found")
        }
    } catch {
        res.send("errrrrr")
    }
})


module.exports = router