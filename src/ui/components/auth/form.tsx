"use client";

import checkUsername from "@/lib/funcs/auth/check-username";
import { ChangeEvent, useActionState, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import z from "zod";

function getUsernameError(username: string) {
    const normalizedUsername = username.trim().toLowerCase();

    if (!normalizedUsername) {
        return "Username is required";
    }

    if (normalizedUsername.length < 3) {
        return "Username min 3 characters";
    }

    return null;
}

function getPasswordError(password: string) {
    if (!password) {
        return "Password is required";
    }

    if (password.length < 6) {
        return "Password min 6 characters";
    }

    return null;
}

function getConfirmPasswordError(password: string, confirmPassword: string) {
    if (!confirmPassword) {
        return "Confirm Password is required";
    }

    if (confirmPassword !== password) {
        return "Passwords do not match";
    }

    return null;
}

function getEmailError(email: string) {
    if (!email) {
        return undefined;
    }

    return z.email().safeParse(email).success ? null : "Invalid email format";
}

export default function AuthForm({
    act,
    login = false,
}: {
    act: (prevState: any, payload: FormData) => Promise<any>;
    login?: boolean;
}) {
    const [state, action, pending] = useActionState(act, null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
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
    const [usernamePending, setUsernamePending] = useState(false);
    const latestUsername = useRef("");

    const [handleUsernameChange] = useDebounce(async (value: string) => {
        const normalizedValue = value.trim().toLowerCase();
        const usernameError = getUsernameError(normalizedValue);

        if (login || usernameError) {
            setUsernamePending(false);
            setUsernameState(usernameError);
            return;
        }

        latestUsername.current = normalizedValue;
        setUsernamePending(true);

        const result = await checkUsername(normalizedValue);

        if (latestUsername.current === normalizedValue) {
            setUsernameState(result.error);
            setUsernamePending(false);
        }
    }, 300);

    const [handlePasswordChange] = useDebounce(
        (value: string, confirmPasswordValue?: string) => {
            setPasswordState(getPasswordError(value));

            if (!login && typeof confirmPasswordValue === "string") {
                setConfirmPasswordState(
                    getConfirmPasswordError(value, confirmPasswordValue),
                );
            }
        },
        300,
    );

    const [handleConfirmPasswordChange] = useDebounce(
        (passwordValue: string, confirmPasswordValue: string) => {
            setConfirmPasswordState(
                getConfirmPasswordError(passwordValue, confirmPasswordValue),
            );
        },
        300,
    );

    const [handleEmailChange] = useDebounce((value: string) => {
        setEmailState(getEmailError(value));
    }, 300);

    const isUsernameSatisfied = usernameState === null && !usernamePending;
    const isPasswordSatisfied = passwordState === null;
    const isEmailSatisfied = login || emailState !== "Invalid email format";
    const isConfirmPasswordSatisfied = login || confirmPasswordState === null;
    const canSubmit =
        isUsernameSatisfied &&
        isPasswordSatisfied &&
        isEmailSatisfied &&
        isConfirmPasswordSatisfied;

    return (
        <form action={action} className="flex flex-col gap-2">
            <input
                name="username"
                type="text"
                placeholder="Username*"
                onChange={(e) => {
                    const value = e.currentTarget.value;
                    setUsername(value);
                    if (!value.trim()) {
                        setUsernamePending(false);
                        setUsernameState(getUsernameError(value));
                        return;
                    }

                    if (login) {
                        setUsernamePending(false);
                        setUsernameState(getUsernameError(value));
                        return;
                    }

                    setUsernameState(undefined);
                    handleUsernameChange(value);
                }}
                required
                className={
                    usernameState === null
                        ? "border-green-200"
                        : usernameState && "border-red-300"
                }
                disabled={pending}
            />
            {usernameState && (
                <p className="text-xs text-red-500">{usernameState}</p>
            )}
            {!login && (
                <>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email (Optional)"
                        onChange={(e) => {
                            const value = e.currentTarget.value.toLowerCase();
                            setEmail(value);
                            handleEmailChange(value);
                        }}
                        className={
                            emailState === null
                                ? "border-green-200"
                                : emailState && "border-red-300"
                        }
                        disabled={pending}
                    />
                    {emailState && (
                        <p className="text-xs text-red-500">{emailState}</p>
                    )}
                </>
            )}
            <input
                name="password"
                type="password"
                placeholder="Password*"
                onChange={(e) => {
                    const value = e.currentTarget.value;
                    setPassword(value);
                    handlePasswordChange(value, confirmPassword);
                }}
                className={
                    passwordState === null
                        ? "border-green-200"
                        : passwordState && "border-red-300"
                }
                disabled={pending}
                required
            />
            {passwordState && (
                <p className="text-xs text-red-500">{passwordState}</p>
            )}
            {!login && (
                <>
                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password*"
                        onChange={(e) => {
                            const value = e.currentTarget.value;
                            setConfirmPassword(value);
                            handleConfirmPasswordChange(password, value);
                        }}
                        className={
                            confirmPasswordState === null
                                ? "border-green-200"
                                : confirmPasswordState && "border-red-300"
                        }
                        disabled={pending}
                        required
                    />
                    {confirmPasswordState && (
                        <p className="text-xs text-red-500">
                            {confirmPasswordState}
                        </p>
                    )}
                </>
            )}
            <button
                type="submit"
                disabled={pending || !canSubmit}
                className="display"
            >
                {login
                    ? pending
                        ? "Logging In..."
                        : "Log In"
                    : pending
                      ? "Signing Up..."
                      : "Sign Up"}
            </button>
            <p>* required</p>
            {!!state &&
                (!state.success ? (
                    <p className="text-xs text-red-500">
                        {Object.values(state.errors).join("\n")}
                    </p>
                ) : (
                    <p className="text-xs text-green-500">success!</p>
                ))}
        </form>
    );
}
