import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();

//User Routes

router.post("/user", UserController.createUser);
router.get("/user/:id", UserController.readUser);
router.get("/users", UserController.readAllUsers);
router.put("/user/:id", UserController.updateUser);
router.delete("/user/:id", UserController.deleteUser);

export default router;