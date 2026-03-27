export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { RAJSHAHI_DISTRICTS } from "@/lib/constants";
import { MapPin, Users, Info, ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function MapPage() {
  const districtCounts = await Promise.all(
    RAJSHAHI_DISTRICTS.map(async (d) => ({
      name: d,
      count: await prisma.user.count({ where: { district: d } }),
    }))
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 flex items-center">
          District Map View <MapPin className="ml-2 text-blue-600" size={24} />
        </h1>
        <p className="text-gray-600">Visualize and connect with members across the Rajshahi division.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* SVG Map Section */}
        <div className="relative rounded-3xl border-2 border-blue-50 bg-gradient-to-br from-blue-50/50 to-white p-8 overflow-hidden shadow-inner">
           <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
              {/* Simplified Rajshahi Division Map Shape */}
              <path
                 d="M20,30 L40,10 L80,20 L90,50 L70,80 L40,90 L10,70 Z"
                 fill="#eff6ff"
                 stroke="#2563eb"
                 strokeWidth="0.5"
              />
              {/* District Dots & Labels */}
              {districtCounts.map((d, i) => {
                const cx = 30 + (i % 3) * 20;
                const cy = 25 + (i / 3) * 20;
                return (
                  <g key={i} className="group cursor-pointer">
                    <circle
                       cx={cx}
                       cy={cy}
                       r={2 + (d.count / 10)}
                       fill="#2563eb"
                       className="animate-pulse hover:r-4 transition-all"
                    />
                    <text x={cx + 3} y={cy + 1} fontSize="3" className="font-bold fill-blue-900 opacity-0 group-hover:opacity-100 transition-opacity">
                      {d.name} ({d.count})
                    </text>
                  </g>
                );
              })}
           </svg>
           <div className="absolute bottom-6 left-6 right-6">
              <div className="rounded-2xl bg-white/80 backdrop-blur-md p-4 shadow-lg border border-blue-100">
                 <div className="flex items-center space-x-2 mb-1">
                    <div className="h-3 w-3 rounded-full bg-blue-600 animate-pulse"></div>
                    <p className="text-xs font-bold text-blue-600">Live Member Density</p>
                 </div>
                 <p className="text-[10px] text-gray-500 font-medium">District dot size scales with the number of registered members.</p>
              </div>
           </div>
        </div>

        {/* District Statistics & Navigation */}
        <div className="space-y-6">
          <Card className="border-0 shadow-xl shadow-blue-900/5 overflow-hidden">
            <CardHeader className="bg-white pb-6 border-b border-blue-50">
              <CardTitle className="text-xl">District Breakdown</CardTitle>
              <CardDescription className="flex items-center space-x-1 text-xs">
                 <Info size={12} className="text-blue-500" />
                 <span>Detailed distribution of 2025-26 session students</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-blue-50">
                {districtCounts.sort((a, b) => b.count - a.count).map((d) => (
                  <Link
                    key={d.name}
                    href={`/directory?district=${d.name}`}
                    className="flex items-center justify-between p-6 hover:bg-blue-50/50 transition-colors group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-gray-900">{d.name}</span>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Rajshahi Division</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <span className="text-sm font-black text-blue-600">{d.count}</span>
                        <p className="text-[10px] text-gray-400 font-medium uppercase">Members</p>
                      </div>
                      <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
