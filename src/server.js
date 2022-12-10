import express from "express";
import cors from "cors";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import gamesRoutes from './routes/gamesRoutes.js';
import customerRoutes from './routes/customersRoutes.js'


const app = express();
app.use(express.json());
app.use(cors());
app.use(categoriesRoutes);
app.use(gamesRoutes);
app.use(customerRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server runing in port ${port}`));
