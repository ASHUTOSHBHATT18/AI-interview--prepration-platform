const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required:[true,'Username is already taken'],
        unique:true
    },

    email:{
        type:String,
        required:[true,'Email is already registered'],
        unique:true
    },

    password:{
        type:String,
        required:true
    }

})

const userModel = mongoose.model('users',userSchema);

module.exports = userModel;