const TourModel = require("./../models/toursModel");
const AppError = require("./../utils/appError");
const { checkLike } = require("./../services/likeServices");

exports.createTour = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.description ||
        !data.price ||
        !data.departureLocation ||
        !data.period ||
        !data.destination ||
        !data.departureDay
      ) {
        reject(new AppError("Please fill in all required fields", 400));
      } else {
        const tour = await TourModel.create({
        name : data.name,
        description : data.description,
        price: data.price,
        departureLocation : data.departureLocation,
        period : data.period,
        destination : data.destination,
        departureDay : data.departureDay,
        images : data.images
        });
          resolve({
              status: "success",
              data : tour
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

exports.getDetailTour = (tourId,userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!tourId) {
        reject(new AppError("Please fill in all required fields", 400));
      } else {
        const tour = await TourModel.findById(tourId);
        const check = await checkLike(userId, tourId);
        console.log(check);
        if (tour) {
          resolve({
            status: "success",
            data: {
              ...tour.toObject(),
              isLiked: check
            }
            });
          }
          else {
              reject(new AppError("Tour not found", 400));
          }
      }
    } catch (error) {
      reject(error);
    }
  });
};
exports.updateTour = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.id||
        !data.name ||
        !data.description ||
        !data.price ||
        !data.departureLocation ||
        !data.period ||
        !data.destination ||
        !data.departureDay
      ) {
        reject(new AppError("Please fill in all required fields", 400));
      } else {
        await TourModel.findByIdAndUpdate(
        { _id: data.id },
        {
          name : data.name,
          description : data.description,
          price: data.price,
          departureLocation : data.departureLocation,
          period : data.period,
          destination : data.destination,
          departureDay : data.departureDay,
          image : data.image
        });
          resolve({
              status: "success",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};