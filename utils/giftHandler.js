const mongoose = require('mongoose');
const consts = require('./consts');
const errHandler = require('./errHandler');
const config = require('../config/config');

// Requiring models
let Student = require('../models/student');
let Gift = require('../models/gift');


async function commitGift(req, res, next) {

    let params = req.body;

    let gift = new Gift({});
    let inviterId;

    // find student
    await Student.findOne({ mahtaCode: params.familyCode }, function(err, student) {

        if (err) {
            errHandler(err, res);

        } else if (!student) { // if no student found

            res.status(consts.NOT_FOUND_CODE)
                .json({
                    error: consts.INCORRECT_MAHTA_ID
                });

        } else { // if student was found

            // creating gift
            gift._id = new mongoose.Types.ObjectId();
            gift.owner = student._id;
            gift.price = params.price;
            gift.info = params.info;

            // updating student
            student.gifts.push(gift);
            student.gift += gift.price;


            // save student
            student.save((err => {
                if (err) {
                    errHandler(err, res);
                    if (config.isDevelopement) console.log(`err in saving student`);
                }

            }));

            // save purchase
            gift.save((err => {
                if (err) {
                    errHandler(err, res);
                    if (config.isDevelopement) console.log(`err in saving gift`);
                }
                else res.sendStatus(consts.SUCCESS_CODE);
            }));

        }
    });
}

module.exports = {commitGift};


