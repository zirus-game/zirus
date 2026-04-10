import signin from "@/actions/auth/signin";
import AuthForm from "@/ui/components/auth/form";

export default function LoginPage() {
    return (
        <main className="mt-20 items-center justify-center self-center justify-self-center text-center">
            <h1>Login</h1>
            <AuthForm act={signin} login />
        </main>
    );
}
