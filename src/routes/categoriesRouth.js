import { Router } from "express";
import { getCategories, postCategories } from "../controller/categoriesController.js";
import { categotyBodyValidation } from "../middlewares/categoryBodyValidation.middleware.js";

const router = Router();

router.get("/categories", getCategories);

router.post("/categories", categotyBodyValidation, postCategories);

export default router;