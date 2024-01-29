const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const userServices = require('../services/userServices');

exports.getMe = catchAsync(async (req, res, next) => {
    const data = await userServices.getMe(req.user.id);
        return res.status(200).json(
            data
        )
});




