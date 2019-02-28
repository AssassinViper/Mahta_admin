let mongoose = require('mongoose');

let dConverter = require('../tools/dateConverter');

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

    grade: String, //TODO: new year function
    field: String,
    school: String,
    phone: Number,
    home: Number,
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
        type: String,
        default: () => {
            return dConverter.getLiveDate();
        }
    },
    password: String
});

let Student = module.exports = mongoose.model('Student', studentSchema);
