import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 py-12 text-gray-600">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <h2 className="mb-4 text-2xl font-bold text-blue-600">RDMSS</h2>
            <p className="mb-4 max-w-sm text-sm leading-relaxed">
              Rajshahi Division Medical Students Society: RDMSS একটি অরাজনৈতিক, মেডিকেল শিক্ষার্থীদের দ্বারা এবং মেডিকেল শিক্ষার্থীদের জন্য গড়ে তোলা সেবামূলক সংগঠন।
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/directory" className="hover:text-blue-600">Directory</Link></li>
              <li><Link href="/announcements" className="hover:text-blue-600">Announcements</Link></li>
              <li><Link href="/help" className="hover:text-blue-600">Help & Support</Link></li>
              <li><Link href="/events" className="hover:text-blue-600">Events</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help" className="hover:text-blue-600">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-600">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-600">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-xs">
          <p>© {new Date().getFullYear()} RDMSS. All rights reserved. Created for medical students by medical students.</p>
        </div>
      </div>
    </footer>
  );
}
