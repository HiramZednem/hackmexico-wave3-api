const express = require("express");
const { createUserController, getAllUsersController, loginController, updateUserInfoController, getLoanController } = require("../controllers/user.controller.js");

const router = express.Router();

router.get('/users', getAllUsersController);
router.post('/users', createUserController );
router.post('/users/login', loginController );
router.put('/users', updateUserInfoController );
router.post('/users/loan', getLoanController );

module.exports = router;
