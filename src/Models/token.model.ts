import mongoose, { Schema } from "mongoose";
import { IQuestion } from "../Interfaces/question.interface";
import { IToken } from "../Interfaces/token.interface";

const TokenSchema: Schema = new Schema({
	Value: { type: String, required: true },
	CreatedAt: { type: Date, default: Date.now }
});

const Token = mongoose.model<IToken>("Token", TokenSchema);

export default Token;
