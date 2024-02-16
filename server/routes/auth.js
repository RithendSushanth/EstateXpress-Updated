// routes/auth.js

const router = require("express").Router();
const { registerUser, loginUser } = require("../controllers/auth.js");

/* Configuration Multer for File Upload */
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});
const upload = multer({ storage });

/* USER REGISTER */
router.post("/register", upload.single("profileImage"), registerUser);

/* USER LOGIN */
router.post("/login", loginUser);

module.exports = router;
