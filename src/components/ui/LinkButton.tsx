import { Button, ButtonProps } from "@/components/ui/button";
import { FC, ReactNode, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/utils";

interface NavButtonProps {
    path: string;
    variant?: ButtonProps["variant"];
    children?: ReactNode;
    onClick?: () => void;
    className?: string;
    restProps?: Omit<ButtonProps, "variant" | "onClick" | "className">;
}

export const LinkButton: FC<NavButtonProps> = ({ path, variant = "link", children, className, onClick, ...restProps }) => {
    const navigate = useNavigate();

    const handleNavigation = useCallback(() => {
        onClick?.();

        navigate(path);
    }, [navigate, onClick, path]);

    return (
        <Button
            variant={variant}
            onClick={handleNavigation}
            className={cn("min-h-10 text-text-base", className)}
            {...restProps}
        >
            {children}
        </Button>
    );
};
