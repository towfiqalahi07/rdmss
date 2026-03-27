import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { Search, Filter, MapPin, GraduationCap, Users } from "lucide-react";

const prisma = new PrismaClient();

export default async function HelpPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q, category } = await searchParams;

  const helpRequests = await prisma.helpRequest.findMany({
    where: {
      AND: [
        q ? {
          OR: [
            { title: { contains: q } },
            { description: { contains: q } },
          ],
        } : {},
        category && category !== "all" ? { category } : {},
      ],
    },
    include: {
      user: {
        select: {
          name: true,
          college: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="pt-24 min-h-screen bg-gray-50 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Help & Support</h1>
            <p className="text-gray-600 text-lg">Post requests for financial, academic, or medical assistance.</p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg flex items-center">
            <Users size={20} className="mr-2" /> Post a Request
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <form className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Search requests..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <select
              name="category"
              defaultValue={category || "all"}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              <option value="all">All Categories</option>
              <option value="FINANCIAL">Financial Help</option>
              <option value="MEDICAL">Medical Emergency</option>
              <option value="ACADEMIC">Academic Help</option>
              <option value="OTHER">Others</option>
            </select>
            <button className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all">
              Filter
            </button>
          </form>
        </div>

        {/* Request List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {helpRequests.length > 0 ? (
            helpRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    request.category === 'MEDICAL' ? 'bg-red-100 text-red-600' :
                    request.category === 'FINANCIAL' ? 'bg-green-100 text-green-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {request.category}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{request.title}</h3>
                <p className="text-gray-600 mb-6 line-clamp-3 text-sm flex-1">{request.description}</p>

                <div className="pt-4 border-t border-gray-50 mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                        <Users size={14} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900">{request.user.name}</p>
                        <p className="text-[10px] text-gray-500">{request.user.college}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">
                      Contribute
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No requests found</h3>
              <p className="text-gray-600">Try adjusting your search or category filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
