import express from "express";

import { executeQuery } from "../controllers/query.controller.js";

const router = express.Router();

router.post("/", executeQuery);

export default router;