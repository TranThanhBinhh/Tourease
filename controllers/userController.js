const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const userServices = require('../services/userServices');
const UserModel = require('./../models/userModel');


exports.getMe = catchAsync(async (req, res, next) => {
    const data = await userServices.getMe(req.user.id);
        return res.status(200).json(
            data
        )
});
exports.updateMe = catchAsync(async (req, res, next) => {
    const data = await userServices.updateMe(req.user.id,req.body);
        return res.status(200).json(
            data
        )
});
exports.getAllUsers = factory.getAll(UserModel);
exports.lockOrUnlockAccount = catchAsync(async (req, res, next) => {
    const data = await userServices.lockOrUnlockAccount(req.params.id);
        return res.status(200).json(
            data
        )
});



