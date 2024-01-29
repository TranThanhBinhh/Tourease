const UserModel = require("./../models/userModel");
const AppError = require("./../utils/appError");

const crypto = require("crypto");

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
      // console.log(profile);
    } catch (error) {
      reject(error);
    }
  });
};

// exports.updateMe = (id, data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (
//         !id ||
//         !data.firstname === undefined ||
//         data.lastname === undefined ||
//         data.gender === undefined
//       ) {
//         reject(new AppError(`Missing parameter`, 400));
//       } else {
//         await ProfileModel.findOneAndUpdate(
//           { user: id },
//           {
//             firstname: data.firstname,
//             lastname: data.lastname,
//             avatar: data.avatar,
//             birthday: data.birthday,
//             bio: data.bio,
//             address: data.address,
//             background: data.background,
//             gender: data.gender,
//             slug: data.slug,
//           },
//           {
//             runValidators: true,
//             context: "query",
//           }
//         );
//         resolve({
//           status: "Success",
//         });
//       }
//     } catch (error) {
//       reject(error);
//     }
//   });
// };
