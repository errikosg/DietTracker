const express = require('express');
const mongoose = require('mongoose');
const User = require("../db/schemas/User");
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const mongodb = require('mongodb');

const router = new express.Router();

/***  ENDPOINTS ***/
// @route   GET p-tracker-api/users/me
// @desc    Get users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    res.status(200).send(req.user);
});

// @route   POST diet-tracker-api/users
// @desc    Signup a user
// @access  Public
router.post('/', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({
            user,
            token
        });
    } catch (e) {
        res.status(400).send({ error: e });
    }

});

// @route   POST diet-tracker-api/users/login
// @desc    Login a user
// @access  Public 
router.post('/login', async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).send({
            user,
            token
        });
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});

// @route   POST diet-tracker-api/users/logout
// @desc    Logout a user
// @access  Private
router.post('/logout', auth, async (req, res) => {
    try {
        //delete a specific token - from the session user wants to log out
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });

        await req.user.save();
        res.status(200).send({msg: "Logout successfull"});
    } catch (e) {
        res.status(500).send();
    }
});

// @route   POST diet-tracker-api/users/logoutAll
// @desc    Logout a user from all sessions
// @access  Private
router.post('/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send();
    } catch (e) {
        res.status(500).send();
    }
});

// @route   DELETE diet-tracker-api/users/me
// @desc    Delete user
// @access  Private
router.delete('/me', auth, async (req, res) => {
    try {
        await User.findByIdAndRemove(req.user._id);
        res.status(200).send({msg: 'User removed'});
    } catch (e) {
        //Bad request
        res.status(400).send({error: e.message});
    }
});


module.exports = router