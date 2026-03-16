"use server";

import { eq } from "drizzle-orm";
import db from "@/db";
import { users } from "@/db/schemas/user";
import { createSession } from "@/lib/funcs/auth/cookies";
import {
	hashPassword,
	isPasswordHashed,
	verifyPassword,
} from "../../lib/funcs/auth/password";

export default async function signin(prevState: any, payload: FormData) {
	const username = payload.get("username");
	const password = payload.get("password");

	const errors: Record<string, string> = {};

	if (typeof username !== "string" || username.trim().length < 3) {
		errors.username = "Username must be at least 3 characters long";
	}
	if (typeof password !== "string" || password.length < 6) {
		errors.password = "Password must be at least 6 characters long";
	}

	if (Object.keys(errors).length > 0) {
		return { success: false, errors };
	}

	const normalizedUsername = (username as string).trim().toLowerCase();
	const user = await db.query.users.findFirst({
		where: (users, { eq }) => eq(users.username, normalizedUsername),
	});

	if (!user || !(await verifyPassword(user.password, password as string))) {
		return {
			success: false,
			errors: {
				auth: "Invalid username or password",
			},
		};
	}

	if (!isPasswordHashed(user.password)) {
		await db
			.update(users)
			.set({
				password: await hashPassword(password as string),
			})
			.where(eq(users.id, user.id));
	}

	const session = await createSession({
		id: user.id,
		username: user.username,
	});

	return {
		success: true,
		data: {
			id: user.id,
			username: user.username,
			sessionToken: session.token,
			expiresAt: session.expiresAt,
		},
		message: "Signed in successfully",
	};
}
