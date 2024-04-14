import { Router } from "express";
import { createUser, login } from "../controllers/user.controller.js";

const router = Router();

router.post('/users', createUser )
// router.put('/users', createUser)

router.post('/users/login', login )

export default router;