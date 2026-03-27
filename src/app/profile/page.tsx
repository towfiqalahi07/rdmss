import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { User, MapPin, GraduationCap, Mail, Phone, Award, ShieldCheck, Heart, Target, Sparkles, Download } from "lucide-react";

export default async function ProfilePage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    redirect("/login");
  }

  const interests = user.interests ? user.interests.split(",").map(i => i.trim()).filter(Boolean) : [];
  const skills = user.skills ? user.skills.split(",").map(s => s.trim()).filter(Boolean) : [];
  const goals = user.goals ? user.goals.split(",").map(g => g.trim()).filter(Boolean) : [];

  return (
    <div className="pt-24 min-h-screen bg-gray-50 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-400"></div>
          <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-12 mb-6">
              <div className="p-2 bg-white rounded-2xl shadow-lg">
                <div className="w-24 h-24 bg-blue-100 rounded-xl flex items-center justify-center">
                  <User size={48} className="text-blue-600" />
                </div>
              </div>
              <div className="flex gap-3 mb-2">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all text-sm flex items-center">
                  Edit Profile
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-extrabold text-gray-900">{user.name}</h1>
                {user.status === 'APPROVED' && (
                  <div className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-xs font-bold">
                    <ShieldCheck size={12} /> Verified Member
                  </div>
                )}
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
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                    <Mail size={18} />
                  </div>
                  <span className="text-sm font-medium">{user.email}</span>
                </div>
                {user.contact && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                      <Phone size={18} />
                    </div>
                    <span className="text-sm font-medium">{user.contact}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Stats & Badges */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles size={18} className="text-blue-600" /> Contribution
              </h3>
              <div className="text-center p-4 bg-blue-50 rounded-2xl">
                <p className="text-3xl font-black text-blue-600">0</p>
                <p className="text-xs font-bold text-blue-400 uppercase tracking-wider">Points</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award size={18} className="text-blue-600" /> ID Card
              </h3>
              <div className="aspect-[1.6/1] bg-gray-900 rounded-xl mb-4 relative overflow-hidden p-4 text-white">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl -mr-16 -mt-16"></div>
                <p className="text-[10px] font-bold tracking-widest text-blue-400 uppercase mb-4">RDMSS Digital ID</p>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <User size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-tight">{user.name}</p>
                    <p className="text-[8px] text-gray-400">{user.college}</p>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[6px] text-gray-500 uppercase tracking-tighter">Member ID</p>
                    <p className="text-[8px] font-mono">RD-{user.id.substring(0, 8).toUpperCase()}</p>
                  </div>
                  <div className="w-8 h-8 bg-white rounded-sm"></div>
                </div>
              </div>
              <button className="w-full py-2 bg-gray-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                <Download size={14} /> Download Digital ID
              </button>
            </div>
          </div>

          {/* Right Column - Interests, Skills, Goals */}
          <div className="md:col-span-2 space-y-8">
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

            <div className="bg-blue-600 rounded-3xl p-8 text-white flex justify-between items-center shadow-lg shadow-blue-200">
              <div>
                <h3 className="text-xl font-bold mb-2">Find your people</h3>
                <p className="text-blue-100 text-sm opacity-80">Discover students with similar interests and goals.</p>
              </div>
              <Link href="/matching" className="px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-sm">
                Smart Match
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
