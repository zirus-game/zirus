export type GameActionState = {
    success: boolean;
    errors: Record<string, string>;
};

export const initialGameActionState: GameActionState = {
    success: false,
    errors: {},
};
