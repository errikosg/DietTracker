const express = require('express');
const mongoose = require('mongoose');
// const User = require("../db/schemas/User");
const bcrypt = require('bcryptjs');

const router = new express.Router();
router.get('/', async (req, res) => {
    console.log("WOW")
    res.status(200).send(req);
});

module.exports = router