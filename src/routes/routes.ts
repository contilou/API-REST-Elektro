import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ListingController } from "../controllers/ListingController";

const router = Router();

//User Routes

router.post("/user", UserController.createUser);
router.get("/user/:id", UserController.readUser);
router.get("/users", UserController.readAllUsers);
router.put("/user/:id", UserController.updateUser);
router.delete("/user/:id", UserController.deleteUser);

//Listing Routes

router.post("/listing", ListingController.createListing);
router.get("/listing/:id", ListingController.readListing);
router.get("/listings", ListingController.readAllListings);
router.put("/listing/:id", ListingController.updateListing);
router.delete("/listing/:id", ListingController.deleteListing);

export default router;