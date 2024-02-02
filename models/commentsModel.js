const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    maxLength: 1000,
    minLength: 1,
    trim: true,
    required: [true, "Please provide a Comment name"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: [true, "A comment must belong to a user"],
  },
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour", // Reference to the Post model
    required: [true, "A comment must belong to a tour"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

CommentSchema.pre(/^findOneAndDelete/, async function (next) {
  this.deletedComment = await this.model.findOne(this.getFilter());
  next();
});

//populate profile when query
CommentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "_id firstname lastname",
  });
  next();
});
const CommentModel = mongoose.model("Comment", CommentSchema);

module.exports = CommentModel;
