const express = require('express');
const user    = express.Router();
const auth    = require("../middleware/auth");
const {
    signIn,
    signUp,
    getUser,
    findAll,
    findById,
    update,
    remove
} = require("../controllers/userControllers");

user.get('/', auth, findAll)
    .get('/me', getUser)
    .get('/:id', auth, findById)
    .post('/signup', signUp)
    .post('/signin', signIn)
    .put('/edit/:id', auth, update)
    .delete('/:id', auth, remove);

module.exports = user;
