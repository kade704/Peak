import { create } from "zustand";

export type ThemeState = {
    theme: "light" | "dark";
    actions: {
        setTheme: (theme: "light" | "dark") => void;
        initTheme: () => void;
    };
};

export const useThemeStore = create<ThemeState>((set) => ({
    theme: "light",
    actions: {
        setTheme: (theme) => {
            localStorage.setItem("theme", theme);
            document.body.setAttribute("data-theme", theme);
            set({ theme });
        },
        initTheme() {
            const saved = localStorage.getItem("theme") as "light" | "dark";
            const theme = saved || "light";
            document.body.setAttribute("data-theme", theme);
            set({ theme });
        },
    },
}));
