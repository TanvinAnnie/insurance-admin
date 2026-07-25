import SettingsForm from "@/components/settings/SettingsForm";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Website Settings
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your website branding, contact information, SEO, social
          media links, theme colors and maintenance mode.
        </p>
      </div>

      <SettingsForm />
    </div>
  );
}