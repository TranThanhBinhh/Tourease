const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      maxLength: 20,
      minLength: 2,
      trim: true,
      required: [true, "Please tell us your first name!"],
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9_\p{L}]+$/u.test(value);
        },
        message: "Firstname only contains characters and numbers",
      },
    },
    lastname: {
      type: String,
      maxLength: 20,
      minLength: 2,
      trim: true,
      required: [true, "Please tell us your last name!"],
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9_\p{L}]+$/u.test(value);
        },
        message: "Lastname only contains characters, numbers and underscore",
      },
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    phonenumber: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    gender: {
      type: Boolean,
      required: [true, "Please tell us your gender"],
    },
    address: String,
    isActived: {
      type: Boolean,
      default: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      select: false,
    },
    refreshToken: String,
    verifyToken: String,
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
userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } }).select("-verifyToken -refreshToken -__v");
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};


userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
}
const User = mongoose.model("User", userSchema);

module.exports = User;
