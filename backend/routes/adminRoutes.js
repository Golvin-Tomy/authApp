const express = require("express");
const router = express.Router();
const { getAllUsers, deleteUser,} = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const { addUser, updateUser } = require("../controllers/adminController");


router.get("/users", protect, getAllUsers);
router.delete("/users/:id", protect, deleteUser);
router.post("/users", protect, addUser);
router.put("/users/:id", protect, updateUser);

module.exports = router;
