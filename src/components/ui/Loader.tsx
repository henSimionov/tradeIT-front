import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils";

interface LoadingProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

const sizeMap = {
    sm: { icon: 'h-3 w-3', text: 'text-xs' },
    md: { icon: 'h-4 w-4', text: 'text-sm' },
    lg: { icon: 'h-6 w-6', text: 'text-base' },
    xl: { icon: 'h-8 w-8', text: 'text-lg' },
};

export const Loader = ({ size = 'md', className }: LoadingProps) => {
    const { t } = useTranslation('translation', { keyPrefix: 'ui' });
    const { icon, text } = sizeMap[size];

    return (
        <div className={cn("flex items-center gap-2 text-muted-foreground", className)}>
            <Loader2 className={cn('animate-spin', icon)} />
            <span className={text}>{t('loading')}</span>
        </div>
    );
};
