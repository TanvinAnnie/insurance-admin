"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiGrid,
  FiImage,
  FiFolder,
  FiBox,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: FiGrid,
  },
  {
    title: "Hero",
    href: "/dashboard/hero",
    icon: FiImage,
  },
  {
    title: "Category",
    href: "/dashboard/category",
    icon: FiFolder,
  },
  {
    title: "Product",
    href: "/dashboard/product",
    icon: FiBox,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: FiSettings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col bg-slate-900 text-white shadow-lg">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-slate-800">
        <h1 className="text-2xl font-bold tracking-wide">
          Insurance Admin
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800 p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-slate-300 transition hover:bg-red-600 hover:text-white">
          <FiLogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}