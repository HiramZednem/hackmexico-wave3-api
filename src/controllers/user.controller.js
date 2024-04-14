const { getAllUsersService, createUserService } = require("../services/user.service");

const createUserController = async (req, res) => createUserService(req, res);

const getAllUsersController = async (req, res) => getAllUsersService(req, res);


module.exports = {
  createUserController,
  getAllUsersController
};