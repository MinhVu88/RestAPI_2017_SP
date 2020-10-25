const userModel = require("../models/user");

const getUsers = async (req, res, next) => {
  try {
    const users = await userModel.find({});

    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getGeoUsers = async (req, res, next) => {
  const longitude = parseFloat(req.query.long);
  const latitude = parseFloat(req.query.lat);

  try {
    const users = await userModel.aggregate().near({
      near: {
        type: "Point",
        coordinates: [longitude, latitude]
      },
      maxDistance: 100000,
      spherical: true,
      distanceField: "dist.calculated"
    });

    if (!users) {
      return res.status(404).json({ error: "users not found" });
    }

    res.json(users);
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.status(404).json({ error: "users not found" });
    }

    res.status(500).send(error);
  }
};

const addUser = async (req, res, next) => {
  try {
    const user = req.body;

    const newUser = await userModel.create(user);

    res.json(newUser);
  } catch (error) {
    res.status(422).send(error.errors.name.message);
  }
};

const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  const user = req.body;

  try {
    const updated_user = await userModel.findByIdAndUpdate(
      { _id: userId },
      user
    );

    if (!updated_user) {
      return res.status(404).json({ error: "user not found" });
    }

    const modified_user = await userModel.findOne({ _id: userId });

    res.json(modified_user);
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.status(404).json({ error: "user not found" });
    }

    res.status(500).send(error);
  }
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const removed_user = await userModel.findByIdAndDelete({ _id: userId });

    if (!removed_user) {
      return res.status(404).json({ error: "user not found" });
    }

    res.json(removed_user);
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.status(404).json({ error: "user not found" });
    }

    res.status(500).send(error);
  }
};

module.exports = { getUsers, getGeoUsers, addUser, updateUser, deleteUser };
