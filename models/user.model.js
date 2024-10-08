import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
	{
		userName: {
			type: String,
			required: true,
			lowerCase: true,
			unique: true,
			index: true,
			trim: true,
		},
		userEmail: {
			type: String,
			required: true,
			lowerCase: true,
			unique: true,
			trim: true,
		},
		fullName: {
			type: String,
			required: true,
			trim: true,
			index: true,
		},
		password: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
			required: true,
		},
		coverImage: {
			type: String,
		},
		watchHistory: [
			{
				type: Schema.Types.ObjectId,
				ref: "Video",
				required: true,
			},
		],
		refreshToken: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
	return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
	// console.log({
	// 	id: this._id,
	// 	name: this.userName,
	// 	fullName: this.fullName,
	// 	userEmail: this.userEmail,
	// });
	
	// console.log("expiry--",process.env.ACCESS_TOKEN_EXPIRY);
	
	return jwt.sign(
		{ 
			id: this._id,
			name: this.userName,
			fullName: this.fullName,
			userEmail: this.userEmail,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
	);
};
userSchema.methods.generateRefreshToken = function () {
	return jwt.sign(
		{
			id: this._id,
		},
		process.env.REFRESH_TOKEN_SECRET,
		{ expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
	);
};

export const User = mongoose.model("User", userSchema);
