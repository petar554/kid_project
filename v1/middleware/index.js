var Fireplace = require("../models/fireplace"),
    Comment = require("../models/comment")

var middlewareObj = {}

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
}

middlewareObj.checkFireplaceOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Fireplace.findById(req.params.id, function (err, foundedFireplace) {
            if (err) {
                res.redirect("back");
            } else {
                if (foundedFireplace.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that")
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundedComment) {
            if (err) {
                res.redirect("back");
            } else {
                if (foundedComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that")
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

module.exports = middlewareObj;