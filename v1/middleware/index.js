var Fireplace = require("../models/fireplace"),
    Comment = require("../models/comment")

var middlewareObj = {}

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login");
}

middlewareObj.checkFireplaceOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Fireplace.findById(req.params.id, function (req, foundedFireplace) {
            if (err) {
                res.redirect("back");
            } else {
                if (foundedFireplace.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

module.exports = middlewareObj;