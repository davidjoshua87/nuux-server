const express = require('express');
const user    = express.Router();
const {
    signIn,
    signUp,
    getUser,
    findAll,
    findById,
    update,
    remove
} = require("../controllers/userControllers");
const { auth } = require("../middleware/isAuth");

user.get('/', auth, findAll)
    .get('/me', auth, getUser)
    .get('/:id', auth, findById)
    .post('/signup', signUp)
    .post('/signin', signIn)
    .put('/edit/:id', auth, update)
    .delete('/:id', auth, remove);

module.exports = user;
