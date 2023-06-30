const mongoose = require('mongoose');

const macroGoalsSchema = new mongoose.Schema({
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
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        unique : true,
        ref : 'User' //reference to onother model
    }
})

// methods
macroGoalsSchema.methods.toJSON = function () {
    const mgoals = this ;
    const mgoalsObject = mgoals.toObject();
    return mgoalsObject;
}

const MacroGoals = mongoose.model("MacroGoals", macroGoalsSchema);
module.exports = MacroGoals;