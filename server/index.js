const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.js")
const listingRoutes = require("./routes/listing.js")
const bookingRoutes = require("./routes/Booking.js")
const userRoutes = require("./routes/user.js")
const adminRoutes = require('./routes/admin.js');

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(morgan("dev"));

/* ROUTES */
app.use("/auth", authRoutes)
app.use("/properties", listingRoutes)
app.use("/bookings", bookingRoutes)
app.use("/users", userRoutes)
app.use('/admin', adminRoutes);

const PORT = 5000 || process.env.PORT;

mongoose
    .connect(process.env.MONGO_URI, {
        dbName: "EstateXpress",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database connected");
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    })
    .catch((err) => console.log(`${err} did not connect`));