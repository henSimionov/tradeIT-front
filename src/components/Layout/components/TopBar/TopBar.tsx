import { ThemePicker } from "./components/ThemePicker";

export const TopBar = () => {
    return (
        <div className="flex items-center justify-end px-2 py-2 border-b border-subtle">
            <ThemePicker />
        </div>
    );
};

