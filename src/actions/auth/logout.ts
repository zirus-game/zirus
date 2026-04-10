"use server";

import { redirect } from "next/navigation";
import { destroySession } from "@/lib/funcs/auth/cookies";

export default async function logout() {
    await destroySession();
    redirect("/auth");
}
