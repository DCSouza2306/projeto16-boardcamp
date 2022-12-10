import { Router } from "express";
import { getGames, postGames } from "../controller/gamesController.js";
import { gamesBodyValidation } from "../middlewares/gamesBodyValidation.middleware.js";

const router = Router();

router.get("/games", getGames);

router.post("/games", gamesBodyValidation, postGames);

export default router;
