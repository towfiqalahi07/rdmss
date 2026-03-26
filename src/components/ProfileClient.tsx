"use client";

import { useEffect, useState } from "react";
import { User, BookOpen, MapPin, Award, Mail, Calendar, Download, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface ProfileUser {
  id: string;
  name: string;
  username: string;
  college: string;
  session: string;
  district: string;
  role: string;
  bio: string | null;
  skills: string | null;
  interests: string | null;
  email: string;
  createdAt: string;
}

export default function ProfileClient({ user }: { user: ProfileUser }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDownload = () => {
    alert("In a production environment, this would generate a high-quality PDF or PNG of your Digital ID card.");
  };

  const handleShare = () => {
    const url = `${window.location.origin}/u/${user.username}`;
    navigator.clipboard.writeText(url);
    alert("Profile link copied to clipboard!");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1">
          <Card className="overflow-hidden border-0 shadow-2xl shadow-blue-900/5">
            <div className="h-32 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-400"></div>
            <CardContent className="-mt-16 text-center">
              <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-blue-50 text-blue-600 shadow-xl overflow-hidden">
                <div className="h-full w-full flex items-center justify-center bg-blue-50 text-blue-300">
                  <User size={64} />
                </div>
              </div>
              <h1 className="mb-1 text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="mb-4 text-sm font-medium text-blue-600 px-4 line-clamp-2">{user.college}</p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700">Session: {user.session}</span>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700">{user.role}</span>
              </div>
              <p className="mb-6 text-sm text-gray-600 px-6 leading-relaxed line-clamp-3">{user.bio || "No bio added yet. Help others know you better by adding a bio."}</p>
              <div className="flex space-x-2 px-6">
                <Button className="flex-grow shadow-lg shadow-blue-600/20">Message</Button>
                <Button variant="outline" onClick={handleShare} className="p-2 h-10 w-10">
                  <Share2 size={18} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Digital ID Card Preview */}
          <section>
            <div className="flex items-center justify-between mb-6">
               <h2 className="text-xl font-bold text-gray-900">Digital Member ID</h2>
               <Button size="sm" variant="ghost" className="text-blue-600 font-bold flex items-center" onClick={handleDownload}>
                  <Download size={14} className="mr-2" />
                  Download Card
               </Button>
            </div>
            <div className="group relative max-w-md overflow-hidden rounded-[2.5rem] border-2 border-blue-600 bg-white p-8 shadow-2xl transition-all hover:scale-[1.01] hover:shadow-blue-600/10">
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-blue-50 opacity-50 group-hover:scale-110 transition-transform"></div>
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <span className="text-5xl font-black text-blue-900 tracking-tighter">RDMSS</span>
              </div>

              <div className="flex items-start justify-between mb-10 relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 to-blue-500 text-white font-black text-xl shadow-lg shadow-blue-600/30">RD</div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Official Member ID</p>
                  <p className="text-lg font-mono font-black text-blue-600">#RD-{user.id.slice(-6).toUpperCase()}</p>
                </div>
              </div>

              <div className="flex space-x-8 relative">
                <div className="h-28 w-28 flex-shrink-0 rounded-3xl bg-blue-50 flex items-center justify-center text-blue-300 shadow-inner border border-blue-100 overflow-hidden">
                   <User size={56} />
                </div>
                <div className="flex flex-col justify-center overflow-hidden">
                  <h3 className="text-2xl font-black text-gray-900 leading-tight truncate mb-1">{user.name}</h3>
                  <p className="text-xs font-bold text-blue-600 mb-4 truncate uppercase tracking-wide">{user.college}</p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                    <div>
                      <p className="text-[9px] font-black uppercase text-gray-400">Session</p>
                      <p className="text-xs font-black text-gray-900">{user.session}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase text-gray-400">District</p>
                      <p className="text-xs font-black text-gray-900">{user.district}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex items-center justify-between border-t border-blue-50 pt-6 relative">
                <div>
                   <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                   <div className="flex items-center space-x-1">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-[10px] font-bold text-gray-900">ACTIVE MEMBER</span>
                   </div>
                </div>
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full bg-blue-700 border-2 border-white"></div>
                  <div className="h-8 w-8 rounded-full bg-blue-500 border-2 border-white"></div>
                  <div className="h-8 w-8 rounded-full bg-blue-300 border-2 border-white"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Details Section */}
          <Card className="border-0 shadow-xl shadow-blue-900/5">
            <CardContent className="p-10">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                <div className="space-y-8">
                  <div className="flex items-start space-x-4 group">
                    <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Home District</p>
                      <p className="font-bold text-gray-900">{user.district}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 group">
                    <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Award size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Skills / Interests</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                         {(user.skills || user.interests || "General, Medical").split(",").map((s, i) => (
                           <span key={i} className="rounded-full bg-gray-50 border border-gray-100 px-3 py-1 text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                             {s.trim()}
                           </span>
                         ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="flex items-start space-x-4 group">
                    <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Email Contact</p>
                      <p className="font-bold text-gray-900">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 group">
                    <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Joined RDMSS</p>
                      <p className="font-bold text-gray-900">{new Date(user.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
