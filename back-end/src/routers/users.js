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
    res.status(200).send({
        user: req.user,
        token: req.token
    });
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

// @route   POST diet-tracker-api/users/confirm
// @desc    For a logged in user, re-enter password to confirm identity.
// @access  Private
router.post('/confirm', auth, async (req, res) => {
    try {
        await User.matchPasswords(req.body.password, req.user.password);
        res.status(200).send({msg: 'Passwords matched'});
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});

// @route   PATCH diet-tracker-api/users/name
// @desc    Update user's name.
// @access  Private
router.patch('/name', auth, async (req, res) => {
    try {
        console.log(req.user)
        req.user.name = req.body.name;
        await req.user.save();
        res.status(200).send({
            user: req.user,
            token: req.token
        });
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});

// @route   PATCH diet-tracker-api/users/email
// @desc    Update user's email.
// @access  Private
router.patch('/email', auth, async (req, res) => {
    try {
        req.user.email = req.body.email;
        await req.user.save();
        res.status(200).send({
            user: req.user,
            token: req.token
        });
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});

// @route   PATCH diet-tracker-api/users/password
// @desc    Update user's password.
// @access  Private
router.patch('/password', auth, async (req, res) => {
    try {
        req.user.password = req.body.password;
        await req.user.save();
        res.status(200).send({msg: 'Password updated'});
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});




module.exports = router