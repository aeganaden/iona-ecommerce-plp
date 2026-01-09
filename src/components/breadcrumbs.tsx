"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const pages: Record<string, { title: string; description: string }> = {
    "/": {
        title: "All Products",
        description: "Shop the latest premium fashion and everyday accessories curated for women.",
    },
    "/dresses": {
        title: "Dresses",
        description: "Discover day-to-night silhouettes, statement prints, and timeless evening gowns.",
    },
    "/shoes": {
        title: "Shoes",
        description: "Stride confidently with artisan-made heels, flats, and boots built for comfort.",
    },
    "/watches": {
        title: "Watches",
        description: "Elevate every look with precision timepieces crafted from modern materials.",
    },
    "/jewelry": {
        title: "Jewelry",
        description: "Layer luminous metals, gemstones, and signature pieces for everyday luxury.",
    },
};

function buildBreadcrumbs(pathname: string) {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) {
        return [
            { href: "/", label: "Home" },
            { href: "/", label: "All Products" },
        ];
    }

    return [
        { href: "/", label: "Home" },
        ...segments.map((segment, index) => {
            const href = `/${segments.slice(0, index + 1).join("/")}`;
            return { href, label: segment };
        }),
    ];
}

function Breadcrumbs() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);
    const crumbs = buildBreadcrumbs(pathname);

    const title = segments.length ? segments[segments.length - 1] : "All Products";
    const description = "Explore curated fashion, jewelry, and accessories from independent designers.";
    const pageContent = pages[pathname] ?? {
        title,
        description,
    };

    return (
        <section className="space-y-3">
            <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-red-500">
                    {crumbs.map((crumb, index) => {
                        const isLast = index === crumbs.length - 1;
                        return (
                            <li key={`${crumb.href}-${index}`} className="flex items-center gap-2">
                                {isLast ? (
                                    <span className="text-amber-800">{crumb.label}</span>
                                ) : (
                                    <Link href={crumb.href} className="text-red-500 transition hover:text-amber-900">
                                        {crumb.label}
                                    </Link>
                                )}
                                {!isLast && <span aria-hidden="true" className="text-red-500">/</span>}
                            </li>
                        );
                    })}
                </ol>
            </nav>

            <div className="space-y-2">
                <h1 className="text-3xl font-serif font-semibold text-amber-950">{pageContent.title}</h1>
                <p className="text-sm text-amber-700">{pageContent.description}</p>
            </div>
        </section>
    );
}

export default Breadcrumbs;