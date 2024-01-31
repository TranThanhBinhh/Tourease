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
      type: String,
      required: [true],
    },
    departureLocation: {
      type: String,
      required: [true],
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
      type: [String],
      validate: {
        validator: (array) => array.length <= 4,
        message: "A tour can have only up to 4 images",
      },
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
