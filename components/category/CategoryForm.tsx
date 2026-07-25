"use client";

import {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
} from "react";
import { useRouter } from "next/navigation";

interface CategoryFormProps {
  isEdit?: boolean;
  categoryId?: string;
}

interface CategoryFormData {
  name: string;
  description: string;
  image: string;
  isActive: boolean;
}

export default function CategoryForm({
  isEdit = false,
  categoryId,
}: CategoryFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] =
    useState(false);
  const [previewImage, setPreviewImage] =
    useState("");

  const [formData, setFormData] =
    useState<CategoryFormData>({
      name: "",
      description: "",
      image: "",
      isActive: true,
    });

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      isActive: e.target.checked,
    }));
  };

  const handleImageUpload = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));
    setImageUploading(true);

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();

      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          image: data.imageUrl,
        }));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Image upload failed.");
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Please upload a category image.");
      return;
    }

    setLoading(true);

    try {
      const url = isEdit
        ? `/api/category/${categoryId}`
        : "/api/category";

      const method = isEdit
        ? "PATCH"
        : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert(
          isEdit
            ? "Category updated successfully!"
            : "Category created successfully!"
        );

        router.push("/dashboard/category");
        router.refresh();
      } else {
        alert(
          data.message ||
            "Something went wrong."
        );
      }
    } catch (error) {
      console.error(error);
      alert("Failed to save category.");
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
    if (!isEdit || !categoryId) return;

    const fetchCategory = async () => {
      try {
        const res = await fetch(`/api/category/${categoryId}`);
        const data = await res.json();

        if (data.success) {
          const category = data.data;

          setFormData({
            name: category.name || "",
            description: category.description || "",
            image: category.image || "",
            isActive: category.isActive ?? true,
          });

          setPreviewImage(category.image || "");
        } else {
          alert("Category not found.");
        }
      } catch (error) {
        console.error(error);
        alert("Failed to load category.");
      }
    };

    fetchCategory();
  }, [categoryId, isEdit]);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl bg-white p-6 shadow-md"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Category Name
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter category name"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="text-black mb-2 block text-sm font-medium">
          Description
        </label>

        <textarea
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter category description"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Category Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full rounded-lg border border-gray-300 p-2"
        />

        {imageUploading && (
          <p className="mt-2 text-blue-600">
            Uploading image...
          </p>
        )}

        {previewImage && (
          <img
            src={previewImage}
            alt="Category Preview"
            className="mt-4 h-52 w-full rounded-lg border object-cover"
          />
        )}
      </div>

      <div className="flex items-center gap-3">
        <input
          id="isActive"
          type="checkbox"
          checked={formData.isActive}
          onChange={handleStatusChange}
          className="h-4 w-4"
        />

        <label
          htmlFor="isActive"
          className="text-sm font-medium"
        >
          Active Category
        </label>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/dashboard/category")}
          className="rounded-lg border border-gray-300 px-6 py-3 font-medium hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading || imageUploading}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : isEdit
            ? "Update Category"
            : "Create Category"}
        </button>
      </div>
    </form>
  );
}