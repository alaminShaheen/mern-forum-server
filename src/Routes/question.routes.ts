import express from "express";
import questionController from "../Controllers/question.controller";
import AuthMiddleware from "../Middlewares/auth.middleware";

const router = express.Router();

router.use(AuthMiddleware.authenticateToken);

router
.get("/", questionController.getQuestions)
.get("/:questionId", questionController.getQuestion)
.post("/create", questionController.create)
.put("/update/:questionId", questionController.updateQuestion)
.delete("/delete/:questionId", questionController.deleteQuestion);

export { router as questionRouter };
