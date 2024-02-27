const mongoose = require("mongoose");


const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us tour name!"],
      },
    description: {
      type: String,
      required: [true],
    },
    price: {
      type: Number,
      required: [true],
    },
    departureLocation: {
      type: String,
      required: [true],
    },
    numLikes: {
      type: Number,
      defaultValue:0,
    },
    period: {
      type: String,
      required: [true],
        },
    // transportation: {
    //   type: String,
    //   required: [true],
    //     },
    images: {
      type: String,
      required: [true],
    },
    destination: {
      type: String,
      required: [true],
        },
    departureDay: {
      type: Date,
      required: [true],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
