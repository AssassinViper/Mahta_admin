let mongoose = require('mongoose');

let studentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    code:{
        type: Number,
        required: true,
        unique: true,
        dropDups: true,
        trim: true
    },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    grade: String,
    field: String,
    phone: Number,
    credit: {
        type: Number,
        default: 0
    },
    gift : {
        type: Number,
        default: 0
    },
    inviter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
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
