const express = require('express');
const router = express.Router();
const withAuth = require('../utils/middleware');

// Requiring models
let Student = require('../models/student');
let User = require('../models/user');

router.get('/find', withAuth, (req, res) => {

    const customers = [
        {id: 1, firstName: 'John', lastName: 'Doe'},
        {id: 2, firstName: 'Hasan', lastName: 'Khalili'},
        {id: 3, firstName: 'Hailo', lastName: 'Bib'},
    ];

    res.json(customers);
});

// Add route        // dont need to use parentheses for functions with no argument :)
router.get('/add', ensureAthenticated, (req, res) => {

    res.render('add_article', {
        title: 'Add Article'
    });
});

// Add submit POST route
router.post('/add', (req, res) => {

    // Using express-validator
    req.checkBody('title', 'Title is required').notEmpty();
    // req.checkBody('author', 'Author is required').notEmpty();
    req.checkBody('body', 'Body is required').notEmpty();

    // Get Errors
    let errors = req.validationErrors();

    if (errors) {

        res.render('add_article', {
            title: 'Add Article',
            errors:errors
        });
    } else {

        let article = new Student();

        // must have body-parser installed  to body props
        article.title = req.body.title;
        article.author = req.user._id; // cause we defined user as a global variable we can access it in reqs
        article.body = req.body.body;

        article.save((err) => {
            if (err) {
                console.log(err);
            } else {
                req.flash('success', 'Article Added');  // Using express-mesages
                res.redirect('/');
            }
        });
    }

});

// Load Edit Form
router.get('/edit/:id', ensureAthenticated,(req, res) => {

    Student.findById(req.params.id, (err, article) => {

        if (article.author !== req.user.id) {

            req.flash('danger', 'Not Authorized');
            res.redirect('/');
        } else {

            res.render('edit_article', {
                title: 'Edit Article',
                article: article
            });
        }

    });
});

// Update submit
router.post('/edit/:id', (req, res) => {

    let article = {};

    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    let query = {_id:req.params.id};

    Student.update(query, article, (err) => {
        if (err) {
            console.log(err);

        } else {
            req.flash('success', 'Article Updated');
            res.redirect('/');
        }
    });
});


router.delete('/:id', (req, res) => {

    if (!req.user.id) { // if user is not logged in
        res.status(500).send();
    }

    let query = {_id: req.params.id};

    Student.findById(req.params.id, (err, article) => {

        if (article.author !== req.user.id) { // if current logged user doesnt have access
            res.status(500).send();

        } else {
            Student.remove(query, (err) => {
                if (err) {
                    console.log(err);
                }
                res.send('Success')
            });
        }
    });
});

// Get single article
router.get('/:id', (req, res) => { // must use this after all other get request handles cause /:id can be even letters and mistaken
    // can handle this kind of things using next() either

    // Article.findById(req.params.id, (err, article) => {
    //     User.findById(article.author, (err, user) => {
    //
    //         res.render('article', {
    //             article: article,
    //             author: user.name
    //         });
    //     });
    // });
});

// Access Control
function ensureAthenticated(req, res, next) {

    if(req.isAuthenticated()) {
        return next();

    } else  {
        req.flash('danger', 'Please login');
        res.redirect('/users/login');
    }
}


module.exports = router; // accessing router from outside