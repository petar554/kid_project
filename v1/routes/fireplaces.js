var express = require("express"),
    router = express.Router({ mergeParams: true }),
    Fireplace = require("../models/fireplace")





// INDEX route (show all fireplaces)
router.get("/", function (req, res) {
    Fireplace.find({}).populate("comments").exec(function (err, allFireplaces) {
        if (err) {
            console.log(err);
        } else {
            res.render("fireplaces/index", { fireplaces: allFireplaces });
        }
    });
});


// CRETAE route 
router.post("/", function (req, res) {
    /* var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    }

    var newFireplace = {
        name: name,
        image: image,
        description: description,
        price: price,
        author: author
    } */

    Fireplace.create(req.body.fireplace, function (err, newlyFireplace) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/fireplaces")
        }
    });
});

// NEW route
router.get("/new", function (req, res) {
    res.render("fireplaces/new")
});



// SHOW route
router.get("/:id", function (req, res) {
    Fireplace.findById(req.params.id).populate("comments").exec(function (err, foundFireplace) {
        if (err) {
            console.log(err);
        } else {
            res.render("fireplaces/show", { fireplace: foundFireplace });
        }
    });
});

// EDIT route
router.get("/:id/edit", function (req, res) {
    Fireplace.findById(req.params.id, function (err, editFireplace) {
        if (err) {
            res.redirect("/fireplaces");
        } else {
            res.render("fireplaces/edit", { fireplace: editFireplace });
        }
    });
});


// UPDATE route 
router.put("/:id", function (req, res) {
    Fireplace.findByIdAndUpdate(req.params.id, req.body.fireplace, function (err, updatedFireplace) {
        if (err) {
            res.redirect("/fireplaces");
        } else {
            res.redirect("/fireplaces/" + updatedFireplace.id)
        }
    });
});

// DELETE route
router.delete("/:id", function (req, res) {
    Fireplace.findByIdAndRemove(req.params.id, function (err, removedFireplace) {
        if (err) {
            res.redirect("/fireplaces");
        } else {
            res.redirect("/fireplaces");
        }
    });
});


module.exports = router;
