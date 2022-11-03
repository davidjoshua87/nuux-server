const express = require("express");
const music = express.Router();
const {
  searchMusic,
  lookupMusic
} = require("../controllers/musicControllers");
const {
  auth
} = require("../middleware/isAuth");

music.get("/search/:term/song", auth, searchMusic)
  .get("/lookup/:id", auth, lookupMusic);


module.exports = music;
