import Link from "next/link";
import CategoryTable from "@/components/category/CategoryTable";

export default function CategoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Category Management
          </h1>

          <p className="mt-1 text-gray-500">
            Manage all insurance categories.
          </p>
        </div>

        <Link
          href="/dashboard/category/new"
          className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
        >
          + Add Category
        </Link>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-md">
        <CategoryTable />
      </div>
    </div>
  );
}