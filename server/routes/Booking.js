const router = require("express").Router();

const Booking = require("../models/Booking");

// create booking
router.post("/create", async (req, res) => {
    try {
        const { customerId, listingId, hostId, startDate, endDate, totalPrice } = req.body;
        const newBooking = new Booking({
            customerId,
            listingId,
            hostId,
            startDate,
            endDate,
            totalPrice
        });
        await newBooking.save();
        res.status(200).json(newBooking);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Fail to create booking", error: error.message });
    }
})

module.exports = router