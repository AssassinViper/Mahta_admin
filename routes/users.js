const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const withAuth = require('../utils/middleware');
const faker = require('../tools/faker');

const secret = 'mysecretboozboozak';

// Bring in Models
let User = require('../models/user');
let Student = require('../models/student');

//setAdmin();

// setting admin manually
function setAdmin() {

    let admin = new User({
        username: 'admin',
        password: 'adminpassword'
    });

    // hashing the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(admin.password, salt, (err, hash) => {

            if (err) console.log(err);

            admin.password = hash;

            admin.save((err => {

                if (err) console.log(err);
                else console.log(`user added successfully`)
            }));
        });
    });
}


// authenticate process
router.post('/authenticate', (req, res, next) => {

    console.log('/authenticate');
    
    const { username, password } = req.body;

    User.findOne({ username }, function(err, user) {

        if (err) {

            console.error(err);
            res.status(500)
                .json({
                    error: 'Internal error please try again'
                });
        } else if (!user) {

            res.status(401)
                .json({
                    error: 'Incorrect username or password->user not found'
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

                    res.status(401)
                        .json({
                            error: 'Incorrect username or password->401'
                        });
                }
            });

        }
    });

});


// checking token
router.get('/checkToken', withAuth, function(req, res) {
    console.log('/checkToken');
    
    res.sendStatus(200);
});


//insertFakeStudentsToDb();


function insertFakeStudentsToDb() {

    for (let i = 0; i < 100; i++) {

        new Student({
            _id: new mongoose.Types.ObjectId(),
            mahtaCode: 1400000 + i,
            name: {
                firstName: faker.getFirstName(),
                lastName: faker.getLastName()
            },
            grade: faker.getGrade(),
            field: faker.getField(),
            phone: faker.getPhoneNumber(),
            credit: 0,
            gift: 0,
        })
        .save((err) => {
            if (err) console.log(err);
            else console.log(`student added`)
        });

    }

}


router.post('/getStudentList', withAuth, (req, res) => {

    console.log(req.cookies.token);
    
    Student.find({}, (err, students) => {

        if (err)
            console.log(err);
         else
            res.json(students);
    });

});



// Get single article
router.get('/:id', (req, res) => { // must use this after all other get request handles cause /:id can be even letters and mistaken

    Article.findById(req.params.id, (err, article) => {
        res.render('article', {
            article: article
        })
    });
});


module.exports = router; // accessing router from outside