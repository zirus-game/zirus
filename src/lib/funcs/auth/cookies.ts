import "server-only";

import { and, eq, gt } from "drizzle-orm";
import db from "@/db";
import { sessions } from "@/db/schemas";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, SESSION_TTL_MS } from "@/lib/constants";

export type SessionPayload = {
    token: string;
    userId: number;
    expiresAt: string;
};

export async function createSession(user: { id: number; username: string }) {
    const expires = new Date(Date.now() + SESSION_TTL_MS);
    const [session] = await db
        .insert(sessions)
        .values({
            userId: user.id,
            expires,
        })
        .returning({
            token: sessions.token,
            userId: sessions.userId,
            expires: sessions.expires,
        });

    const payload: SessionPayload = {
        token: session.token,
        userId: session.userId,
        expiresAt: session.expires.toISOString(),
    };

    await setAuthCookie(payload, expires);

    return payload;
}

export async function ensureSession(user: { id: number; username: string }) {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (sessionToken) {
        const existingSession = await db.query.sessions.findFirst({
            where: (table, { and, eq, gt }) =>
                and(
                    eq(table.token, sessionToken),
                    eq(table.userId, user.id),
                    gt(table.expires, new Date()),
                ),
        });

        if (existingSession) {
            const payload: SessionPayload = {
                token: existingSession.token,
                userId: existingSession.userId,
                expiresAt: existingSession.expires.toISOString(),
            };

            await setAuthCookie(payload, existingSession.expires);

            return payload;
        }
    }

    return createSession(user);
}

export async function setAuthCookie(
    session: SessionPayload,
    expiration?: Date,
) {
    const expires = new Date(
        expiration?.getTime() ?? Date.now() + SESSION_TTL_MS,
    );

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, session.token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        expires,
    });
}

export async function destroySession() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (sessionToken) {
        await db.delete(sessions).where(eq(sessions.token, sessionToken));
    }

    cookieStore.delete(SESSION_COOKIE_NAME);
}
