const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// Bring in Models
let User = require('../models/user');
let Student = require('../models/student');
let School = require('../models/school');


module.exports = {

    insertFakeAdmin: () => {

        let admin = new User({
            username: 'admin',
            password: 'adminpassword'
        });

        // check if admin exists
        User.findOne({username: admin.username}, function (err, user) {

            if (err) {
                throw err;

            } else if (!user) { // insert fake admin if admin did not exist

                // hashing the password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(admin.password, salt, (err, hash) => {

                        if (err) console.log(err);

                        admin.password = hash;

                        admin.save((err => {

                            if (err) console.log(err);
                            else console.log(`fake admin added`)
                        }));
                    });
                });
            }

        });

    },

    insertFakeStudents: () => {

        Student.count({}, function(err, count) {

            if (count <= 50) { // check students count

                for (let i = 0; i < 200; i++) {

                    new Student({
                        _id: new mongoose.Types.ObjectId(),
                        code: 14000000 + i,
                        firstName: getFirstName(),
                        lastName: getLastName(),
                        grade: getGrade(),
                        field: getField(),
                        phone: getPhoneNumber()
                    })
                        .save((err) => {
                            if (err) console.log(err);
                            else console.log(`student added`)
                        });

                }

            }

        });
    },
    insertFakeSchools: () => {

        School.count({}, function(err, count) {

            if (count <= 1) { // check students count

                new School({
                    _id: new mongoose.Types.ObjectId(),
                    name: 'شاهد'
                }).save((err) => {
                        if (err) console.log(err);
                        else console.log(`school added`)
                    });

                new School({
                    _id: new mongoose.Types.ObjectId(),
                    name: 'بهشتی'
                }).save((err) => {
                    if (err) console.log(err);
                    else console.log(`school added`)
                });

                new School({
                    _id: new mongoose.Types.ObjectId(),
                    name: 'فرزانگان'
                }).save((err) => {
                    if (err) console.log(err);
                    else console.log(`school added`)
                });

                new School({
                    _id: new mongoose.Types.ObjectId(),
                    name: 'سمیعی'
                }).save((err) => {
                    if (err) console.log(err);
                    else console.log(`school added`)
                });

                new School({
                    _id: new mongoose.Types.ObjectId(),
                    name: 'احسانبخش'
                }).save((err) => {
                    if (err) console.log(err);
                    else console.log(`school added`)
                });

                new School({
                    _id: new mongoose.Types.ObjectId(),
                    name: 'باهنر'
                }).save((err) => {
                    if (err) console.log(err);
                    else console.log(`school added`)
                });

                new School({
                    _id: new mongoose.Types.ObjectId(),
                    name: 'تابش'
                }).save((err) => {
                    if (err) console.log(err);
                    else console.log(`school added`)
                });

            }

        });
    }

};

function getFirstName() {
    let text = "";

    let array = ["امیر", "حسن", "غلام", "زهرا", "پریا", "محمد", "علی", "فاطمه", "زیبا", "سید بیژن",
        "صبا" , "بابک", "شیرین", "سوگند", "فریبا", "حمید", "عطابک", "رویا"];

    text = array[(Math.floor(Math.random() * array.length))];

    return text;
}

function getLastName () {
    let text = "";

    let array = ["حمزه", "اعتدادی", "مجتهدی", "زیبا کناری", "پورباقری", "نجفی", "کاسپور", "محمدی",
        "غلام زاده", "منتظری", "آزاده" , "قریبی", "جوینده", "حیدری", "یزدانی", "پاینده", "قنبری", "قربانی",
        "نوازنده"];

    text = array[(Math.floor(Math.random() * array.length))];

    return text;
}

function getPhoneNumber () {

    let phone = "093";
    let numbers = "0123456789";

    for (let i = 0; i < 8; i++)
        phone += numbers.charAt(Math.floor(Math.random() * numbers.length));

    return phone;
}

function getField() {
    let text = "";

    let array = ["تجربی", "ریاضی", "انسانی", "هنر"];

    text = array[(Math.floor(Math.random() * array.length))];

    return text;
}

function getGrade() {
    let text = "";

    let array = ["دهم", "یازدهم", "دوازدهم", "فارغ التحصیل"];

    text = array[(Math.floor(Math.random() * array.length))];

    return text;
}