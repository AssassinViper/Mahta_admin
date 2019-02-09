const mongoose = require('mongoose');
const consts = require('./consts');
const errHandler = require('./errHandler');
const config = require('../config/config');

// Requiring models
let Student = require('../models/student');
let Purchase = require('../models/purchase');


async function commitPurchase(req, res, next) {

    let params = req.body;

    let purchase = new Purchase({});
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

            // if had an inviter
            if (student.inviter) inviterId = student.inviter;

            purchase._id = new mongoose.Types.ObjectId();
            purchase.owner = student._id;
            purchase.price = params.price;
            purchase.percent = params.percent;
            purchase.info = params.info;

            student.purchases.push(purchase);

            // save student
            student.save((err => {
                if (err) errHandler(err, res);
            }));

            // save purchase
            purchase.save((err => {
                if (err) errHandler(err, res);
                else res.sendStatus(consts.SUCCESS_CODE);
            }));
        }
    });

    // NOTE: headers are sent, client would not know if there was an err increasing inviter's credit

    if (inviterId) { // if student does have a inviter

        // find inviter
        await Student.findOne({ _id: inviterId }, function(err, student) {

            if (err) {

                if (config.isDevelopement)
                    console.log(`error finding student inviter: ${err}`);

            } else if (!student) { // if no inviter found

                if (config.isDevelopement)
                    console.log(`Couldn't find student inviter`);

            } else { // if inviter was found

                student.credit += purchase.price * purchase.percent / 100;

                // saving inviter
                student.save((err => {
                    if (err) errHandler(err, res);
                }));

            }
        });
    }

}

module.exports = {commitPurchase};


