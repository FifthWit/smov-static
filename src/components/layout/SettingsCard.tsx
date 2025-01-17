import { cn } from "@/lib/utils";

export function SettingsCard(props: {
    children: React.ReactNode;
    className?: string;
    paddingClass?: string;
}) {
    return (
        <div
            className={cn(
                "w-full rounded-lg bg-secondary/10 border border-border",
                props.paddingClass ?? "px-8 py-6",
                props.className,
            )}
        >
            {props.children}
        </div>
    );
}

export function SolidSettingsCard(props: {
    children: React.ReactNode;
    className?: string;
    paddingClass?: string;
}) {
    return (
        <div
            className={cn(
                "w-full rounded-lg bg-secondary/10 border border-border",
                props.paddingClass ?? "px-8 py-6",
                props.className,
            )}
        >
            {props.children}
        </div>
    );
}
