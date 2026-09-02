import express from "express";

import { generateAndExecuteSQL } from "../controllers/aiQuery.controller.js";

const router = express.Router();

router.post("/", generateAndExecuteSQL);

export default router;