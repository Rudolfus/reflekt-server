const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// Require the User model in order to interact with the database
const User = require("../models/User.model");

///////////////////// GET PUT DELETE ROUTES /////////////////////

// GET /api/users -  Retrieves all of the users
router.get("/users", (req, res, next) => {
  User.find()
    .then((allUsers) => res.json(allUsers))
    .catch((err) => {
      console.log("error getting all users", err);
      res.status(500).json(err);
    });
});

//  GET /api/users/:userId -  Retrieves a specific user by id
router.get("/user", (req, res, next) => {
  // if (!mongoose.Types.ObjectId.isValid(userId)) {
  //   res.status(400).json({ message: "Specified id is not valid" });
  //   return;
  // }
  console.log(req.payload);
  User.findById(req.payload._id)
    .populate("questions")
    .select("-password")
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      console.log("error getting user details from DB", err);
      res.status(500).json(err);
    });
});

// PUT  /api/users/:userId  -  Updates a specific user by id
router.put("/users/:userId", (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((updatedUser) => res.json(updatedUser))
    .catch((err) => {
      console.log("error updating user", err);
      res.status(500).json(err);
    });
});

// DELETE  /api/users/:userId  -  Deletes a specific user by id
router.delete("/users/:userId", (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findByIdAndRemove(userId)
    .then(() =>
      res.json({
        message: `User with ${userId} is removed successfully.`,
      })
    )
    .catch((err) => {
      console.log("error deleting user", err);
      res.status(500).json(err);
    });
});

module.exports = router;
