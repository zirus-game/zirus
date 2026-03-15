"use server";

import db from "@/db";

export default async function checkUsername(username: string) {
	const normalizedUsername = username.trim().toLowerCase();

	if (normalizedUsername.length < 3) {
		return {
			available: false,
			error: "Username min 3 characters",
		};
	}

	const existingUser = await db.query.users.findFirst({
		where: (users, { eq }) => eq(users.username, normalizedUsername),
	});

	return {
		available: !existingUser,
		error: existingUser ? "This username is already taken" : null,
	};
}
