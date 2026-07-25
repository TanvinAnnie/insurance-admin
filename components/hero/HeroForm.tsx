"use client";

import {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
} from "react";
import { useRouter } from "next/navigation";

interface HeroFormProps {
  isEdit?: boolean;
  heroId?: string;
}

interface HeroFormData {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  videoText: string;
  videoLink: string;
  backgroundImage: string;
  isActive: boolean;
}

export default function HeroForm({
  isEdit = false,
  heroId,
}: HeroFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [imageUploading, setImageUploading] = useState(false);

  const [previewImage, setPreviewImage] = useState("");

  const [formData, setFormData] = useState<HeroFormData>({
    badge: "",
    title: "",
    description: "",
    buttonText: "",
    buttonLink: "",
    videoText: "",
    videoLink: "",
    backgroundImage: "",
    isActive: true,
  });
    const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
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
          backgroundImage: data.imageUrl,
        }));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Image upload failed");
    } finally {
      setImageUploading(false);
    }
  };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.backgroundImage) {
      alert("Please upload a background image.");
      return;
    }

    setLoading(true);

    try {
      const url = isEdit
        ? `/api/hero/${heroId}`
        : "/api/hero";

      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert(
          isEdit
            ? "Hero updated successfully!"
            : "Hero created successfully!"
        );

        router.push("/dashboard/hero");
        router.refresh();
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to save hero.");
    } finally {
      setLoading(false);
    }
  };
    useEffect(() => {
    if (!isEdit || !heroId) return;

    const fetchHero = async () => {
      try {
        const res = await fetch(`/api/hero/${heroId}`);
        const data = await res.json();

        if (data.success) {
          const hero = data.data;

          setFormData({
            badge: hero.badge || "",
            title: hero.title || "",
            description: hero.description || "",
            buttonText: hero.buttonText || "",
            buttonLink: hero.buttonLink || "",
            videoText: hero.videoText || "",
            videoLink: hero.videoLink || "",
            backgroundImage: hero.backgroundImage || "",
            isActive: hero.isActive,
          });

          setPreviewImage(hero.backgroundImage || "");
        } else {
          alert("Hero not found.");
        }
      } catch (error) {
        console.error(error);
        alert("Failed to load hero.");
      }
    };

    fetchHero();
  }, [heroId, isEdit]);
    return (
    <form
      onSubmit={handleSubmit}
      className="text-black bg-white rounded-xl shadow-md p-6 space-y-6"
    >
      <div>
        <label className="text-black block mb-2 font-medium">Badge</label>
        <input
          type="text"
          name="badge"
          value={formData.badge}
          onChange={handleChange}
          placeholder="e.g. Trusted Insurance"
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter hero title"
          required
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Description</label>
        <textarea
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter hero description"
          required
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-medium">Button Text</label>
          <input
            type="text"
            name="buttonText"
            value={formData.buttonText}
            onChange={handleChange}
            placeholder="Get Started"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Button Link</label>
          <input
            type="text"
            name="buttonLink"
            value={formData.buttonLink}
            onChange={handleChange}
            placeholder="/contact"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-medium">Video Text</label>
          <input
            type="text"
            name="videoText"
            value={formData.videoText}
            onChange={handleChange}
            placeholder="Watch Video"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Video Link</label>
          <input
            type="text"
            name="videoLink"
            value={formData.videoLink}
            onChange={handleChange}
            placeholder="https://youtube.com/..."
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Background Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full border rounded-lg p-2"
        />

        {imageUploading && (
          <p className="text-blue-600 mt-2">
            Uploading image...
          </p>
        )}

        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="mt-4 h-52 w-full rounded-lg object-cover border"
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

        <label htmlFor="isActive" className="font-medium">
          Active Hero
        </label>
      </div>

      <button
        type="submit"
        disabled={loading || imageUploading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : isEdit
          ? "Update Hero"
          : "Create Hero"}
      </button>
    </form>
  );
}