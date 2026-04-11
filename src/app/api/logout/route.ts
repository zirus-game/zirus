import db from "@/db";
import { deleteSession } from "@/lib/funcs/auth/session";
import { redirect } from "next/navigation";

export async function GET() {
    await deleteSession();
    redirect("/");
}
