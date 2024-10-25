import { Router } from "express";
import dictController from "../controllers/dictionaryController.js";

const router = Router();

router.get("/search", dictController.searchDictionary);
router.get("/popular", dictController.getPopularWords);

export default router;
