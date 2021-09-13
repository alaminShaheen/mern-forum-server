import { Document } from "mongoose";

export interface IUser extends Document {
    Email: string;
    Password: string;
    FirstName: string;
    LastName: string;
    CreatedAt: Date;
}