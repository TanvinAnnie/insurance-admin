import Link from "next/link";
import ProductTable from "@/components/product/ProductTable";

export default function ProductPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Product Management
          </h1>

          <p className="mt-1 text-gray-500">
            Manage all insurance products.
          </p>
        </div>

        <Link
          href="/dashboard/product/new"
          className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
        >
          + Add Product
        </Link>
      </div>

      <div className="rounded-xl bg-white p-6 shadow">
        <ProductTable />
      </div>
    </div>
  );
}