const mongoose = require('mongoose');
const consts = require('./consts');
const errHandler = require('./errHandler');
const giftHandler = require('./giftHandler');
const purchaseHandler = require('./purchaseHandler');
const config = require('../config/config');
const validator = require('../tools/validator');

// Requiring models
let Student = require('../models/student');
let Latest = require('../models/latest'); // TODO: must use this on commit group and inserting sample json


async function getStudentList(req, res, next) {

    // config.log(req.cookies.token);

    // projecting fields
    await Student.find({}, { __v: 0 }, (err, students) => {

        if (err) {
            errHandler(err);

        } else {
            res.status(consts.SUCCESS_CODE).json(students);

        }
    });
}//done

async function addStudent(req, res, next) {

    let params = req.body;
    let issue = validator.addStudent(req, res);
    if(issue){return};

    let newStudent = new Student({});

    let query = { // no need need to convert to Number in add/edit :|
        code: params.code
    };

    // check if any student already own requested code
    await Student.findOne(query, function(err, student) {
        
        if (err) {
            errHandler(err, res);
            return;

        } else if (student) { // if a student owns requested Code

            res.status(consts.BAD_REQ_CODE).json({error: consts.MAHTA_CODE_EXISTS});
            return;
        }
    });
    
    newStudent._id = new mongoose.Types.ObjectId();
    newStudent.code = params.code;
    newStudent.firstName = params.firstName;
    newStudent.lastName = params.lastName;
    newStudent.grade = params.grade;
    newStudent.field = params.field;
    newStudent.phone = params.phone;
    newStudent.home = params.home || 0;
    newStudent.school = params.school;

    // check if inviterCode is valid
    if (params.inviterCode) {

        // finding inviter
        await Student.findOne({ code: Number(params.inviterCode) }, function(err, student) {

            if (err) {
                errHandler(err, res);
                return;

            } else if (!student) { // if found no inviter

                res.status(consts.BAD_REQ_CODE).json({error: consts.INCORRECT_INVITER_ID});
                return;

            } else { // if inviterCode is valid

                // defining inviter for newStudent
                newStudent.inviter = student._id;

                // adding ref to inviter
                student.inviteds.push(newStudent);
                
                // saving inviter
                student.save((err => {
                    
                    if (err) {
                        errHandler(err, res);
                        return;
                    }
                    
                    newStudent.save((err => {
                        if (err) {
                            errHandler(err, res);
                            config.log(`error at saving new student`);
                            return;
                        }
                        res.status(consts.SUCCESS_CODE).send("OK");
                    }));
                }));
            }
        });
    }    
}//done

async function editStudent(req, res, next) {

    let params = req.body;

    let issue = validator.addStudent(req, res);
    if(issue){return};

    let query = {code: params.code};

    let student = {
        firstName: params.firstName,
        lastName: params.lastName,
        grade: params.grade,
        field: params.field,
        phone: params.phone,
        home: params.home,
        school: params.school
    };

    await Student.findOneAndUpdate(query, student, {upsert:false}, function(err, student){

        if (err) {
            errHandler(err, res);
            return;

        } else if (!student) {

            res.status(consts.NOT_FOUND_CODE).json({error: consts.INCORRECT_MAHTA_ID});
            return;
        }
    });
}//done

async function deleteStudent(req, res, next) {

    let params = req.body;

    if(validator.hasCode(req, res, params)){
        return;
    }

    let inviterId;
    let gifts;
    let purchases;

    let query = { // must cast this shit to Number
        code: Number(params.code)
    };

    config.log(`code type of: ${typeof (query.code)}`);

    // find student to get inviterId
    let studentToDelete = await Student.findOne(query, function(err, student) {

        if (err) { // if there were errors running query
            errHandler(err, res);
            return;

        } else if (!student) { // if found no student

            res.status(consts.BAD_REQ_CODE).json({error: consts.INCORRECT_MAHTA_ID});
            return;

        } else { // if found student

            // check if had inviter
            if (student.inviter)    inviterId = student.inviter;
            // check if had gifts
            if (student.gifts.length !== 0)    gifts = student.gifts;
            // check if had purchases
            if (student.purchases.length !== 0)    purchases = student.purchases;
        }
    });

    // if student had inviter
    if (inviterId) {

        // find inviter
        await Student.findOne({_id:inviterId}, function(err, student) {

            if (err) {
                errHandler(err, res);
                return;

            } else if (!student) { // if found no inviter

                config.log(`Could not find student's inviter`)

            } else { // if found inviter, delete id from inviteds array

                for( let i = 0; i < student.inviteds.length; i++){

                    if (student.inviteds[i].equals(studentToDelete._id))
                        student.inviteds.splice(i, 1);
                }

                // saving inviter
                student.save(err => {
                    if (err) {

                        errHandler(err);
                        return;

                    } else {
                        config.log(`inviter's property updated`);
                    }
                })
            }
        });
    }

    // if student had gifts
    if (gifts) {
        await giftHandler.deleteGifts(studentToDelete._id);
    }

    // if student had purchases
    if (purchases) {
        await purchaseHandler.deletePurchases(studentToDelete._id);
    }

    // remove student
    await Student.deleteOne(studentToDelete ,(err, student) => {

        if (err) {

            errHandler(err, res);
            return;

        } else {
            
            res.status(consts.SUCCESS_CODE).send("OK")
        }
    });
}//done

