import { Request, Response } from "express";
import User from "../Models/user.model";
import bcrypt from "bcryptjs";
import logging from "../Config/logging";
import { generateAccessToken, generateRefreshToken } from "../Functions/auth.function";
import Token from "../Models/token.model";
import jwt from "jsonwebtoken";
import config from "../Config/config";

const register = async (req: Request, res: Response) => {
	const { Email, Password, LastName, FirstName } = req?.body;
	if (
		!Email ||
		!Password ||
		!LastName ||
		!FirstName ||
		typeof Email !== "string" ||
		typeof Password !== "string" ||
		typeof LastName !== "string" ||
		typeof FirstName !== "string"
	) {
		return res.status(400).json({ message: "Invalid request" });
	}
	const user = await User.findOne({ Email });
	if (user) return res.status(400).json({ message: "User with email already exists" });
	else {
		try {
			const hashedPassword = await bcrypt.hash(Password, 10);
			const newUser = await User.create({
				Email,
				Password: hashedPassword,
				LastName,
				FirstName
			});
			logging.info(`Created new user ${newUser._id} ...`);
			return res.status(201).json({
				Email: newUser.Email,
				Id: newUser._id,
				CreatedAt: newUser.CreatedAt,
				LastName: newUser.LastName,
				FirstName: newUser.FirstName
			});
		} catch (error) {
			const result = error as Error;
			logging.error(error);
			return res.status(500).json({ message: result.message });
		}
	}
};

const login = async (req: Request, res: Response) => {
	const { Email, Password } = req?.body;
	if (!Email || !Password || typeof Email !== "string" || typeof Password !== "string") {
		return res.status(400).json({ message: "Invalid request" });
	}
	const user = await User.findOne({ Email });
	if (user) {
		const isValidPassword = await bcrypt.compare(Password, user.Password);
		if (isValidPassword) {
			logging.info(`Logging in user ${user._id}`);
			const accessToken = generateAccessToken(user);
			const refreshToken = generateRefreshToken(user);
			const newRefreshToken = await Token.create({ Value: refreshToken });
			const fetchedUser = await User.findById(user._id, { Password: false });
			// await User.findById({ _id: user._id }, { projection: { Password: false } });
			return res.status(200).json({ AccessToken: accessToken, RefreshToken: newRefreshToken.Value, User: fetchedUser });
		} else {
			return res.status(403).json({ message: "Invalid email or password" });
		}
	} else return res.status(403).json({ message: "Invalid email or password" });
};

const refreshToken = async (req: Request, res: Response) => {
	const refreshToken = req.body.Token;
	if (!refreshToken) return res.status(401).json({ message: "User not authenticated" });
	else {
		console.log(refreshToken);
		const token = await Token.findOne({ Value: refreshToken });
		if (!token) return res.status(403).json({ message: "Invalid refresh token" });
	}
	jwt.verify(refreshToken, config.token.refreshTokenSecret, async (err: any, user: any) => {
		if (err) {
			console.log(err);
			logging.error(err);
			return res.status(403).json({ message: "Invalid refresh token" });
		} else {
			const fetchedUser = await User.findById(user._id, { Password: false });
			const newAccessToken = generateAccessToken(fetchedUser!);
			return res.json({ AccessToken: newAccessToken });
		}
	});
};

const logout = async (req: Request, res: Response) => {
	const refreshToken = req.body.Token;
	if (!refreshToken) return res.status(400).json({ message: "Invalid request" });
	try {
		logging.info(`Logging out...`);
		await Token.deleteOne({ Value: refreshToken });
		return res.sendStatus(204);
	} catch (error) {
		logging.error(error);
		return res.status(500).json(error);
	}
};

const test = async (req: Request, res: Response) => {
	logging.info(req.user);
	return res.sendStatus(200);
};

const AuthController = {
	register,
	login,
	refreshToken,
	logout,
	test
};

export default AuthController;
