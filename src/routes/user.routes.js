const express = require("express");
const { createUserController, getAllUsersController } = require("../controllers/user.controller.js");

const router = express.Router();

router.post('/users', createUserController );
router.put('/users', getAllUsersController);

// router.post('/users/login', login );

module.exports = router;
