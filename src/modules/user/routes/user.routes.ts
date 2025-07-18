import { Router } from "express";
import UserController from "../controllers/user.controller";
import authMiddleware from "../../../middlewares/Auth";
import { container } from "tsyringe";

const router = Router();
const userController = container.resolve(UserController);

router.get("/", authMiddleware, userController.GetAllUsers);
router.get("/:id", authMiddleware, userController.GetOneUser);
router.delete("/:id", authMiddleware, userController.DeleteUser);
router.put("/:id", authMiddleware, userController.UpdateUser);

module.exports = router;
