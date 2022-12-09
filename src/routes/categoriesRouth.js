import { Router } from "express";
import { getCategories } from "../controller/categoriesController.js";
import { categotyBodyValidation } from "../middlewares/categoryBodyValidation.middleware.js";

const router = Router();

router.get("/categories", getCategories);

router.post("/categories", categotyBodyValidation);

export default router;