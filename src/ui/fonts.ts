import { DM_Sans, Inter, Orbitron } from "next/font/google";

export const orbitron = Orbitron({
    subsets: ["latin"],
    weight: "variable",
    variable: "--font-display",
});

export const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: "variable",
    variable: "--font-body",
});

export const inter = Inter({
    subsets: ["latin"],
    weight: "variable",
    variable: "--font-fallback",
});

const fonts = {
    display: orbitron,
    text: dmSans,
    fallback: inter,
};

export default fonts;
