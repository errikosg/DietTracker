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

const recipeSchema = new mongoose.Schema({
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
})

const foodSchema = new mongoose.Schema({
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
})

// consumptions
const consumptionsSchema = new mongoose.Schema({
    logEntries: [{
        date: {
            type: Date,
            required: true,
            min: '2023-01-01'
        },
        foodLogs: [foodSchema],
        recipeLogs: [recipeSchema],
        totalMacros: nutrientsSchema
    }],
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        unique : true,
        ref : 'User' //reference to onother model
    }
})

// methods
consumptionsSchema.methods.toJSON = function () {
    const consumptions = this ;
    const consumptionsObject = consumptions.toObject();
    return consumptionsObject;
}

const Consumptions = mongoose.model("Consumptions", consumptionsSchema);
module.exports = Consumptions;