const UserModel = require("./../models/userModel");
const AppError = require("./../utils/appError");

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