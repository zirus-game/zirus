import "server-only";

import { cookies } from "next/headers";
import db from "@/db";
import { SESSION_COOKIE_NAME } from "@/lib/constants";
import { unauthorized } from "next/navigation";
import { sessions } from "@/db/schemas";
import { eq } from "drizzle-orm";

export async function hasValidToken() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
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

export async function hasTokenOrUnauthorized() {
    const tokenValid = await hasValidToken();
    if (!tokenValid) unauthorized();
}

export async function getSessionToken() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    return sessionToken;
}

export async function deleteSession() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (sessionToken) {
        await db.delete(sessions).where(eq(sessions.token, sessionToken));
    }
    cookieStore.delete(SESSION_COOKIE_NAME);
}
