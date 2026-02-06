import { Router } from "express";
import { UserController } from "../controller/UserController";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../service/UserService";

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get("/", userController.getAll);
router.get("/:id", userController.getById);
router.post("", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

export default router;
