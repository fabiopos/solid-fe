"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

const items = [
    {href: "/", title: "Home"},
    {href: "/about", title: "About"},
    {href: "/pricing", title: "Pricing"},
    {href: "/signup", title: "Sign up"},
    {href: "/login", title: "Log in"},
];

function PublicNavbarDropdown() {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className="px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-md">
                    Menu
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="z-50 min-w-[180px] rounded-md border bg-cyan-900 p-1 shadow-md"
                    sideOffset={8}
                    align="end"
                >
                    {items.map((item) => (
                        <DropdownMenu.Item
                            key={item.href}
                            asChild
                            className="group relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-cyan-800 focus:outline-none"
                        >
                            <Link href={item.href}>{item.title}</Link>
                        </DropdownMenu.Item>
                    ))}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}

export default PublicNavbarDropdown;