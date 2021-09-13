import { Document } from "mongoose";

export interface IAnswer extends Document {
	Description: string;
	CreatedBy: string;
	CreatedAt: Date;
}
