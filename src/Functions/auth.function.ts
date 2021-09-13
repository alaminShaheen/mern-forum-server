import { IUser } from "../Interfaces/user.interface";
import jwt from "jsonwebtoken";
import config from "../Config/config";
import logging from "../Config/logging";

export const generateAccessToken = (user: IUser) => {
	logging.info(user);
	return jwt.sign(user.toJSON(), config.token.accessTokenSecret, { expiresIn: config.token.expireTime });
};

export const generateRefreshToken = (user: IUser) => {
	return jwt.sign(user.toJSON(), config.token.refreshTokenSecret);
};
