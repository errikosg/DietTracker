const express = require('express');
const mongoose = require('mongoose');
const User = require("../db/schemas/User");
const MacroGoals = require("../db/schemas/MacroGoals")
const auth = require('../middleware/auth');
const router = new express.Router();

/***  ENDPOINTS ***/
// @route   POST p-tracker-api/macro-goals
// @desc    Add new portfolio?
// @access  Private
router.post('/', auth, async (req,res) => {
    const mgoals = new MacroGoals({
        ...req.body,
        owner: req.user._id
    })
    try{
        await mgoals.save();
        res.status(201).send(mgoals);
    }catch(e){
        res.status(400).send(e);
    }
})

// @route   GET diet-tracker-api/macro-goals
// @desc    Get user's macro goals
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const mgoals = await MacroGoals.findOne({ owner : req.user._id});
        res.status(200).send(mgoals);
    }catch(e){
        res.status(400).send(e);
    }
});

// @route   PATCH diet-tracker-api/macro-goals
// @desc    Update user's macro goals
// @access  Private
router.patch('/', auth, async (req, res) => {
    try {
        let mgoals = await MacroGoals.findOne({ owner : req.user._id});
        
        if(req.body.calories)
            mgoals.calories = req.body.calories;
        if(req.body.protein)
            mgoals.protein = req.body.protein;
        if(req.body.fat)
            mgoals.fat = req.body.fat;
        if(req.body.carbs)
            mgoals.carbs = req.body.carbs;
        await mgoals.save();
        res.status(201).send(mgoals);
    }catch(e){
        res.status(400).send(e);
    }
});

// @route   DELETE diet-tracker-api/macro-goals
// @desc    Delete user
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {
        const mgoals = await MacroGoals.findOne({ owner : req.user._id});
        await MacroGoals.findByIdAndRemove(mgoals._id);
        res.status(200).send({msg: 'Goals removed'});
    } catch (e) {
        //Bad request
        res.status(400).send({error: e.message});
    }
});

module.exports = router