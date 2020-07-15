var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"), //initialize express
    mongoose = require("mongoose"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Fireplace = require("./models/fireplace"),
    User = require("./models/user"),
    Comment = require("./models/comment")


var fireplaceRoutes = require("./routes/fireplaces"),
    commentRoutes = require("./routes/comments")

// mongoose config
// mongoose is an Object Data Modeling (ODM) library for MongoDB and Node. js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/kid_v1", {
    useNewUrlParser: true
});

// app config
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + "/style"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));


// Landing page
app.get("/", function (req, res) {
    res.render("landing");
});


app.use("/fireplaces", fireplaceRoutes);
app.use("/fireplaces/:id/comments", commentRoutes);

app.listen(process.env.PORT || 3000, function () {
    console.log("The KiD project has started.")
});