async  function getGPList(req, res, next) {

    let params = req.body;
    let issue = false;
    let gifts;
    let purchases;

    let studentId;

    let response = {
        gifts : [],
        purchases : []
    };

    query = {
        code: params.code
    };

    await Student.findOne(query, function(err, student) {

        if (err) {
            issue = true;
            errHandler(err, res);

        } else if (!student) { // if found no student

            issue = true;
            res.status(consts.NOT_FOUND_CODE)
                .json({
                    error: consts.INCORRECT_MAHTA_ID
                });
        } else { // if found student

            gifts = student.gifts;
            purchases = student.purchases;
            studentId = student._id;
        }
    });

    if (issue) return;


    // if student had gifts
    if (gifts) {
        await giftHandler.getGifts(studentId, response);
    }

    // if student had purchases
    if (purchases) {
        await purchaseHandler.getPurchases(studentId, response);
    }

    res.status(consts.SUCCESS_CODE)
        .json(response);

}

async  function spendCredit(req, res, next) {

    let params = req.body;
    let issue = false;//validator.validateSpendCredit(req, res, params);

    let code = Number(params.code) || 0;
    let price = Number(params.price) || 0;
    let useFrom = params.useFrom || "";

    if(code == "" || code <= 0){
        res.status(consts.NOT_FOUND_CODE).json({error: consts.INCORRECT_MAHTA_ID});
        return;
    }

    if(price <= 0){
        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_PRICE});
        return;
    }

    if(useFrom == "" || (useFrom != "gift" && useFrom != "credit")){
        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_USE_FROM});
        return;
    }

    query = {
        code: code,
    };

    await Student.findOne(query, function(err, student) {

        if (err) {
            issue = true;
            errHandler(err, res);

        } else if (!student) { // if found no student

            issue = true;
            res.status(consts.NOT_FOUND_CODE).json({error: consts.INCORRECT_MAHTA_ID});
            return;

        } else { // if found student

            if (params.useFrom === 'credit') {

                student.credit = student.credit - params.price;

                // if student's credit was not enough
                if (student.credit <= 0) {
                    issue = true;
                    res.status(consts.BAD_REQ_CODE)
                        .json({
                            error: consts.CREDIT_NOT_ENOUGH
                        });
                    return;
                }
            }

            if (params.useFrom === 'gift') {

                student.gift = student.gift - params.price;

                // if student's credit was not enough
                if (student.gift <= 0) {
                    issue = true;
                    res.status(consts.BAD_REQ_CODE)
                        .json({
                            error: consts.GIFT_NOT_ENOUGH
                        });
                    return;
                }
            }

            student.save((err => {

                if (err) {
                    issue = true;
                    errHandler(err, res);
                    return;
                }
            }));

        }
    });

    if (issue) return;
}

// TODO: params beinging,ending
// result check if codes are not repeated and build students
async  function groupCommit(req, res, next) {

    let params = req.body;
    let issue = false;

    let studentId;

    let response = {
        gifts : [],
        purchases : []
    };

    query = {
        code: params.code
    };

    await Student.findOne(query, function(err, student) {

        if (err) {
            issue = true;
            errHandler(err, res);

        } else if (!student) { // if found no student

            issue = true;
            res.status(consts.NOT_FOUND_CODE)
                .json({
                    error: consts.INCORRECT_MAHTA_ID
                });
        } else { // if found student

            gifts = student.gifts;
            purchases = student.purchases;
            studentId = student._id;
        }
    });

    if (issue) return;


    res.status(consts.SUCCESS_CODE)
        .json(response);

}

module.exports = {getStudentList, addStudent, editStudent, deleteStudent, getGPList, spendCredit, groupCommit};
