import express from "express";
import AuthController from "../Controllers/auth.controller";
import AuthMiddleware from "../Middlewares/auth.middleware";

const router = express.Router();

router.use(AuthMiddleware.authenticateToken);

router
.get("/test", AuthController.test)
.delete("/logout", AuthController.logout)

export { router as protectedRouter };
