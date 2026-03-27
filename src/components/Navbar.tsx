"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, LogOut, LayoutDashboard, Settings } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/session");
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error("Failed to fetch session:", err);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight">
              RDMSS
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/directory" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Directory</Link>
            <Link href="/announcements" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Announcements</Link>
            <Link href="/help" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Help & Support</Link>
            <Link href="/events" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Events</Link>
            <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Blog</Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <User size={18} className="text-blue-600" />
                    </div>
                    <span className="font-medium">{user.name || user.email.split('@')[0]}</span>
                  </button>

                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors">
                      <User size={16} className="mr-2" /> My Profile
                    </Link>
                    {user.role === 'ADMIN' && (
                      <Link href="/admin" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors">
                        <LayoutDashboard size={16} className="mr-2" /> Admin Panel
                      </Link>
                    )}
                    {(user.role === 'AMBASSADOR' || user.role === 'ADMIN') && (
                      <Link href="/ambassador" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors">
                        <Settings size={16} className="mr-2" /> Ambassador Hub
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} className="mr-2" /> Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
