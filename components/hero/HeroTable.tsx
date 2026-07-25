"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";

interface Hero {
  _id: string;
  badge: string;
  title: string;
  backgroundImage: string;
  isActive: boolean;
}

export default function HeroTable() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHeroes = async () => {
    try {
      const res = await fetch("/api/hero");
      const data = await res.json();

      if (data.success) {
        setHeroes(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  const loadHeroes = async () => {
    try {
      const res = await fetch("/api/hero");
      const data = await res.json();

      if (data.success) {
        setHeroes(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  loadHeroes();
}, []);

  const deleteHero = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this hero?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/hero/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        fetchHeroes();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Hero Management
        </h2>

        <Link
          href="/dashboard/hero/new"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <FiPlus />
          Add Hero
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Badge</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {heroes.map((hero) => (
              <tr key={hero._id} className="border-b">
                <td className="p-3">
                  <img
                    src={hero.backgroundImage}
                    alt={hero.title}
                    className="h-16 w-28 rounded object-cover"
                  />
                </td>

                <td className="p-3">{hero.badge}</td>

                <td className="p-3">{hero.title}</td>

                <td className="p-3">
                  {hero.isActive ? (
                    <span className="rounded bg-green-100 px-3 py-1 text-sm text-green-700">
                      Active
                    </span>
                  ) : (
                    <span className="rounded bg-red-100 px-3 py-1 text-sm text-red-700">
                      Inactive
                    </span>
                  )}
                </td>

                <td className="p-3">
                  <div className="flex justify-center gap-3">
                    <Link
                      href={`/dashboard/hero/edit/${hero._id}`}
                      className="rounded bg-yellow-500 p-2 text-white hover:bg-yellow-600"
                    >
                      <FiEdit2 />
                    </Link>

                    <button
                      onClick={() => deleteHero(hero._id)}
                      className="rounded bg-red-600 p-2 text-white hover:bg-red-700"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {heroes.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="p-6 text-center text-gray-500"
                >
                  No Hero Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}