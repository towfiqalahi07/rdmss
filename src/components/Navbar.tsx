import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-blue-600">RDMSS</span>
        </Link>
        <div className="hidden space-x-6 md:flex">
          <Link href="/directory" className="text-sm font-medium hover:text-blue-600">Directory</Link>
          <Link href="/announcements" className="text-sm font-medium hover:text-blue-600">Announcements</Link>
          <Link href="/help" className="text-sm font-medium hover:text-blue-600">Help & Support</Link>
          <Link href="/events" className="text-sm font-medium hover:text-blue-600">Events</Link>
          <Link href="/blog" className="text-sm font-medium hover:text-blue-600">Blog</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-sm font-medium hover:text-blue-600">Login</Link>
          <Link
            href="/register"
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Join Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
