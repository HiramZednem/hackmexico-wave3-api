const express = require("express");
const { createUserController, getAllUsersController, loginController, updateUserInfoController } = require("../controllers/user.controller.js");

const router = express.Router();

router.get('/users', getAllUsersController);
router.post('/users', createUserController );
router.post('/users/login', loginController );
router.put('/users', updateUserInfoController );

module.exports = router;
