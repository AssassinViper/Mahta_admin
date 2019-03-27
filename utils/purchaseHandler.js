const mongoose = require('mongoose');
const consts = require('./consts');
const errHandler = require('./errHandler');
const config = require('../config/config');

// Requiring models
let Student = require('../models/student');
let Purchase = require('../models/purchase');


async function commitPurchase(req, res, next) {

    let params = req.body;

    let code = params.code;
    let price = params.price;
    let percent = params.percent;
    let useFrom = params.useFrom;

    let purchase = new Purchase({});
    let inviterId;

    if(percent < 0 || percent > 100){
        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_PERCENT});
        return;
    }

    if(price <= 0){
        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_PRICE});
        return;
    }

    if(code == "" || code <= 0){
        res.status(consts.NOT_FOUND_CODE).json({error: consts.INCORRECT_MAHTA_ID});
        return;
    }

    if(useFrom == "" || (useFrom != "gift" && useFrom != "credit")){
        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_USE_FROM});
        return;
    }

    // find student
    await Student.findOne({ code: params.code }, function(err, student) {

        if (err) {
            errHandler(err, res);
            return;

        } else if (!student) { // if no student found

            res.status(consts.NOT_FOUND_CODE).json({error: consts.INCORRECT_MAHTA_ID});
            return;    

        } else { // if student was found

            //check the gift or credit amount
            if(useFrom == "gift"){

                if(price > student.gift){

                    res.status(consts.NOT_FOUND_CODE).json({error: consts.GIFT_NOT_ENOUGH});
                    return;
                }

                student.gift -= price;

            }else{

                if(price > student.credit){

                    res.status(consts.NOT_FOUND_CODE).json({error: consts.CREDIT_NOT_ENOUGH});
                    return;
                }

                student.credit -= price;
            }

            purchase._id = new mongoose.Types.ObjectId();
            purchase.owner = student._id;
            purchase.price = params.price;
            purchase.percent = params.percent;
            purchase.info = params.info;

            student.purchases.push(purchase);

            // save student
            student.save((err => {
                if (err) {
                    errHandler(err, res);
                    return;
                }
            }));

            // save purchase
            purchase.save((err => {
                if (err) {
                    errHandler(err, res);
                    return;
                }
            }));

            // if had an inviter
            if (student.inviter != "" && student.inviter != undefined){

                inviterId = student.inviter;
                
                Student.findOne({ _id: inviterId }, function(err, student) {

                    if (err) {
                        res.status(consts.SUCCESS_CODE).send("ُInviter finding error!!!");
                        return;
        
        
                    } else if (!student) { // if no inviter found
        
                        res.status(consts.SUCCESS_CODE).send("ُInviter not found!!!");
                        return;
        
                    } else { // if inviter was found
        
                        student.credit += price * percent / 100;
        
                        // saving inviter
                        student.save((err => {
                            if (err) errHandler(err, res);
                            return;
                        }));
        
                        res.status(consts.SUCCESS_CODE).send("OK");
                    }
                });
            
            }else{

                res.status(consts.SUCCESS_CODE).send("OK");
            } 
        }
    });
}

async function deletePurchases(ownerId) {

    let issue = false;

    await Purchase.deleteMany({ owner: ownerId }, function(err, info) {

        if (err) {
            errHandler(err, res);

        } else {
            config.log(`deleted ${info.n} purchases`);
        }
    }).catch(err => {
        config.log(err)
    });
}

async function getPurchases(ownerId, response) {

    let issue = false;

    let query = {
        owner: ownerId
    };

    await Purchase.find(query, {_id: 0, __v: 0, owner: 0}, function (err, purchases) {

        if (err) {
            issue = true;
            errHandler(err, res);
        } else {

            config.log('purchases: ');
            config.log(purchases);


            // only way to change sent argument to a function in js is this: :)
            response.purchases = purchases;
        }
    });

}

module.exports = {commitPurchase, deletePurchases, getPurchases};