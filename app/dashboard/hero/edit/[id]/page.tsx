import Link from "next/link";
import HeroForm from "@/components/hero/HeroForm";

interface EditHeroPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditHeroPage({
  params,
}: EditHeroPageProps) {
  const { id } = await params;

  return (
    <div className="text-black space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Edit Hero
          </h1>

          <p className="text-gray-500 mt-1">
            Update your hero section information.
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
        <HeroForm
          isEdit={true}
          heroId={id}
        />
      </div>
    </div>
  );
}