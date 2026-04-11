"use server";

import { users, UserType } from "@/db/schemas";
import { getSessionToken } from "./session";
import db from "@/db";
import { eq } from "drizzle-orm";

export default async function getCurrentUser() {
    const session = await getSessionToken();
    if (!session) return null;

    const user = await db.query.sessions
        .findFirst({
            where: (sessions, { eq }) => eq(sessions.token, session),
            with: {
                user: true,
            },
        })
        .then((result) => result?.user || null);

    return user;
}

export async function getUserByUsername(username: string) {
    const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.username, username),
    });
    return user;
}

export async function getUserById(id: number) {
    const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, id),
    });
    return user;
}

export async function updateUserById(id: number, data: Partial<UserType>) {
    await db.update(users).set(data).where(eq(users.id, id));
}
