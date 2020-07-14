var express = require("express"),
    router = express.Router({ mergeParams: true }),
    Fireplace = require("../models/fireplace"),
    Comment = require("../models/comment")

// NEW route
router.get("/new", function (req, res) {
    Fireplace.findById(req.params.id, function (err, fireplace) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { fireplace: fireplace });
        }
    });
});

// CREATE routes
router.post("/", function (req, res) {
    Fireplace.findById(req.params.id, function (err, fireplace) {
        if (err) {
            console.log(err);
            res.redirect("/fireplaces");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(comment);
                    comment.save();
                    fireplace.comments.push(comment);
                    fireplace.save();
                    res.redirect("/fireplaces/" + fireplace._id);
                }
            });
        }
    });
});

// EDIT route 
router.get





module.exports = router;