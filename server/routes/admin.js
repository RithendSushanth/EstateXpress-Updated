const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');
const Listing = require('../models/Listing');

// Middleware to verify admin token
//router.use(authMiddleware);

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        const listingsByUser = [];

        for (const user of users) {
            const userListing = await Listing.find({ creator: user._id });
            listingsByUser.push(userListing);
        }

        res.status(200).json({users,listingsByUser});
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch listings', error: err.message });
    }
});

// Get listings of a user
router.post("/user_listings", async(req, res) =>{

    console.log(req.body);

    const userID = req.body.userID;

    console.log(userID);
    try{
        const users = await User.find({_id: userID});

        const listingsByUser = [];

        for (const user of users) {
            const userListing = await Listing.find({ creator: user._id });
            listingsByUser.push(userListing);
        }

        res.status(200).json({users,listingsByUser});


    }
    catch(err){
        res.status(500).json({ message: 'Failed to fetch listings', error: err.message });
    }


} )


// Delete a user
router.delete('/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete user', error: err.message });
    }
});

// Get all listings
router.get('/listings', async (req, res) => {
    try {
        const listings = await Listing.find({});
        res.status(200).json(listings);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch listings', error: err.message });
    }
});

// Delete a listing
router.delete('/listings/:listingId', async (req, res) => {
    try {
        const { listingId } = req.params;
        await Listing.findByIdAndDelete(listingId);
        res.status(200).json({ message: 'Listing deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete listing', error: err.message });
    }
});

module.exports = router;
