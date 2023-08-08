const mongoose = require('mongoose');

// nutrients
const nutrientsSchema = new mongoose.Schema({
    calories: {
        type: Number,
        default: 0
    },
    protein: {
        type: Number,
        default: 0
    },
    carbs: {
        type: Number,
        default: 0
    },
    fat: {
        type: Number,
        default: 0
    }
})

// recipes
const recipesSchema = new mongoose.Schema({
    list: [{
        name: {
            type: String,
            required: true,
            trim : true
        },
        ingredients:[{
            foodId:{
                type: String,
                required: true
            },
            label:{
                type: String,
                required: true
            },
            image:{
                type: String,
            },
            weight: {
                type: Number
            },
            nutrients: nutrientsSchema,
        }],
        nutrients: nutrientsSchema
    }],
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        unique : true,
        ref : 'User' //reference to onother model
    }
})

// methods
recipesSchema.methods.toJSON = function () {
    const recipes = this ;
    const recipesObject = recipes.toObject();
    return recipesObject;
}

const Recipes = mongoose.model("Recipes", recipesSchema);
module.exports = Recipes;