import mongoose, { Schema } from "mongoose";
import { IAnswer } from "../Interfaces/answer.interface";

const AnswerSchema: Schema = new Schema({
	Description: {
		type: String,
		required: true
	},
	CreatedBy: {
		type: String,
		required: true
	},
	CreatedAt: {
		type: Date,
		default: Date.now
	}
});

const Answer = mongoose.model<IAnswer>("Answer", AnswerSchema);

export default Answer;
