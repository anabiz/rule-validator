import { Router } from "express";
import { myData } from "../controller/myData";
import { validateRule } from "../controller/validateRule";
const router = Router();

/* GET home page. */
router.get("/", myData);

/* Post validation data */
router.post("/validate-rule", validateRule);

export default router;
