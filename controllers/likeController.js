const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const likeServices = require('../services/likeServices');

exports.likeOrUnlikeTour = catchAsync(async (req, res, next) => {
    const data = await likeServices.likeOrUnlikeTour(req.body,req.user.id);
        return res.status(200).json(
            data
        )
});