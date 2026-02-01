import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ListingController } from "../controllers/ListingController";
import { FavoriteController } from "../controllers/FavoriteController";

const router = Router();

//User Routes

router.post("/users", UserController.createUser);
router.get("/users/:userId", UserController.readUser);
router.get("/users", UserController.readAllUsers);
router.put("/users/:userId", UserController.updateUser);
router.delete("/users/:userId", UserController.deleteUser);

//Listing Routes

router.post("/listings", ListingController.createListing);
router.get("/listings/:listingId", ListingController.readListing);
router.get("/listings", ListingController.readAllListings);
router.put("/listings/:listingId", ListingController.updateListing);
router.delete("/listings/:listingId", ListingController.deleteListing);

//Favorite Routes

router.post("/favorites/:userId/:listingId", FavoriteController.createFavorite);
router.get("/favorites/:userId", FavoriteController.readFavoritesByUser);
router.delete("/favorites/:userId/:listingId", FavoriteController.deleteFavorite);

export default router;