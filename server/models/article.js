var mongoose = require("mongoose");
var articleSchema = mongoose.Schema({
    headline: String,
    author: String,
    url: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

module.exports = mongoose.model("Article", articleSchema);