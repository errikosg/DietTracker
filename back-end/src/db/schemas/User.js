const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim : true
    },
    email : {
        type : String,
        unique : true,
        required : true,
        trim : true,
        lowercase : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },
    password : {
        type : String , 
        required : true,
        trim : true,
        validate(value){
            if(value.length < 6 || value.toLowerCase().includes('password') ){
                throw new Error('Password must be longer than 6 characters!');
            }
        }
    },
    tokens: [{
        token: {
            type : String,
            required : true
        }
    }],
})

// methods
userSchema.methods.generateAuthToken = async function() {
    const user = this ;
    const token = jwt.sign({_id : user._id.toString()},process.env.JWT_SECRET);
    
    user.tokens = user.tokens.concat({token});
    await user.save();
    
    return token;
}

userSchema.methods.toJSON = function () {
    const user = this ;
    const userObject = user.toObject();

    //delete what you do not want to return 
    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({ email });
    // token?
    if(!user){
        throw new Error('Wrong email given');
    }
    //verify password
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error('Wrong password given');
    }
    return user;
}

//hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this;
    
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password , 8);
    }
    
    next();
})

userSchema.statics.matchPasswords = async (confirmPass, currentPass) => {
    //verify password
    const isMatch = await bcrypt.compare(confirmPass, currentPass);

    if(!isMatch){
        throw new Error('Wrong password given');
    }
    return true;
}

//delete user's recipes when the user is removed ...

const User = mongoose.model("User", userSchema);

module.exports = User;