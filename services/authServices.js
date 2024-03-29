const UserModel = require("./../models/userModel");
const AppError = require("./../utils/appError");
const crypto = require("crypto");

const { sendEmail } = require("./../utils/sendEmail");
const sendResetPwEmail = require("../utils/sendResetPwEmail");

exports.signup = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.password ||
        !data.firstname ||
        !data.lastname ||
        data.gender === undefined
      ) {
        reject(new AppError("Please fill in all required fields", 400));
      } else {
        const verifyToken = crypto.randomBytes(32).toString("hex");
        const user = await UserModel.create({
          email: data.email,
          password: data.password,
          role: data.role,
          firstname: data.firstname,
          lastname: data.lastname,
          phonenumber: data.phonenumber,
          gender: data.gender,
          verifyToken: verifyToken,
          address: data.address,
        });
        // const url = `${process.env.CLIENT_URL}/verify/${user._id}/${verifyToken}`;
        // await sendEmail(user.email, "Email Verification", url);
        resolve(user);
      }
    } catch (error) {
      reject(error);
    }
  });
};

exports.login = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { email, password } = data;
      if (!email || !password) {
        reject(new AppError("Please provide email and password!", 400));
      }
      // 2) Check if user exists && password is correct
      const user = await UserModel.findOne({ email })
        .select("+password ");
      if (!user || !(await user.correctPassword(password, user.password))) {
        reject(new AppError("Incorrect email or password", 401));
      }
      if (user.isActived === false) {
        reject(
          new AppError(
            "Your account has been locked. Please contact us for help",
            401
          )
        );
      }
      if (!user.verifyToken) {
          const verifyToken = crypto.randomBytes(32).toString("hex");
          await UserModel.findByIdAndUpdate(user._id, {
            verifyToken: verifyToken,
          });
        resolve(user);
        }
    } catch (error) {
      reject(error);
    }
  });
};

exports.verifyToken = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) reject(new AppError("User not found", 404));
      if (!user.verifyToken) reject(new AppError("Token not found", 404));

      const currentUser = await UserModel.findByIdAndUpdate(user._id, {
        verify: true,
        verifyToken: null,
      });
      resolve(currentUser);
    } catch (error) {
      reject(error);
    }
  });
};
exports.resetPassword = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!email) {
        reject(new AppError(`Missing parameter`, 400));
      } else {
        let user = await UserModel.findOne({ email: email });
        if (user) {
          const LENGTH = 12;
          const CHARACTERS =
            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
          const generatedPassword = Array.from(
            crypto.randomFillSync(new Uint32Array(LENGTH))
          )
            .map((x) => CHARACTERS[x % CHARACTERS.length])
            .join("");
          user.password = generatedPassword;
          user.passwordConfirm = generatedPassword;
          user.save();

          await sendResetPwEmail(email, "Password Reset", generatedPassword);

          resolve({
            status: "Success",
          });
        } else {
          reject(new AppError("This email has not been registered", 404));
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
