const express = require("express");
const music   = express.Router();
const auth    = require("../middleware/auth");
const {
  searchMusic,
  lookupMusic
} = require("../controllers/musicControllers");

music.get("/search/:term/song", auth, searchMusic)
  .get("/lookup/:id", auth, lookupMusic);


module.exports = music;
