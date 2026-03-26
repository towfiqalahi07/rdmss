import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/Card";
import { Image as ImageIcon, Camera, User } from "lucide-react";

export default async function GalleryPage() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Gallery & Memories</h1>
        <p className="text-gray-600">Event photos, videos, and memories of RDMSS programs.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {images.map((image) => (
          <div key={image.id} className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-sm transition-all hover:shadow-xl">
            <div className="flex h-full w-full items-center justify-center text-gray-300 transition-transform group-hover:scale-110">
              <ImageIcon size={48} />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
              <p className="text-xs font-bold text-white mb-1 line-clamp-1">{image.caption || "RDMSS Event"}</p>
              <p className="text-[10px] font-medium text-white/70 italic">{new Date(image.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
        {/* Placeholder for empty gallery */}
        {images.length === 0 && Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-50 border-2 border-dashed border-gray-100">
            <div className="flex h-full w-full items-center justify-center text-gray-200">
              <ImageIcon size={32} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center text-sm text-gray-500 italic">
        <p>Only Ambassadors and Admins can upload photos to the gallery.</p>
      </div>
    </div>
  );
}
