"use client";

import UserMenu from "./UserMenu";
import { FiBell, FiSearch } from "react-icons/fi";

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="w-72 rounded-lg border border-gray-300 py-2 pl-10 pr-4 outline-none focus:border-blue-500"
          />
        </div>

        {/* Notification */}
        <button className="relative rounded-lg p-2 hover:bg-gray-100 transition">
          <FiBell size={22} className="text-gray-700" />

          <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </button>

        {/* User */}
        <UserMenu />
      </div>
    </header>
  );
}