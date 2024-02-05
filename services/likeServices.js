const AppError = require("./../utils/appError");
const LikeModel = require("./../models/likesModel");
const TourModel = require("./../models/toursModel");
const checkLike = async(userId,tourId) => {
    const check = await LikeModel.findOne({
        user: userId,
        tour: tourId,
    })
    if (check !== null) {
        return true;
    }
    else {
        return false;
    }
}
const likeOrUnlikeTour = async (data, id) => {
  try {
    if (!data.action || !id || !data.tour) {
      throw new AppError("Please fill in all required fields", 400);
    }
    const check = await checkLike(id, data.tour);
    if (data.action === "like") {
      if (!check) {
        await Promise.all([
          LikeModel.create({ user: id, tour: data.tour }),
          TourModel.findByIdAndUpdate(data.tour, { $inc: { numLikes: 1 } })
        ]);
        return { status: "success", message: "Like success" };
      } else {
        return { status: "fail", message: "You already like this tour" };
      }
    } else {
      if (check) {
        await Promise.all([
          LikeModel.deleteOne({ user: id, tour: data.tour }),
          TourModel.findByIdAndUpdate(data.tour, { $inc: { numLikes: -1 } })
        ]);
        return { status: "success", message: "Unlike success" };
      } else {
        return { status: "fail", message: "You haven't liked this tour yet" };
      }
    }
  } catch (error) {
    throw error;
  }
};
module.exports = { checkLike,likeOrUnlikeTour };
