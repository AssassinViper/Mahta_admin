const mongoose = require('mongoose');
const consts = require('./consts');
const errHandler = require('./errHandler');
const config  = require('../config/config');

// Requiring models
let Student = require('../models/student');


async function getStudentList(req, res, next) {

    // console.log(req.cookies.token);

    Student.find({}, (err, students) => {

        if (err) {
            errHandler(err);

        } else {
            res.status(consts.SUCCESS_CODE).json(students);
        }
    });

}

async function addStudent(req, res, next) {

    let params = req.body;
    let newStudent = new Student({});

    let query = { // must cast this shit to Number
        mahtaCode: Number(params.code)
    };

    let issue = false;

    // check if any student already own requested mahtaCode
    await Student.findOne(query, function(err, student) {

        if (err) { // if there were errors running query

            issue = true; // must use Promises or async/await to make this shit work
            errHandler(err, res);

        } else if (student) { // if a student owns requested mahtaCode

            issue = true;
            res.status(consts.BAD_REQ_CODE)
                .json({
                    error: consts.MAHTA_CODE_EXISTS
                });
        }
    });

    if (issue) return;

    newStudent._id = new mongoose.Types.ObjectId();
    newStudent.mahtaCode = params.familyCode;
    newStudent.name.firstName = params.firstName;
    newStudent.name.lastName = params.lastName;
    newStudent.grade = params.grade;
    newStudent.field = params.field;
    newStudent.phone = params.phoneNumber;

    // check if inviterCode is valid
    if (params.inviterCode) {

        // finding inviter
        await Student.findOne({ mahtaCode: params.inviterCode }, function(err, student) {

            if (err) { // if there were errors running query

                issue = true;
                errHandler(err, res);

            } else if (!student) { // if no inviter found

                issue = true;
                res.status(consts.BAD_REQ_CODE)
                    .json({
                        error: consts.INVITER_NOT_EXISTS
                    });

            } else { // if inviterCode is valid

                // defining inviter for newStudent
                newStudent.inviter = student._id;

                // adding ref to inviter
                student.inviteds.push(newStudent);

                // saving inviter
                student.save((err => {
                    if (err) {
                        errHandler(err, res);

                        if (config.isDevelopement) {
                            console.log(`error at saving inviter`);
                        }
                    }
                }))
            }
        });
    }

    if (issue) return;

    newStudent.save((err => {
        if (err) {
            issue = true;
            errHandler(err, res);
        }
    }));

    if (issue) return;

    await Student.find({}, (err, students) => {

        if (err) {
            errHandler(err);

        } else {
            res.status(consts.SUCCESS_CODE).json(students);
        }
    });

}

async function editStudent(req, res, next) {

    let params = req.body;

    let query = {
        mahtaCode: Number(params.code)
    };

    let student = {
        name: {
            firstName: params.firstName,
            lastName: params.lastName
        },
        grade: params.grade,
        field: params.field,
        phone: params.phoneNumber
    };

    await Student.findOneAndUpdate(query, student, {upsert:false}, function(err, student){

        if (err) errHandler(err, res);
        else res.sendStatus(consts.SUCCESS_CODE);
    });

}

async function deleteStudent(req, res, next) {

    let params = req.body;
    let inviterId;

    let issue = false;

    let query = {
        mahtaCode: Number(params.code)
    };

    if (config.isDevelopement) console.log(`query : ${typeof (query.mahtaCode)}`);


    // TODO: must check if the student was invited and then delete its id from inviteds of inviter

    // find student to get inviterId
    // await Student.findOne(query, function(err, student) {
    //
    //     if (err) { // if there were errors running query
    //
    //         issue = true;
    //         errHandler(err, res);
    //
    //     } else if (!student) { // if no student found
    //
    //         issue = true;
    //         res.status(consts.BAD_REQ_CODE)
    //             .json({
    //                 error: consts.INCORRECT_MAHTA_ID
    //             });
    //
    //     } else { // if student was found
    //
    //         check if had inviter
            // if (student.inviter)    inviterId = student.inviter;
        // }
    // });

    // remove student
    await Student.deleteOne(query ,(err) => {

        if (err) {
            errHandler(err, res);
            issue = true;
        }
    });

    if (issue) return;

    await Student.find({}, (err, students) => {

        if (err) {
            errHandler(err);

        } else {
            res.status(consts.SUCCESS_CODE).json(students);
        }
    });

}

module.exports = {getStudentList, addStudent, editStudent, deleteStudent};
