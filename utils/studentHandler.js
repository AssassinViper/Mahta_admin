const mongoose = require('mongoose');
const consts = require('./consts');
const errHandler = require('./errHandler');

// Requiring models
let Student = require('../models/student');
let User = require('../models/user');


async function addStudent(req, res, next) {

    let params = req.body;
    let newStudent = new Student({});

    let issue = false;

    // check if no student already own requested mahtaCode
    await Student.findOne({ mahtaCode: params.mahtaCode }, function(err, student) {

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

    // check if inviterCode is valid
    if (params.inviterCode) {

        await Student.findOne({ mahtaCode: params.inviterCode }, function(err, student) {

            if (err) { // if there were errors running query

                issue = true;
                errHandler(err, res);

            } else if (!student) { // if no student found

                issue = true;
                res.status(consts.BAD_REQ_CODE)
                    .json({
                        error: consts.INVITER_NOT_EXISTS
                    });

            } else { // if inviterCode is valid

                newStudent.inviter = student._id;
            }
        });
    }

    if (issue) return;

    newStudent._id = new mongoose.Types.ObjectId();
    newStudent.mahtaCode = params.mahtaCode;
    newStudent.name.firstName = params.firstName;
    newStudent.name.lastName = params.lastName;
    newStudent.grade = params.grade;
    newStudent.field = params.field;
    newStudent.phone = params.phone;
    newStudent.credit = params.credit;
    newStudent.gift = params.gift;

    newStudent.save((err => {
        if (err) errHandler(err, res);
        else res.sendStatus(consts.SUCCESS_CODE);
    }));

}

function editStudent(req, res, next) {



}

function deleteStudent(req, res, next) {

}

module.exports = {addStudent, editStudent, deleteStudent};
