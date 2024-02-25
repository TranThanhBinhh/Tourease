const TourModel = require("./../models/toursModel");
const LikeModel = require("./../models/likesModel");
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
          images : data.images
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
exports.searchTour = (queryParams) => {
  return new Promise(async (resolve, reject) => {
    try {
      const conditions = [];
      if (queryParams.destination) {
        conditions.push({ destination: { $regex: queryParams.destination, $options: 'i' } });
      }
      if (queryParams.minPrice) {
        conditions.push({ price: { $gte: queryParams.minPrice } });
      }
      if (queryParams.maxPrice) {
        conditions.push({ price: { $lte: queryParams.maxPrice } });
      }
      if (queryParams.period) {
        conditions.push({ period : queryParams.period  });
      }
      if (queryParams.departureLocation) {
        conditions.push({ departureLocation : queryParams.departureLocation  });
      }

      const tours = await TourModel.find({ $and: conditions });

      if (tours.length > 0) {
        resolve({
          status: "success",
          total: tours.length,
          data: tours
        });
      } else {
        resolve({
          message: "No tours found "
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
exports.getFavoriteTourList = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        reject(new AppError("Please fill in all required fields", 400));
      } else {
        const tours= await LikeModel.find({user: userId}).populate('tour');
        if (tours) {
          resolve({
            status: "success",
            total:tours.length,
            data:tours
            });
          }
          else {
            resolve({
            message:"You haven't liked any trip yet"
            });
          }
      }
    } catch (error) {
      reject(error);
    }
  });
};