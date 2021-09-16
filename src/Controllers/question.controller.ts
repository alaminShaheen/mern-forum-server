import { NextFunction, Request, Response } from "express";
import logging from "../Config/logging";
import { IQuestion } from "../Interfaces/question.interface";
import Question from "../Models/question.model";

const create = async (req: Request, res: Response, next: NextFunction) => {
    logging.info("Attempting to create new question");
    const { Title, Description, CreatedBy, CreatedAt }: IQuestion = req.body;

    if (!Title || !CreatedBy || !Description || typeof Description !== "string" || typeof Title !== "string" || typeof CreatedBy !== "string") {
        return res.status(400).json({ message: "Invalid request" });
    }

    try {
        const question = await Question.create({ Title, Description, CreatedBy, Answers: [] });
        logging.info(`New Question ${question._id} created`);
        return res.status(201).json(question);
    } catch (error) {
        logging.error(error);
        return res.status(500).json({ error });
    }
};

const getQuestions = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(`Incoming get request for all questions`);
    try {
        const questions = await Question.find().exec();
        return res.status(200).json({ questions, count: questions.length });
    } catch (error) {
        logging.error(error);
        return res.status(500).json({ error });
    }
};

const getQuestion = async (req: Request, res: Response, next: NextFunction) => {
	const questionId = req.params.questionId;
	logging.info(`Incoming get request for questions ${questionId}`);
	try {
		const question = await Question.findById(questionId);
		return res.status(200).json({ question });
	} catch (error) {
		logging.error(error);
		return res.status(500).json({ error });
	}
};

const questionController = {
	create,
	getQuestions,
	getQuestion
};

export default questionController;
