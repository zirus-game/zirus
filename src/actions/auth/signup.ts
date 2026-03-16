"use server";

import db from "@/db";
import { users } from "@/db/schemas/user";
import { hashPassword } from "../../lib/funcs/auth/password";
import z from "zod";
import { redirect } from "next/navigation";

export default async function signup(prevState: any, payload: FormData) {
	const username = payload.get("username");
	const email = payload.get("email");
	const password = payload.get("password");
	const confirmPassword = payload.get("confirmPassword");

	const errors: Record<string, string> = {};
	const normalizedUsername =
		typeof username === "string" ? username.trim().toLowerCase() : "";

	if (typeof username !== "string" || username.length < 3) {
		errors.username = "Username must be at least 3 characters long";
	}
	if (email && !z.email().safeParse(email).success) {
		errors.email = "Invalid email address";
	}
	if (typeof password !== "string" || password.length < 6) {
		errors.password = "Password must be at least 6 characters long";
	}
	if (password !== confirmPassword) {
		errors.confirmPassword = "Passwords do not match";
	}

	if (!errors.username) {
		const existingUser = await db.query.users.findFirst({
			where: (table, { eq }) => eq(table.username, normalizedUsername),
		});

		if (existingUser) {
			errors.username = "This username is already taken";
		}
	}

	if (Object.keys(errors).length > 0) {
		return { success: false, errors };
	}

	const object: typeof users.$inferInsert = {
		username: normalizedUsername,
		email: (email as string) || undefined,
		password: await hashPassword(password as string),
	};

	await db.insert(users).values(object);

	redirect("/main");
}
