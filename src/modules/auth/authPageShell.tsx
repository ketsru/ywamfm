// "@/components/layout/auth/authPageShell.tsx"

"use client";

import * as React from "react";

type AuthPageShellProps = {
    children: React.ReactNode;
    className?: string;
};

export function AuthPageShell({ children, className }: AuthPageShellProps) {
    return (
        <div className={`min-h-fit my-auto md:m-0 m-4 ${className ?? ""}`}>
            {children}
        </div>
    );
}