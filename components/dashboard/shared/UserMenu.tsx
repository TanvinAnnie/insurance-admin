"use client";

import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiLogOut, FiSettings, FiUser } from "react-icons/fi";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* User Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2 transition hover:bg-gray-100"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-lg font-semibold text-white">
          A
        </div>

        <div className="hidden text-left md:block">
          <h3 className="text-sm font-semibold text-gray-800">
            Admin
          </h3>
          <p className="text-xs text-gray-500">
            Administrator
          </p>
        </div>

        <FiChevronDown
          className={`transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
          <button className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-gray-100">
            <FiUser />
            Profile
          </button>

          <button className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-gray-100">
            <FiSettings />
            Settings
          </button>

          <div className="border-t" />

          <button className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 transition hover:bg-red-50">
            <FiLogOut />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}