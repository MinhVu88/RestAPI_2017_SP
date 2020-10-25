const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");

// get a list of users from the db
router.get("/users", userControllers.getUsers);

// get specific users from the db based on their location
router.get("/users/geo", userControllers.getGeoUsers);

// add a new user to the users list in the db
router.post("/users", userControllers.addUser);

// update an existing user in the db
router.put("/users/:id", userControllers.updateUser);

// remove an existing user in the db
router.delete("/users/:id", userControllers.deleteUser);

module.exports = router;
