const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    avatar: {
      type: String,
    },
    date_of_birth: {
      type: String,
    },
    first_day_work: {
      type: String,
    },
    full_name: {
      type: String,
    },
    phone_number: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
