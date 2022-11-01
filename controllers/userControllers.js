const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

module.exports = {
  signIn: (req, res) => {
    User
      .findOne({
        $or: [{
            fullname: req.body.fullname
          },
          {
            email: req.body.email
          }
        ]
      })
      .then(userData => {
        if (userData) {
          let passwordCheck = bcrypt.compareSync(req.body.password, userData.password)
          if (passwordCheck) {
            let token = jwt.sign({
                email: userData.email
              },
              process.env.SECRET, {
                expiresIn: "20m",
              })
            res.status(200).json({
              message: 'Sign In Successful',
              user: {
                id: userData._id,
                fullname: userData.fullname,
                email: userData.email,
              },
              token: token
            })
          } else {
            return res.status(400).json({
              message: 'Wrong Password To Sign In!'
            })
          }
        } else {
          res.status(400).json({
            message: 'Username With This Email Not Found!'
          })
        }
      })
      .catch(err => {
        res.status(400).json({
          message: "Cannot Get User",
          err
        })
      })
  },
  signUp: (req, res) => {
    User.create({
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
      })
      .then(data => {
        let token = jwt.sign({
          id: data._id
        }, process.env.SECRET);

        res.status(200)
          .json({
            message: 'User Succesfully Created',
            user: {
              id: data._id,
              fullname: data.fullname,
              email: data.email,
            },
            token: token
          })
      })
      .catch(err => {
        res.status(400)
          .json({
            message: 'Failed To Register User',
            err
          })
      })
  },
  findAll: (req, res) => {
    User.find()
      .exec()
      .then(data => {
        res.status(200).json({
          message: "Succeed Get All Users",
          data
        })
      })
      .catch(err => {
        res.status(400).json({
          message: "Failed Get All Users!",
        })
      })
  },
  findById: (req, res) => {
    User.findOne({
        _id: req.params.id
      })
      .exec()
      .then(data => {
        res.status(200).json({
          message: "Succeed Get User By Id",
          data
        })
      })
      .catch(err => {
        res.status(400).json({
          message: "Failed To Get User By Id!"
        })
      })
  },
  update: (req, res) => {
    User.findByIdAndUpdate(
        req.params.id,
        req.body, {
          new: true
        }
      )
      .then((data) => {
        res.status(200).json({
          message: "Succeed To Update User",
          data
        })
      })
      .catch(err => {
        res.status(400).json({
          message: "Failed to Update!"
        })
      })
  },
  remove: (req, res) => {
    User.findByIdAndRemove(
        req.params.id
      )
      .then(() => {
        res.status(200).json({
          message: "Succeed To Delete"
        })
      })
      .catch(() => {
        res.status(400).json({
          message: "Failed To Delete!"
        })
      })
  }
}