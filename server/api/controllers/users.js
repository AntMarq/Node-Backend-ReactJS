const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');

exports.users_signup = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Mail exists'
                });
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user
                            .save()
                            .then(result => {
                                res.status(201).json({
                                    message: 'User created'
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            }
                        );
                    }
                });
            }
        })
}

exports.users_login = (req, res, next) => {
    console.log('login');

    User.find({
        email: req.body.email
    })
    .exec()
    .then(user => {
        if(user.length < 1){
            res.status(401).json({
                message: 'Auth failed 1'
            });
        }
        console.log('password = ' , req.body.password, "user password = " , user[0].password);

        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(err){
                return res.status(401).json({
                    message: 'Auth failed 2'
                });
            }
            console.log('process.env.JWT_KEY = ' , process.env.JWT_KEY);

            if(result){
                const token = jwt.sign(
                    {
                        email: user[0].email,
                        userId: user[0]._id
                    }, 
                    process.env.JWT_KEY, 
                    {
                        expiresIn: "1h"
                    }
                );
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token
                });
            }
            res.status(401).json({
                message: 'Auth failed 3'
            });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
} 

exports.users_delete = (req, res, next) => {
    User.remove({_id: req.params.userId}).exec()
        .then(result => {
            res.status(200).json({
                message: 'Delete user'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
}