<<<<<<< HEAD
import express from "express";
import {login} from "../controllers/authController.js";
import { register } from "../controllers/authController.js";

const router = express.Router();


router.post("/login", login);

router.post("/register",register);
export default router;
=======
import express from "express";
import {login} from "../controllers/authController.js";
import { register } from "../controllers/authController.js";

const router = express.Router();


router.post("/login", login);

router.post("/register",register);
export default router;
>>>>>>> d9ecd737f8d313d20bd5ba6170514ffdef0f1f5b
