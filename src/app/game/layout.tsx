import { hasTokenOrUnauthorized } from "@/lib/funcs/auth/session";

export default async function GameLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await hasTokenOrUnauthorized();
    return <>{children}</>;
}
