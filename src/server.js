import express from 'express';
import cors from 'cors';
import categoriesRouth from './routes/categoriesRouth.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(categoriesRouth);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server runing in port ${port}`));

