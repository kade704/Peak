import { useThemeStore } from "@/stores/theme";
import { FaRegMoon, FaRegSun } from "react-icons/fa";

const ThemeChanger = () => {
    const theme = useThemeStore((state) => state.theme);
    const setTheme = useThemeStore((state) => state.actions.setTheme);

    return (
        <button
            onClick={() => {
                setTheme(theme === "light" ? "dark" : "light");
            }}
            className="h-full btn btn-sm btn-ghost rounded-full"
        >
            {theme === "light" ? (
                <div className="flex items-center gap-2">
                    <FaRegMoon size={16} />
                    <h4>다크모드</h4>{" "}
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <FaRegSun size={16} />
                    <h4>라이트모드</h4>
                </div>
            )}
        </button>
    );
};

export default ThemeChanger;
