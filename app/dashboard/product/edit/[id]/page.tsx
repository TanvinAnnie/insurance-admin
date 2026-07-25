import Link from "next/link";
import ProductForm from "@/components/product/ProductForm";

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Edit Product
          </h1>

          <p className="mt-1 text-gray-500">
            Update product information.
          </p>
        </div>

        <Link
          href="/dashboard/product"
          className="rounded-lg border border-gray-300 px-5 py-2.5 hover:bg-gray-100"
        >
          ← Back
        </Link>
      </div>

      <div className="rounded-xl bg-white p-6 shadow">
        <ProductForm
          isEdit={true}
          productId={id}
        />
      </div>
    </div>
  );
}