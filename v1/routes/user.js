var express = require("express");
var passport = require("passport");
var router = express.Router();
var User = require("../models/user");

// show sign up form
router.get("/register", function (req, res) {
    res.render("register");
});


// handling sign up logic
router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("fireplaces");
        });
    });
});












module.exports = router;


























/* var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


// LANDING PAGE
router.get("/", function (req, res) {
    res.render("landing");
});

// show sign up form
router.get("/register", function (req, res) {
    res.render("register");
});

// handle sign up logic
router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log("###################")
            console.log(err)
            console.log("###################")
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

// show login form
router.get("/login", function (req, res) {
    res.render("login");
});

// handle login logic
/* app.post("/login", middleware, callback func) */
/* router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function (req, res) {
    });

// Logout
router.get("/logout", function (req, res) {
    req.logOut();
    req.flash("success", "Logged you out!")
    res.redirect("/campgrounds");
})


module.exports = router;  */