"use client";

import { useActionState } from "react";

export default function AuthForm({
	act,
	login = false,
}: {
	act: (prevState: any, payload: FormData) => Promise<any>;
	login?: boolean;
}) {
	const [state, action, pending] = useActionState(act, null);

	return (
		<form action={action} className="flex flex-col gap-2">
			<input type="username" placeholder="Enter your username" />
			{!login && (
				<input type="email" placeholder="Enter your email (Optional)" />
			)}
			<input type="password" placeholder="Enter your password" />
			{!login && (
				<input type="password" placeholder="Confirm your password" />
			)}
			<button type="submit" disabled={pending}>
				{login ? "Log In" : "Sign Up"}
			</button>
			{!!state && <p>{state.message}</p>}
		</form>
	);
}
