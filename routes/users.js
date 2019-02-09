const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const withAuth = require('../auth/middleware');
const faker = require('../tools/faker');
const consts = require('../utils/consts');
const studentHandler = require('../utils/studentHandler');
const purchaseHandler = require('../utils/purchaseHandler');
const giftHandler = require('../utils/giftHandler');

const secret = 'mysecretboozboozak';

// Bring in Models
let User = require('../models/user');
let Student = require('../models/student');

// authenticate process
router.post('/authenticate', (req, res) => {

    console.log('/authenticate');
    
    const { username, password } = req.body;

    User.findOne({ username }, function(err, user) {

        if (err) {

            console.error(err);
            res.status(consts.INT_ERR_CODE)
                .json({
                    error: consts.ERR
                });
        } else if (!user) {

            res.status(consts.UNAUTHORIZED_CODE)
                .json({
                    error: consts.INCORRECT_USER
                });
        } else {

            // Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {

                if (err) throw err;

                if (isMatch) {

                    // Issue token
                    const payload = { username: username };
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '1h'
                    });

                    try {
                        res.cookie('token', token, { httpOnly: true }).sendStatus(200);

                    } catch (e) {
                        console.log(e)
                    }

                    console.log(token);

                } else {

                    res.status(consts.UNAUTHORIZED_CODE)
                        .json({
                            error: consts.INCORRECT_PASSWORD
                        });
                }
            });

        }
    });

});


// checking token
router.post('/checkToken', withAuth, function(req, res) {

    res.sendStatus(consts.SUCCESS_CODE);
});

router.post('/getStudentList', withAuth, (req, res) => {

    // console.log(req.cookies.token);

    Student.find({}, (err, students) => {

        if (err) {
            console.log(err);
            res.status(consts.INT_ERR_CODE)
                .json({
                    error: consts.ERR
                });

        } else {
            res.status(consts.SUCCESS_CODE).json(students);
        }
    });
});

router.post('/addStudent', withAuth, studentHandler.addStudent);
router.post('/editStudent', withAuth, studentHandler.editStudent);
router.post('/deleteStudent', withAuth, studentHandler.deleteStudent);


router.post('/commitPurchase', withAuth, purchaseHandler.commitPurchase);
router.post('/commitGift', withAuth, giftHandler.commitGift);




module.exports = router;