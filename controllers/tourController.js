const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const tourServices = require('../services/tourServices');


exports.createTour = catchAsync(async (req, res, next) => {
    const data = await tourServices.createTour(req.body);
        return res.status(200).json(
            data
        )
});
exports.getDetailTour = catchAsync(async (req, res, next) => {
    const data = await tourServices.getDetailTour(req.params.tourId);
        return res.status(200).json(
            data
        )
});




