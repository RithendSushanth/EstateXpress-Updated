// routes/auth.js

const router = require("express").Router();
const { registerUser, loginUser, updatePassword, registerAdmin, loginAdmin } = require("../controllers/auth.js");

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

/* USER UPDATE PASSWORD */
// router.put("/update-password/:userId", upload.single("profileImage"), updatePassword);
router.put("/:userId/update-password", updatePassword);


/* ADMIN REGISTER */
// router.post("/admin/register", registerAdmin);

/* ADMIN LOGIN */
router.post("/admin/login", loginAdmin);

module.exports = router;
