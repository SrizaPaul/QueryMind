import { Router } from "express";

import {
  getEmployees,
  createEmployee,
} from "../controllers/employee.controller.js";

const router = Router();

router.get("/", getEmployees);

router.post("/", createEmployee);

export default router;