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
      validate: {
        validator: function (password) {
            return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,25}$/.test(password);
        },
        message: 'Password not valid'
    }
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    language: {
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
