import { Router, Request, Response } from "express";

const router = Router();

/* GET home page. */
router.get("/", (_req: Request, res: Response) => {
    res.status(200).json({ data: "hello world" });
});

/* Post validation data */
router.post("/validate-rule", (_req: Request, res: Response) => {
    res.status(200).json({ data: "hello rule validator" })
});

export default router;
