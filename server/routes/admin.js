const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');
const Listing = require('../models/Listing');
const Booking = require('../models/Booking');

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

        res.status(200).json({ users, listingsByUser });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch listings', error: err.message });
    }
});

// Get listings of a user
// router.post("/user_listings", async(req, res) =>{

//     console.log(req.body);

//     const userID = req.body.userID;

//     console.log(userID);
//     try{
//         const users = await User.find({_id: userID});

//         const listingsByUser = [];

//         for (const user of users) {
//             const userListing = await Listing.find({ creator: user._id });
//             listingsByUser.push(userListing);
//         }

//         res.status(200).json({users,listingsByUser});


//     }
//     catch(err){
//         res.status(500).json({ message: 'Failed to fetch listings', error: err.message });
//     }


// } )
router.post("/user_listings", async (req, res) => {
    const userID = req.body.userID;

    console.log(userID);

    try {
        const users = await User.find({ _id: userID });
        const listingsByUser = [];

        for (const user of users) {
            const userListing = await Listing.find({ creator: user._id });
            listingsByUser.push(userListing);

            // Track property views for each listing
            for (const listing of userListing) {
                // Update the views field of the listing document
                await Listing.findByIdAndUpdate(listing._id, { $inc: { views: 1 } });
            }
        }

        res.status(200).json({ users, listingsByUser });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch listings', error: err.message });
    }
});


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



router.get('/analytics', async (req, res) => {
    try {
        // User Analytics
        const totalUsers = await User.countDocuments({});
        const newUserRegistrations = await User.countDocuments({ createdAt: { $gt: new Date(new Date() - 7 * 24 * 60 * 60 * 1000) } });

        // Calculate active users (users who have logged in within the last 7 days)
        const activeUsers = await User.countDocuments({ lastLoginAt: { $gt: new Date(new Date() - 7 * 24 * 60 * 60 * 1000) } });


        // Property Analytics
        const totalProperties = await Listing.countDocuments({});
        const newListings = await Listing.countDocuments({ createdAt: { $gt: new Date(new Date() - 7 * 24 * 60 * 60 * 1000) } });

        // Booking Analytics
        const totalBookings = await Booking.countDocuments({});
        const bookingTrends = "Steady"; // Implement logic to determine booking trends
        const popularBookingTimes = "Evenings"; // Implement logic to determine popular booking times

        // Revenue Analytics
        const bookings = await Booking.find({});
        const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
        const averageBookingValue = totalRevenue / bookings.length || 0;
        // const revenueTrends = "Increasing"; // Implement logic to determine revenue trends

        // Calculate revenue trends
        const prevWeekRevenue = await calculateRevenue(new Date(new Date() - 14 * 24 * 60 * 60 * 1000), new Date(new Date() - 7 * 24 * 60 * 60 * 1000));
        const currWeekRevenue = await calculateRevenue(new Date(new Date() - 7 * 24 * 60 * 60 * 1000), new Date());
        let revenueTrends = "Steady";
        if (currWeekRevenue > prevWeekRevenue) {
            revenueTrends = "Increasing";
        } else if (currWeekRevenue < prevWeekRevenue) {
            revenueTrends = "Decreasing";
        }

        res.status(200).json({
            totalUsers,
            newUserRegistrations,
            activeUsers,
            totalProperties,
            newListings,
            totalBookings,
            bookingTrends,
            popularBookingTimes,
            totalRevenue,
            averageBookingValue,
            revenueTrends,
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch analytics', error: err.message });
    }
})

// Function to calculate total revenue within a date range
async function calculateRevenue(startDate, endDate) {
    const bookings = await Booking.find({ createdAt: { $gte: startDate, $lt: endDate } });
    return bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
}

module.exports = router;
