const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/Users');
const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));
router.get('/staff_login', forwardAuthenticated, (req, res) => res.render('staff_login'));

// Register Page
// router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));
// router.get('/staff_register', forwardAuthenticated, (req, res) => res.render('staff_register'));

// router.post('/register', async (req, res) => {

//   const name = req.body.name
//   const USN_OR_EID = req.body.USN_OR_EID
//   const password1 = req.body.password1
//   const password2 = req.body.password2
//   let errors = [];

//   try {
//     const userExist = await User.findOne({ USN_OR_EID: USN_OR_EID });
//     const nameExist = await User.findOne({ name: name });
//     if (userExist) {
//       errors.push({ msg: "ID already exists" });
//     } else if (nameExist) {
//       errors.push({ msg: "Username already exists" });
//     }else if (password1 != password2) {
//       errors.push({ msg: "Password dosn't match" });
//     } else {
//       const user = new User({ name, USN_OR_EID, password1, password2});
//       await user.save();
//       //  res.render('/users/login')
//       errors.push({ msg: "User registered successfully" });
//       res.redirect('/users/login');
//     }
//   } catch (err) {
//     console.log(err);
//   }
// })

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

router.post('/staff_login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/staff_home',
    failureRedirect: '/users/staff_login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/users/login');
  });
});

router.get('/staff_logout', (req, res) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/users/staff_login');
  });
});

module.exports = router;
