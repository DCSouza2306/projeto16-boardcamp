import { Router } from "express";
import { bodyCustomerValidation } from "../middlewares/customersBodyValidation.middleware.js";
import { postCustomers } from "../controller/customersController.js";

const router = Router();

router.post("/customers",bodyCustomerValidation, postCustomers);

router.get("/customers");

router.get("/customers/:id");

router.put("/customers");


export default router;