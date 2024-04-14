const { getAllUsersService, createUserService, loginService, updateUserInfoService, getLoanService } = require("../services/user.service");

const createUserController = async (req, res) => createUserService(req, res);

const loginController = async (req, res) => loginService(req, res);

const getAllUsersController = async (req, res) => getAllUsersService(req, res);

const updateUserInfoController = async (req, res) => updateUserInfoService(req, res);

const getLoanController = async (req, res) => getLoanService(req, res);


module.exports = {
  createUserController,
  getAllUsersController,
  loginController,
  updateUserInfoController,
  getLoanController,
};