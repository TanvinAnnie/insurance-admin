"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  discountPrice: number;
  stock: number;
  featured: boolean;
  isActive: boolean;
  category: {
    _id: string;
    name: string;
  };
}

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/product", {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success) {
        setProducts(data.data);
      } else {
        alert(data.message || "Failed to fetch products.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/product/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        alert("Product deleted successfully.");
        fetchProducts();
      } else {
        alert(data.message || "Delete failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  if (loading) {
    return (
      <div className="py-10 text-center">
        Loading products...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Image</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-left">Discount</th>
            <th className="px-4 py-3 text-left">Stock</th>
            <th className="px-4 py-3 text-left">Featured</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td
                colSpan={9}
                className="py-8 text-center"
              >
                No products found.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr
                key={product._id}
                className="border-t"
              >
                <td className="px-4 py-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                </td>

                <td className="px-4 py-4">
                  {product.name}
                </td>

                <td className="px-4 py-4">
                  {product.category?.name}
                </td>

                <td className="px-4 py-4">
                  ${product.price}
                </td>

                <td className="px-4 py-4">
                  ${product.discountPrice}
                </td>

                <td className="px-4 py-4">
                  {product.stock}
                </td>

                <td className="px-4 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      product.featured
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {product.featured
                      ? "Featured"
                      : "No"}
                  </span>
                </td>

                <td className="px-4 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      product.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.isActive
                      ? "Active"
                      : "Inactive"}
                  </span>
                </td>

                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/product/edit/${product._id}`}
                      className="rounded bg-blue-600 px-3 py-2 text-white"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(product._id)
                      }
                      className="rounded bg-red-600 px-3 py-2 text-white"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}