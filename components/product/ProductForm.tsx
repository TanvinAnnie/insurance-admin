"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface Category {
  _id: string;
  name: string;
}

interface ProductFormProps {
  isEdit?: boolean;
  productId?: string;
}

export default function ProductForm({
  isEdit = false,
  productId,
}: ProductFormProps) {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    image: "",
    price: "",
    discountPrice: "",
    stock: "",
    featured: false,
    isActive: true,
  });

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();

    if (isEdit && productId) {
      fetchProduct();
    }
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/category");
      const data = await res.json();

      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/product/${productId}`);
      const data = await res.json();

      if (data.success) {
        const product = data.data;

        setFormData({
          name: product.name,
          description: product.description,
          category: product.category._id,
          image: product.image,
          price: product.price.toString(),
          discountPrice: product.discountPrice.toString(),
          stock: product.stock.toString(),
          featured: product.featured,
          isActive: product.isActive,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const uploadImage = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const form = new FormData();
      form.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          image: data.url,
        }));
      } else {
        alert("Image upload failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;

      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        isEdit ? `/api/product/${productId}` : "/api/product",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            price: Number(formData.price),
            discountPrice: Number(formData.discountPrice),
            stock: Number(formData.stock),
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert(
          isEdit
            ? "Product updated successfully."
            : "Product created successfully."
        );

        router.push("/dashboard/product");
        router.refresh();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl bg-white p-6 shadow"
    >
      <div>
        <label className="mb-2 block font-medium">
          Product Name
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Category
        </label>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full rounded-lg border p-3"
        >
          <option value="">
            Select Category
          </option>

          {categories.map((category) => (
            <option
              key={category._id}
              value={category._id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Description
        </label>

        <textarea
          rows={5}
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <label className="mb-2 block font-medium">
            Price
          </label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Discount Price
          </label>

          <input
            type="number"
            name="discountPrice"
            value={formData.discountPrice}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Stock
          </label>

          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            className="w-full rounded-lg border p-3"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Product Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={uploadImage}
          className="w-full"
        />

        {uploading && (
          <p className="mt-2 text-blue-600">
            Uploading image...
          </p>
        )}

        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            className="mt-4 h-32 w-32 rounded-lg border object-cover"
          />
        )}
      </div>

      <div className="flex gap-8">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />

          Featured Product
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />

          Active
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : isEdit
          ? "Update Product"
          : "Create Product"}
      </button>
    </form>
  );
}
