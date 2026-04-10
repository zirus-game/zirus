import { compare, hash } from "bcryptjs";

const BCRYPT_ROUNDS = 12;

export async function hashPassword(password: string) {
    return hash(password, BCRYPT_ROUNDS);
}

export async function verifyPassword(
    storedPassword: string,
    providedPassword: string,
) {
    if (
        storedPassword.startsWith("$2a$") ||
        storedPassword.startsWith("$2b$") ||
        storedPassword.startsWith("$2y$")
    ) {
        return compare(providedPassword, storedPassword);
    }

    return storedPassword === providedPassword;
}

export function isPasswordHashed(password: string) {
    return (
        password.startsWith("$2a$") ||
        password.startsWith("$2b$") ||
        password.startsWith("$2y$")
    );
}
