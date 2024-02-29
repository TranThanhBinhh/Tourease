const UserModel = require("./../models/userModel");
const AppError = require("./../utils/appError");
const bcrypt = require("bcryptjs");

exports.getMe = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        reject(new AppError(`Missing parameter`, 400));
      } else {
        let user = await UserModel.findById(id);
        console.log(user);
        if (!user) {
          reject(new AppError(`User not found`, 400));
        } else {
          resolve({
            status: "Success",
            data: user,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

exports.updateMe = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !id ||
        !data.firstname === undefined ||
        data.lastname === undefined ||
        data.gender === undefined
      ) {
        reject(new AppError(`Missing parameter`, 400));
      } else {
        await UserModel.findOneAndUpdate(
          { _id: id },
          {
            firstname: data.firstname,
            lastname: data.lastname,
            address: data.address,
            gender: data.gender,
            phonenumber: data.phonenumber,
          },
          {
            runValidators: true,
            context: "query",
          }
        );
        resolve({
          status: "Success",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
exports.lockOrUnlockAccount = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        reject(new AppError(`Missing parameter`, 400));
      } else {
        let account = await UserModel.findById(id);
        if (account) {
          const updatedIsActived =
            account.isActived !== undefined ? !account.isActived : false;
          await UserModel.findByIdAndUpdate(id, {
            isActived: updatedIsActived,
          });
        }

        resolve({
          status: "Success",
        });
      }

    } catch (error) {
      reject(error);
    }
  });
};

exports.changePassword = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id || !data.currentPassword || !data.newPassword || !data.confirmPassword) {
        reject(new AppError(`Missing parameter`, 400));
      } else {
        let user = await UserModel.findById(id).select("password");
        if (!user) {
          resolve({
            errCode: 1,
            message: "User not found"
          });
        }
        const isCorrectPassword = await user.correctPassword(data.currentPassword, user.password);
        if (!isCorrectPassword) {
          resolve({
            errCode: 2,
            message: "Current password is incorrect"
          });
        }
        if (data.newPassword !== data.confirmPassword) {
          resolve({
            errCode: 3,
            message: "The confirmation password does not match the new password"
          });
        }
        user.password = data.newPassword;
        await user.save();
        resolve({
          errCode: 0,
          message: "Password updated successfully"
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
