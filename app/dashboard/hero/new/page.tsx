import Link from "next/link";
import HeroForm from "@/components/hero/HeroForm";

export default function NewHeroPage() {
  return (
    <div className="text-black space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Create Hero
          </h1>

          <p className="text-gray-500 mt-1">
            Add a new hero section for your website.
          </p>
        </div>

        <Link
          href="/dashboard/hero"
          className="border border-gray-300 px-5 py-2.5 rounded-lg hover:bg-gray-100 transition"
        >
          ← Back
        </Link>
      </div>
            <div className="bg-white rounded-xl shadow-md p-6">
        <HeroForm />
      </div>
    </div>
  );
}