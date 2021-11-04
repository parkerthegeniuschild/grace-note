import { Router } from "express";
import HomeController from "../../controllers/home.controller";
import { ROUTES } from "../../constants";

const router = Router();

router.get(ROUTES.HOME, HomeController.index);

export default router;
