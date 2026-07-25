import Link from "next/link";
import HeroTable from "@/components/hero/HeroTable";

export default function HeroPage() {
  return (
    <div className="text-black space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Hero Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your website hero section.
          </p>
        </div>

        <Link
          href="/dashboard/hero/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
        >
          + Add Hero
        </Link>
      </div>
            <div className="bg-white rounded-xl shadow-md p-6">
        <HeroTable />
      </div>
    </div>
  );
}