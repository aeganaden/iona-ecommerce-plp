import type { ReactNode } from "react";

interface CatalogLayoutProps {
    children: ReactNode;
    sidebar: ReactNode;
}

export default function CatalogLayout({ children, sidebar }: CatalogLayoutProps) {
    return (
        <div className="flex w-full flex-1 flex-col gap-8 pb-10 lg:flex-row">
            <div className="w-full lg:w-60">{sidebar}</div>
            <main className="flex-1 space-y-8">{children}</main>
        </div>
    );
}
