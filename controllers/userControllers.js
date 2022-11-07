const bcrypt     = require("bcrypt");
const saltRounds = 10;
const salt       = bcrypt.genSaltSync(saltRounds);
const User       = require("../models/userModel");
const jwt        = require("jsonwebtoken");

module.exports = {
  signIn: (req, res) => {
    User.findOne({
      email: req.body.email,
    })
      .then((userData) => {
        if (userData) {
          let passwordCheck = bcrypt.compareSync(
            req.body.password,
            userData.password
          );

          if (passwordCheck) {
            let token = jwt.sign(
              {
                id: userData._id,
              },
              process.env.SECRET,
              {
                expiresIn: "30m",
              }
            );
            res.status(200).json({
              message: "Sign In Successful",
              user: {
                id: userData._id,
                fullname: userData.fullname,
                email: userData.email,
                subscription: userData.subscription,
              },
              token: token,
            });
          } else {
            return res.status(400).json({
              message: "Wrong Password To Sign In!",
            });
          }
        } else {
          res.status(400).json({
            message: "Username With This Email Not Found!",
          });
        }
      })
      .catch((err) => {
        res.status(400).json({
          message: "Cannot Get User",
          err,
        });
      });
  },
  signUp: (req, res) => {
    let hash = bcrypt.hashSync(req.body.password, salt);
    User.create({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hash,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      province: req.body.province,
      zipCode: req.body.zipCode,
      country: req.body.country,
      language: req.body.language,
      subscription: req.body.subscription
    })
      .then((data) => {
        let token = jwt.sign(
          {
            id: data._id,
          },
          process.env.SECRET,
          {
            expiresIn: "30m",
          }
        );

        res.status(200).json({
          message: "User Succesfully Created",
          user: {
            id: data._id,
            fullname: data.fullname,
            email: data.email,
            password: hash,
            phoneNumber: data.phoneNumber,
            address: data.address,
            province: data.province,
            zipCode: data.zipCode,
            country: data.country,
            language: data.language,
            subscription: data.subscription,
          },
          token: token,
        });
      })
      .catch((err) => {
        if (err.code === 11000) {
          res.status(403).json({
            message: "Email Already Registered",
          });
        } else {
          res.status(400).json({
            message: "Failed To Register User",
          });
        }
      });
  },
  findAll: (req, res) => {
    User.find()
      .exec()
      .then((data) => {
        res.status(200).json({
          message: "Succeed Get All Users",
          data,
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: "Failed Get All Users!",
        });
      });
  },
  findById: (req, res) => {
    User.findOne({
      _id: req.params.id,
    })
      .exec()
      .then((data) => {
        res.status(200).json({
          message: "Succeed Get User By Id",
          data,
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: "Failed To Get User By Id!",
        });
      });
  },
  update: (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      upsert: true,
      rawResult: true,
    })
      .then((data) => {
        res.status(200).json({
          message: "Succeed To Update User",
          data,
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: "Failed to Update!",
        });
      });
  },
  remove: (req, res) => {
    User.findByIdAndRemove(req.params.id)
      .then(() => {
        res.status(200).json({
          message: "Succeed To Delete",
        });
      })
      .catch(() => {
        res.status(400).json({
          message: "Failed To Delete!",
        });
      });
  },
  getUser: (req, res) => {
    const token      = req.headers.authorization;
    const tokenSplit = token.split(" ")[1];
    const decoded    = jwt.verify(tokenSplit, process.env.SECRET);

    if (!token)
      res.status(401).json({
        message: "Authorization Token Not Found",
      });

    User.findOne({
      _id: decoded.id,
    })
      .then((user) => {
        const userDetails = {
          id: user._id,
          fullname: user.fullname,
          email: user.email,
          password: user.password,
          subscription: user.subscription,
        };
        res.status(200).json({
          user: userDetails,
        });
      })
      .catch((err) => {
        res.status(403).json({
          message: "User Not Found",
          error: err,
        });
      });
  },
};
