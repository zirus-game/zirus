"use client";

import checkUsername from "@/lib/funcs";
import { ChangeEvent, useActionState, useState } from "react";
import { useDebounce } from "use-debounce";
import z from "zod";

export default function AuthForm({
	act,
	login = false,
}: {
	act: (prevState: any, payload: FormData) => Promise<any>;
	login?: boolean;
}) {
	const [state, action, pending] = useActionState(act, null);
	const [usernameState, setUsernameState] = useState<
		string | null | undefined
	>(undefined);
	const [passwordState, setPasswordState] = useState<
		string | null | undefined
	>(undefined);
	const [confirmPasswordState, setConfirmPasswordState] = useState<
		string | null | undefined
	>(undefined);
	const [emailState, setEmailState] = useState<string | null | undefined>(
		undefined,
	);

	const [handleUsernameChange] = useDebounce(
		async (e: { currentTarget: { value: string } }) => {
			const value = e.currentTarget.value.toLowerCase();
			if (value) {
				const result = await checkUsername(value);
				setUsernameState(result.error);
			} else {
				setUsernameState("Username is required");
			}
		},
		300,
	);

	const [handlePasswordChange] = useDebounce(
		(e: { currentTarget: { value: string } }) => {
			const value = e.currentTarget.value.toLowerCase();

			if (value) {
				setPasswordState(
					value.length < 6 ? "Password min 6 characters" : null,
				);
			} else {
				setPasswordState("Password is required");
			}
		},
		300,
	);

	const [handleConfirmPasswordChange] = useDebounce(
		(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
			const value = e.currentTarget.value.toLowerCase();
			const passwordValue = (
				e.currentTarget.form as HTMLFormElement
			).password.value.toLowerCase();

			if (value) {
				setConfirmPasswordState(
					value !== passwordValue ? "Passwords do not match" : null,
				);
			} else {
				setConfirmPasswordState("Confirm Password is required");
			}
		},
		300,
	);

	const [handleEmailChange] = useDebounce(
		(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
			const value = e.currentTarget.value.toLowerCase();
			if (value) {
				setEmailState(
					z.email().safeParse(value).success
						? null
						: "Invalid email format",
				);
			} else {
				setEmailState(undefined);
			}
		},
		300,
	);

	return (
		<form action={action} className="flex flex-col gap-2">
			<input
				name="username"
				type="text"
				placeholder="Username*"
				onChange={!login ? handleUsernameChange : undefined}
				required
				className={
					usernameState === null
						? "border-green-200"
						: usernameState && "border-red-300"
				}
				disabled={pending}
			/>
			{usernameState && (
				<p className="text-red-500 text-xs">{usernameState}</p>
			)}
			{!login && (
				<>
					<input
						name="email"
						type="email"
						placeholder="Email (Optional)"
						onChange={handleEmailChange}
						className={
							emailState === null
								? "border-green-200"
								: emailState && "border-red-300"
						}
						disabled={pending}
					/>
					{emailState && (
						<p className="text-red-500 text-xs">{emailState}</p>
					)}
				</>
			)}
			<input
				name="password"
				type="password"
				placeholder="Password*"
				onChange={!login ? handlePasswordChange : undefined}
				className={
					passwordState === null
						? "border-green-200"
						: passwordState && "border-red-300"
				}
				disabled={pending}
				required
			/>
			{passwordState && (
				<p className="text-red-500 text-xs">{passwordState}</p>
			)}
			{!login && (
				<>
					<input
						name="confirmPassword"
						type="password"
						placeholder="Confirm Password*"
						onChange={handleConfirmPasswordChange}
						className={
							confirmPasswordState === null
								? "border-green-200"
								: confirmPasswordState && "border-red-300"
						}
						disabled={pending}
						required
					/>
					{confirmPasswordState && (
						<p className="text-red-500 text-xs">
							{confirmPasswordState}
						</p>
					)}
				</>
			)}
			<button type="submit" disabled={pending} className="display">
				{login ? "Log In" : "Sign Up"}
			</button>
			<p>* required</p>
			{!!state &&
				(!state.success ? (
					<p className="text-red-500 text-xs">
						{Object.values(state.errors).join("\n")}
					</p>
				) : (
					<p className="text-green-500 text-xs">success!</p>
				))}
		</form>
	);
}
