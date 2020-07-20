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

// CREATE route
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
                    /* console.log(comment); */
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;

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
router.get("/:comment_id/edit", function (req, res) {
    Comment.findById(req.params.comment_id, function (err, editComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", { fireplace_id: req.params.id, comment: editComment });
        }
    });
});

// UPDATE route
router.put("/:comment_id", function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
        if (err) {
            res.redirect("/fireplaces");
        } else {
            res.redirect("/fireplaces/" + req.params.id);
        }
    });
});

// DESTROY route
router.delete("/:comment_id", function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/fireplaces/" + req.params.id);
        }
    });
});

module.exports = router;