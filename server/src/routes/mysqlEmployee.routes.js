import express from "express";
import {
  getMySQLEmployees,
  createMySQLEmployee,
  updateMySQLEmployee,
  deleteMySQLEmployee,
} from "../controllers/mysqlEmployee.controller.js";

const router = express.Router();

router.get("/", getMySQLEmployees);
router.post("/", createMySQLEmployee);
router.put("/:id", updateMySQLEmployee);
router.delete("/:id", deleteMySQLEmployee);

export default router;