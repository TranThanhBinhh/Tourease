const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const commentServices = require('../services/commentServices');
const CommentModel = require('../models/commentsModel');

exports.createComment = catchAsync(async (req, res, next) => {
    const data = await commentServices.createComment(req.body,req.user.id);
        return res.status(200).json(
            data
        )
});
exports.getAllCommentByTour = catchAsync(async (req, res, next) => {
    const data = await commentServices.getAllCommentByTour(req.params.tourId, req.query);
        return res.status(200).json(
            data
        )
});
exports.updateComment = catchAsync(async (req, res, next) => {
    const data = await commentServices.updateComment(req.body);
        return res.status(200).json(
            data
        )
});
// exports.getAllCommentByTour = factory.getAll(CommentModel);
// exports.updateTour = catchAsync(async (req, res, next) => {
//     const data = await tourServices.updateTour(req.body);
//         return res.status(200).json(
//             data
//         )
// });


