import "server-only";

import { cookies } from "next/headers";
import db from "@/db";

export async function hasValidToken() {
	const cookieStore = await cookies();
	const sessionToken = cookieStore.get("authSession")?.value;
	if (!sessionToken) {
		return false;
	}
	const session = await db.query.sessions.findFirst({
		where: (sessions, { eq }) => eq(sessions.token, sessionToken),
	});
	if (!session) {
		return false;
	}
	return session.expires > new Date();
}
