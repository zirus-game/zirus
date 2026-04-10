import signup from "@/actions/auth/signup";
import AuthForm from "@/ui/components/auth/form";

export default function LoginPage() {
    return (
        <main className="mt-20 items-center justify-center self-center justify-self-center text-center">
            <h1>Sign Up</h1>
            <AuthForm act={signup} />
        </main>
    );
}
