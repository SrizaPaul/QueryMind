import employeeRoutes from "./routes/employee.routes.js";
import connectDB from "./config/db.js";
import healthRoutes from "./routes/health.routes.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/employees", employeeRoutes);

// app.get("/", (req, res) => {
//   res.json({
//     message: "🚀 QueryMind Backend Running!"
//   });
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});