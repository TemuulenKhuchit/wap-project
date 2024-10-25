import { Router } from "express";
import { searchDictionary, getPopularWords } from "../controllers/dictionaryController.js";

const router = Router();

router.get("/search", searchDictionary);
router.get("/popular", getPopularWords);

export default router;
