const express = require("express");
const { createUserController, getAllUsersController } = require("../controllers/user.controller.js");

const router = express.Router();

router.get('/users', getAllUsersController);
router.post('/users', createUserController );

// router.post('/users/login', login );

module.exports = router;
