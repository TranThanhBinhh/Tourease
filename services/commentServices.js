const AppError = require("./../utils/appError");
const CommentModel = require("./../models/commentsModel");
const APIFeatures = require("./../utils/apiFeatures");
exports.createComment = (data,id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.content ||
        !id ||
        !data.tour
      ) {
        reject(new AppError("Please fill in all required fields", 400));
      } else {
        const comment = await CommentModel.create({
        content : data.content,
        user : id,
        tour: data.tour,
        });
          resolve({
              status: "success",
              data : comment
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

exports.getAllCommentByTour = (tourId,query) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!tourId) {
        reject(new AppError("Please fill in all required fields", 400));
      } else {
        const features = new APIFeatures(
          CommentModel.find({ tour: tourId}).lean(),
          query
        )
          .filter()
          .sort()
          .limitFields()
          .paginate();
        let comments = await features.query;
        const total = await CommentModel.countDocuments({tour: tourId});
        resolve({
            status: "success",
            total: total,
            result:comments.length,
            data: comments
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

exports.updateComment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
       if (
        !data.content
      ) {
        reject(new AppError("Please fill in all required fields", 400));
       } else {
        await CommentModel.findByIdAndUpdate(
        { _id: data.commentId },
        {
        content : data.content,
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