import categoryRoutes from "./main/routes/category/categoryRoutes";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import transactionRoutes from "./main/routes/transaction/transactionRoutes";
import userRoutes from "./main/routes/user/userRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use(userRoutes);
app.use(categoryRoutes);
app.use(transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
