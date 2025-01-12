"use client";

import { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

interface Props {
    children: ReactNode;
}

const ShadCNDarkThemeProvider = ({ children }: Props) => {
    return (
        <div>
            <NextThemesProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </NextThemesProvider>
        </div>
    );
};

export default ShadCNDarkThemeProvider;
