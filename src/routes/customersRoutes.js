import { Router } from "express";
import { bodyCustomerValidation, idValidation } from "../middlewares/customersBodyValidation.middleware.js";
import { postCustomers,getCustomers, getCustomersId } from "../controller/customersController.js";

const router = Router();

router.post("/customers",bodyCustomerValidation, postCustomers);

router.get("/customers", getCustomers);

router.get("/customers/:id",idValidation, getCustomersId);

router.put("/customers");


export default router;