const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const User = require('../db/user')

router.get('/', (req, res) => {
    res.json({
        message: 'success'
    })
})

// Users can login to the app wiwth valid email/password
// Users cannot login to the app with a blank or missing email
// Users cannot login to the app with a blank or incorrect password

function validUser(user) {
    const validEmail = typeof user.email == 'string' &&
                        user.email.trim() != '';
    const validPassword = typeof user.password == 'string' &&
                        user.password.trim() != '' &&
                        user.password.trim().length >= 6; 
    return validEmail && validPassword
}

router.post('/signup', (req, res, next) => {
    if(validUser(req.body)) {
        User
            .getOneByEmail(req.body.email)
            .then(user => {
                console.log('user', user);
                if(!user) {
                    // this is a unique email
                    // hash password
                    bcrypt.hash(req.body.password, 10)
                        .then((hash) => {
                    // insert user into db
                    const user = {
                        email: req.body.email,
                        password: hash,
                        created_at: new Date()
                    };

                    User
                        .create(user)
                        .then(id => {
                            res.json({
                                id,
                                message: 'post'
                                });
                        })
                    // redirect
                    });
                } else {
                    //email in use
                    next(new Error('Email in use'));
                }

            });

    } else {
        next(new Error('Invalid user'))
    }

})

module.exports = router;