"use client";

import { RAJSHAHI_COLLEGES, RAJSHAHI_DISTRICTS } from "@/lib/constants";
import { User as UserIcon, Search, MapPin, BookOpen } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useRouter, useSearchParams } from "next/navigation";

interface DirectoryUser {
  id: string;
  name: string;
  username: string;
  college: string;
  district: string;
  interests: string | null;
}

export default function DirectoryClient({ users }: { users: DirectoryUser[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") || "";
  const college = searchParams.get("college") || "";
  const district = searchParams.get("district") || "";

  const updateFilters = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    router.push(`/directory?${params.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="mb-2 text-3xl font-bold">Member Directory</h1>
        <p className="text-gray-600">Find your fellow medical students across Rajshahi division.</p>
      </div>

      {/* Filters */}
      <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-5">
        <form
          className="col-span-1 flex space-x-2 md:col-span-2"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            updateFilters("q", formData.get("q") as string);
          }}
        >
          <Input
            name="q"
            placeholder="Search by name, skills..."
            defaultValue={q}
            className="flex-grow"
          />
          <button type="submit" className="rounded-xl bg-blue-600 px-4 text-white hover:bg-blue-700">
            <Search size={20} />
          </button>
        </form>

        <div className="col-span-1">
          <select
            name="college"
            value={college}
            onChange={(e) => updateFilters("college", e.target.value)}
            className="flex h-11 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Colleges</option>
            {RAJSHAHI_COLLEGES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="col-span-1">
          <select
            name="district"
            value={district}
            onChange={(e) => updateFilters("district", e.target.value)}
            className="flex h-11 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Districts</option>
            {RAJSHAHI_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <Link
          href="/directory"
          className="flex items-center justify-center rounded-xl border border-gray-200 text-xs font-medium text-gray-500 hover:bg-gray-50"
        >
          Clear Filters
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {users.map((user) => (
          <Link key={user.id} href={`/u/${user.username}`}>
            <Card className="h-full overflow-hidden transition-all hover:-translate-y-1 hover:border-blue-200">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <UserIcon size={24} />
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="truncate font-bold text-gray-900">{user.name}</h3>
                    <p className="truncate text-xs text-blue-600">@{user.username}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <BookOpen size={14} className="text-gray-400" />
                    <span className="truncate">{user.college}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin size={14} className="text-gray-400" />
                    <span>{user.district}</span>
                  </div>
                </div>
                {user.interests && (
                  <div className="mt-4 flex flex-wrap gap-1">
                    {user.interests.split(",").slice(0, 3).map((interest, i) => (
                      <span key={i} className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                        {interest.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
        {users.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <p className="text-gray-500 italic">No members found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
