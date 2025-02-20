"use client";

import { useThemeStore } from "@/stores/theme";
import { useLayoutEffect } from "react";

const ThemeSubscriber = () => {
    const initTheme = useThemeStore((state) => state.actions.initTheme);

    useLayoutEffect(() => {
        initTheme();
    }, []);

    return null;
};

export default ThemeSubscriber;
