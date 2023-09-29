import express from "express";
import {
  showUserPage,
  showEditUserPage,
  showSingleUserPage,
  createUser,
  deleteUser,
  updateUser,
  showCreateUserPage,
} from "../controllers/userController.js";
import { createUserMulter } from "../utils/multer.js";

// init router
const router = express.Router();

// EJS routes
router.get("/", showUserPage);
router.get("/create", showCreateUserPage);
router.get("/edit/:id", showEditUserPage);
router.get("/single/:slug", showSingleUserPage);

// API routes
router.post("/user", createUserMulter, createUser);
router.post("/update/:id", createUserMulter, updateUser);
router.get("/delete/:id", deleteUser);
// export router
export default router;
