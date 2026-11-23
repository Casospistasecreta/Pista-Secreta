import { Router, type IRouter } from "express";
import analyticsRouter from "./analytics";
import healthRouter from "./health";
import personalizedRouter from "./personalized";
import storageRouter from "./storage";

const router: IRouter = Router();

router.use(analyticsRouter);
router.use(healthRouter);
router.use(storageRouter);
router.use(personalizedRouter);

export default router;
