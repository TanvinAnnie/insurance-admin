import Link from "next/link";
import CategoryForm from "@/components/category/CategoryForm";

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Create Category
          </h1>

          <p className="mt-1 text-gray-500">
            Add a new insurance category.
          </p>
        </div>

        <Link
          href="/dashboard/category"
          className="rounded-lg border border-gray-300 px-5 py-2.5 hover:bg-gray-100"
        >
          ← Back
        </Link>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-md">
        <CategoryForm />
      </div>
    </div>
  );
}