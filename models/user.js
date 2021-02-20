const mongoose = require("mongoose");

const geoSchema = new mongoose.Schema({
	type: { type: String, default: "Point" },
	coordinates: { type: [Number], index: "2dsphere" }
});

const userSchema = new mongoose.Schema({
	name: { type: String, required: [true, "Name is required"] },
	age: Number,
	available: { type: Boolean, default: false },
	geometry: geoSchema
});

const User = mongoose.model("user", userSchema);

module.exports = User;
