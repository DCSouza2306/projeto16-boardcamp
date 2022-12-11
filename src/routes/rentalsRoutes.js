import { Router } from "express";
import { rentalsValidation } from "../middlewares/rentalsValidation.middleware.js";
import { postRentals } from "../controller/rentalsController.js";

const router = Router();

router.post("/rentals", rentalsValidation, postRentals);

export default router;