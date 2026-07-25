"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";

interface SettingsData {
  websiteName: string;
  logo: string;
  favicon: string;

  email: string;
  phone: string;
  address: string;

  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  youtube: string;

  copyright: string;

  primaryColor: string;
  secondaryColor: string;

  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;

  googleMap: string;

  maintenanceMode: boolean;
  isActive: boolean;
}

export default function SettingsForm() {
  const [loading, setLoading] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);

  const [formData, setFormData] = useState<SettingsData>({
    websiteName: "",
    logo: "",
    favicon: "",

    email: "",
    phone: "",
    address: "",

    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    youtube: "",

    copyright: "",

    primaryColor: "#2563eb",
    secondaryColor: "#1e293b",

    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",

    googleMap: "",

    maintenanceMode: false,
    isActive: true,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();

      if (data.success) {
        setFormData(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const uploadLogo = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploadingLogo(true);

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
          logo: data.url,
        }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUploadingLogo(false);
    }
  };

  const uploadFavicon = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploadingFavicon(true);

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
          favicon: data.url,
        }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUploadingFavicon(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
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

      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("Settings updated successfully.");
      } else {
        alert(data.message || "Update failed.");
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
      className="space-y-8 rounded-xl bg-white p-6 shadow"
    >
      {/* Website Information */}

      <div>
        <h2 className="mb-4 text-xl font-semibold">
          Website Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">
              Website Name
            </label>

            <input
              type="text"
              name="websiteName"
              value={formData.websiteName}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Contact Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Address
            </label>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />
          </div>
        </div>
      </div>

      {/* Logo */}

      <div>
        <h2 className="mb-4 text-xl font-semibold">
          Branding
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">
              Website Logo
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={uploadLogo}
            />

            {uploadingLogo && (
              <p className="mt-2 text-blue-600">
                Uploading...
              </p>
            )}

            {formData.logo && (
              <img
                src={formData.logo}
                alt="Logo"
                className="mt-4 h-20 rounded border"
              />
            )}
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Favicon
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={uploadFavicon}
            />

            {uploadingFavicon && (
              <p className="mt-2 text-blue-600">
                Uploading...
              </p>
            )}

            {formData.favicon && (
              <img
                src={formData.favicon}
                alt="Favicon"
                className="mt-4 h-16 w-16 rounded border"
              />
            )}
          </div>
        </div>
      </div>

      {/* Social Links */}

      <div>
        <h2 className="mb-4 text-xl font-semibold">
          Social Links
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <input
            type="text"
            name="facebook"
            placeholder="Facebook URL"
            value={formData.facebook}
            onChange={handleChange}
            className="rounded-lg border p-3"
          />

          <input
            type="text"
            name="instagram"
            placeholder="Instagram URL"
            value={formData.instagram}
            onChange={handleChange}
            className="rounded-lg border p-3"
          />

          <input
            type="text"
            name="linkedin"
            placeholder="LinkedIn URL"
            value={formData.linkedin}
            onChange={handleChange}
            className="rounded-lg border p-3"
          />

          <input
            type="text"
            name="twitter"
            placeholder="Twitter URL"
            value={formData.twitter}
            onChange={handleChange}
            className="rounded-lg border p-3"
          />

          <input
            type="text"
            name="youtube"
            placeholder="YouTube URL"
            value={formData.youtube}
            onChange={handleChange}
            className="rounded-lg border p-3"
          />
        </div>
      </div>

      {/* SEO */}

      <div>
        <h2 className="mb-4 text-xl font-semibold">
          SEO Settings
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="seoTitle"
            placeholder="SEO Title"
            value={formData.seoTitle}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          <textarea
            rows={4}
            name="seoDescription"
            placeholder="SEO Description"
            value={formData.seoDescription}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          <input
            type="text"
            name="seoKeywords"
            placeholder="SEO Keywords"
            value={formData.seoKeywords}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>
      </div>

      {/* Theme */}

      <div>
        <h2 className="mb-4 text-xl font-semibold">
          Theme
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block">
              Primary Color
            </label>

            <input
              type="color"
              name="primaryColor"
              value={formData.primaryColor}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block">
              Secondary Color
            </label>

            <input
              type="color"
              name="secondaryColor"
              value={formData.secondaryColor}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Maintenance */}

      <div className="flex flex-col gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="maintenanceMode"
            checked={formData.maintenanceMode}
            onChange={handleChange}
          />

          Maintenance Mode
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />

          Website Active
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Settings"}
      </button>
    </form>
  );
}