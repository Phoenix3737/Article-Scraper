var mongoose = require("mongoose");
var commentSchema = mongoose.Schema({
    text: String,
    article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' }
});

module.exports = mongoose.model("Comment", commentSchema);