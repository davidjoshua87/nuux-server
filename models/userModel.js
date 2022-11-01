const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const UserSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique  : true,
      validate: {
          validator: function (email) {
              return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email);
          },
          message: 'Email not valid'
      }
    },
    password: {
      type: String,
      required: true,
    },
    subscription: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
