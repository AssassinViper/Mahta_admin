let mongoose = require('mongoose');

// User schema
let userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        dropDups: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    }
});

let User = module.exports = mongoose.model('User', userSchema);
