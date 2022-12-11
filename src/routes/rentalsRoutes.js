import { Router } from "express";
import {
  rentalsValidation,
  returnRentalsValidation,
  deleteRentalsValidation,
} from "../middlewares/rentalsValidation.middleware.js";
import {
  postRentals,
  getRentals,
  postRentalsId,
  deleteRentals,
} from "../controller/rentalsController.js";

const router = Router();

router.post("/rentals", rentalsValidation, postRentals);

router.get("/rentals", getRentals);

router.post("/rentals/:id/return", returnRentalsValidation, postRentalsId);

router.delete("/rentals/:id", deleteRentalsValidation, deleteRentals);

export default router;
