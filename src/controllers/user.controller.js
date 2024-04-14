const { getAllUsersService, createUserService, loginService } = require("../services/user.service");

const createUserController = async (req, res) => createUserService(req, res);

const loginController = async (req, res) => loginService(req, res);

const getAllUsersController = async (req, res) => getAllUsersService(req, res);


module.exports = {
  createUserController,
  getAllUsersController,
  loginController
};