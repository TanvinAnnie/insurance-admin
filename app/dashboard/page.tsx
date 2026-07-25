import {
  FiBox,
  FiFolder,
  FiImage,
  FiShoppingCart,
} from "react-icons/fi";

const stats = [
  {
    title: "Total Products",
    value: "120",
    icon: FiBox,
    color: "bg-blue-500",
  },
  {
    title: "Categories",
    value: "18",
    icon: FiFolder,
    color: "bg-green-500",
  },
  {
    title: "Hero Slides",
    value: "5",
    icon: FiImage,
    color: "bg-purple-500",
  },
  {
    title: "Orders",
    value: "245",
    icon: FiShoppingCart,
    color: "bg-orange-500",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Welcome back, Admin 👋
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl bg-white p-6 shadow-sm border"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-gray-800">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl text-white ${item.color}`}
                >
                  <Icon size={28} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="rounded-xl bg-white border shadow-sm p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-800">
            Recent Activity
          </h2>

          <div className="mt-6 space-y-4">
            <div className="rounded-lg border p-4">
              ✅ New product added
            </div>

            <div className="rounded-lg border p-4">
              📦 Category updated
            </div>

            <div className="rounded-lg border p-4">
              🖼 Hero banner changed
            </div>

            <div className="rounded-lg border p-4">
              🛒 New order received
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl bg-white border shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Quick Actions
          </h2>

          <div className="mt-6 space-y-4">
            <button className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700 transition">
              Add Product
            </button>

            <button className="w-full rounded-lg bg-green-600 py-3 text-white hover:bg-green-700 transition">
              Add Category
            </button>

            <button className="w-full rounded-lg bg-purple-600 py-3 text-white hover:bg-purple-700 transition">
              Update Hero
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}