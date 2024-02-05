const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: [true, "A Like must belong to a user"],
  },
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour", // Reference to the Post model
    required: [true, "A Like must belong to a tour"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//populate profile when query
LikeSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "_id firstname lastname",
  });
  next();
});
const LikeModel = mongoose.model("Like", LikeSchema);

module.exports = LikeModel;
