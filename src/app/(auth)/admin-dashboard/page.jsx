"use client";

// Redux core actions layer mapped stream query
import { useGetDynamicListQuery } from "@/redux/dynamic/action";

export default function AdminDashboardPage() {
  const { data, isLoading } = useGetDynamicListQuery({
    entity: "health",
    endPoint: "data",
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-xs">
        <h2 className="text-xl font-black text-zinc-900">
          Welcome Back Admin!
        </h2>
        <p className="text-sm text-zinc-500 mt-1">
          Real-time stats monitor system dashboard engine status overview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-xs">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Server Engine Connectivity
          </p>
          <p className="text-2xl font-black text-green-600 mt-2">Active</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-xs">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Dynamic Stream Loading
          </p>
          <p className="text-2xl font-black text-zinc-800 mt-2">
            {isLoading ? "Syncing..." : "Synced"}
          </p>
        </div>
      </div>
    </div>
  );
}
