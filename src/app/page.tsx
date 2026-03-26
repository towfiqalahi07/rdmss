import Link from "next/link";
import { ArrowRight, Users, Bell, Heart, Calendar, BookOpen, MapPin } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-blue-50 to-white py-24 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700 mb-6">
            Empowering Medical Students of Rajshahi Division
          </div>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl">
            RDMSS <span className="text-blue-600">Rajshahi Division</span> Medical Students Society
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 md:text-xl leading-relaxed">
            RDMSS একটি অরাজনৈতিক, মেডিকেল শিক্ষার্থীদের দ্বারা এবং মেডিকেল শিক্ষার্থীদের জন্য গড়ে তোলা সেবামূলক সংগঠন, যা শিক্ষার্থীদের সংযোগ, সহযোগিতা এবং শক্তিশালী নেটওয়ার্ক তৈরি করার উদ্দেশ্যে গড়ে উঠেছে।
          </p>
          <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link
              href="/register"
              className="group flex items-center justify-center rounded-full bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl"
            >
              Join RDMSS 2025-26
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/about"
              className="flex items-center justify-center rounded-full border-2 border-gray-200 bg-white px-8 py-4 text-lg font-semibold text-gray-900 transition-all hover:border-blue-600 hover:text-blue-600"
            >
              Learn More
            </Link>
          </div>
        </div>
        {/* Background Decorative Elements */}
        <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-blue-100/50 blur-3xl"></div>
        <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-blue-100/50 blur-3xl"></div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-24">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Platform Features</h2>
          <p className="mx-auto max-w-2xl text-gray-600">Everything you need to connect, grow, and support your fellow medical students.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Users, title: "Member Directory", desc: "Find your peers by college, district, or interests." },
            { icon: Bell, title: "Announcements", desc: "Stay updated with important notices and admin posts." },
            { icon: Heart, title: "Help & Support", desc: "Request and provide academic, financial, or medical help." },
            { icon: Calendar, title: "Event Management", desc: "Register for seminars, meetups, and programs." },
            { icon: BookOpen, title: "Medical Blog", desc: "Read tips, experiences, and career guidance." },
            { icon: MapPin, title: "District Map", desc: "Visualize and connect with members across the division." },
          ].map((feature, idx) => (
            <div key={idx} className="group rounded-2xl border border-gray-100 bg-white p-8 transition-all hover:border-blue-100 hover:shadow-lg">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
