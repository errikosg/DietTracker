const express = require('express');
const Recipes = require("../db/schemas/Recipes")
const auth = require('../middleware/auth');
const router = new express.Router();
var mongoose = require('mongoose');

/***  ENDPOINTS ***/
// @route   POST p-tracker-api/recipes
// @desc    Add new recipes
// @access  Private
router.post('/', auth, async (req,res) => {
    // find if Recipes exist
    let resRecipes = await Recipes.findOne({ owner : req.user._id});
    const newRecipe = req.body
    try{
        if(resRecipes === null){
            const recipes = new Recipes({
                list: [newRecipe],
                owner: req.user._id
            })
            await recipes.save();
        }
        else{
            resRecipes.list.push(newRecipe)
            await resRecipes.save();
        }
        res.status(201).send(newRecipe);
    }catch(e){
        res.status(400).send({ error: e.message });
    }
})

// @route   GET diet-tracker-api/recipes
// @desc    Get user's recipes
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const recipes = await Recipes.findOne({ owner : req.user._id});
        if(recipes !== null) {
            res.status(200).send(recipes.list);
        }
        else{
            res.status(200).send([]);
        }
    }catch(e){
        res.status(400).send({ error: e.message });
    }
});

// @route   GET diet-tracker-api/recipes
// @desc    Update a recipe
// @access  Private
router.patch('/:id', auth, async (req, res) => {
    try {
        let recipes = await Recipes.findOne({ owner : req.user._id});
        const _id = req.params.id;
        
        const index = recipes.list.findIndex(recipe => recipe._id == _id)
        if(index === -1){
            throw new Error("Recipe does not exist")
        }
        const {name,ingredients,nutrients} = req.body

        let updatedRecipe;
        recipes.list = recipes.list.map(recipe => {
            if(recipe._id == _id){
                recipe.name = name;
                recipe.ingredients = [...ingredients]
                recipe.nutrients = {...nutrients}
                updatedRecipe = recipe
            }
            return recipe;
        })
        await recipes.save()
        res.status(200).send(updatedRecipe);
    }catch(e){
        res.status(400).send({ error: e.message });
    }
});

// @route   GET diet-tracker-api/recipes
// @desc    Delete a recipe
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let recipes = await Recipes.findOne({ owner : req.user._id});
        const _id = req.params.id;
        const index = recipes.list.findIndex(recipe => recipe._id == _id)
        if(index === -1){
            throw new Error("Recipe does not exist")
        }
        recipes.list = recipes.list.filter(recipe => {
            return recipe._id != _id;
        })
        await recipes.save();
        res.status(200).send({msg: "Recipe deleted"});
    }catch(e){
        res.status(400).send({ error: e.message });
    }
});


module.exports = router