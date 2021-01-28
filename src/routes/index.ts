import { Request, Response, Router } from "express";
import { myData } from "../controller/myData";

const router = Router();

/* GET home page. */
router.get("/", myData);

/* Post validation data */
router.post("/validate-rule", (_req:Request, res: Response)=>{
    res.status(200).json({data:"hello rule validation"})
});

export default router;
