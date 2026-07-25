"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  isActive: boolean;
}

export default function CategoryTable() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/category", {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success) {
        setCategories(data.data);
      } else {
        alert(data.message || "Failed to fetch categories.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/category/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        alert("Category deleted successfully.");
        fetchCategories();
      } else {
        alert(data.message || "Failed to delete category.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };


  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500">Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left">Image</th>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Slug</th>
            <th className="px-6 py-3 text-left">Description</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-8 text-center">
                No categories found.
              </td>
            </tr>
          ) : (
            categories.map((category) => (
              <tr key={category._id}>
                <td className="px-6 py-4">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                </td>

                <td className="px-6 py-4">{category.name}</td>

                <td className="px-6 py-4">
                  {category.slug}
                </td>

                <td className="px-6 py-4">
                  {category.description}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      category.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {category.isActive
                      ? "Active"
                      : "Inactive"}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/category/edit/${category._id}`}
                      className="rounded bg-blue-600 px-4 py-2 text-white"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(category._id)
                      }
                      className="rounded bg-red-600 px-4 py-2 text-white"
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