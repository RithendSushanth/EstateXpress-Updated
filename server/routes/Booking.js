const router = require("express").Router();

const Booking = require("../models/Booking");

require("dotenv").config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const shortid = require('shortid');
const Razorpay = require('razorpay');

// Initialize razorpay credentials
const razorpayInstance = new Razorpay({
    key_id:"rzp_test_Mn9ma4Q7usMZHe",
    key_secret:"z0Tn5yZZCBt2ogXKZqy3XDcE",
});




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

// Pay for booking
// Route handler for the payment endpoint
router.post('/razorpay', async (req, res) => {
    const payment_capture = 1;
    const amount = req.body.amount; // Use req.body.amount instead of req.amount
    const currency = "INR";

    const options = {
        amount: amount,
        currency: currency,
        receipt: shortid.generate(),
        payment_capture
    };

    try {
        const response = await razorpayInstance.orders.create(options);
        console.log(response);
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
            description: 'sample',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error creating Razorpay order" });
    }
});



module.exports = router