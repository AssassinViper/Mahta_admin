let mongoose = require('mongoose');

// Student schema
let studentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    mahtaCode:{
        type: Number,
        required: true,
        unique: true,
        dropDups: true,
        trim: true
    },
    name: {
        firstName: { type: String, trim: true },
        lastName: { type: String, trim: true },
    },
    grade: String,
    field: String,
    phone: Number,
    credit: Number,
    gift : Number,
    inviter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'  // query the number and needed things to send
    },
    inviteds: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
        }
    ],
    purchases: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Purchase'
        }
    ],
    gifts: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gift'
        }
    ],
    created: {
        type: Date,
        default: Date.now
    },
    password: String
});

let Student = module.exports = mongoose.model('Student', studentSchema);
