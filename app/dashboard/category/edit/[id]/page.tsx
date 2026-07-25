import Link from "next/link";
import CategoryForm from "@/components/category/CategoryForm";

interface EditCategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div className="text-black flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Edit Category
          </h1>

          <p className="mt-1 text-gray-500">
            Update category information.
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
        <CategoryForm
          isEdit={true}
          categoryId={id}
        />
      </div>
    </div>
  );
}