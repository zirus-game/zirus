import { hasTokenOrUnauthorized } from "@/lib/funcs/auth/session";

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await hasTokenOrUnauthorized();
    return children;
}
