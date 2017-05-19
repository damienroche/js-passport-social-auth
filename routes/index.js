const express = require('express');
const passport = require('passport');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User.js');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');

/*
** Main Routes
*/
router.get('/', homeController.home);

/*
** Auth Routes
*/

router.get('/login', authController.login);
router.get('/signup', authController.register);
router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', userController.updateAccount);
router.get('/logout', authController.logout);
router.get('/auth/facebook', authController.facebookLogin);
router.get('/auth/facebook/callback', authController.facebookCallback);
router.get('/auth/github', authController.githubLogin);
router.get('/auth/github/callback', authController.githubCallback);

module.exports = router;
