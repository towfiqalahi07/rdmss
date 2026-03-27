import { prisma } from "@/lib/prisma";
import { User, MapPin, GraduationCap, Mail, Phone, ShieldCheck, Heart, Target, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user || user.status !== 'APPROVED') {
    notFound();
  }

  const interests = user.interests ? user.interests.split(",").map(i => i.trim()).filter(Boolean) : [];
  const skills = user.skills ? user.skills.split(",").map(s => s.trim()).filter(Boolean) : [];
  const goals = user.goals ? user.goals.split(",").map(g => g.trim()).filter(Boolean) : [];

  return (
    <div className="pt-24 min-h-screen bg-gray-50 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-400"></div>
          <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-12 mb-6">
              <div className="p-2 bg-white rounded-2xl shadow-lg">
                <div className="w-24 h-24 bg-blue-100 rounded-xl flex items-center justify-center">
                  <User size={48} className="text-blue-600" />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-extrabold text-gray-900">{user.name}</h1>
                <div className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-xs font-bold">
                    <ShieldCheck size={12} /> Verified Member
                </div>
              </div>
              <p className="text-gray-500 font-medium mb-6 flex items-center gap-2">
                {user.role} • Session {user.session}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                    <GraduationCap size={18} />
                  </div>
                  <span className="text-sm font-medium">{user.college}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                    <MapPin size={18} />
                  </div>
                  <span className="text-sm font-medium">{user.district} District</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Target size={22} className="text-blue-600" /> Career Goals
              </h3>
              <div className="flex flex-wrap gap-3">
                {goals.length > 0 ? goals.map((goal, i) => (
                  <span key={i} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-bold border border-blue-100">
                    {goal}
                  </span>
                )) : <p className="text-gray-400 italic text-sm">No career goals listed.</p>}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Heart size={22} className="text-blue-600" /> Interests & Skills
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Interests</p>
                  <div className="flex flex-wrap gap-2">
                    {interests.length > 0 ? interests.map((int, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                        {int}
                      </span>
                    )) : <span className="text-gray-400 italic text-sm">None</span>}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {skills.length > 0 ? skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                        {skill}
                      </span>
                    )) : <span className="text-gray-400 italic text-sm">None</span>}
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
