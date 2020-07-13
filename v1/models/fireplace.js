var mongoose = require("mongoose")

// schema setup
var fireplaceSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: String,
    author: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

// model setup
module.exports = mongoose.model("Fireplace", fireplaceSchema)