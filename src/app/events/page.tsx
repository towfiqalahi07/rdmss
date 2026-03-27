export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import { Calendar, MapPin, Users, Ticket, ArrowRight, Bell } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    include: { rsvps: true },
    orderBy: { date: "asc" },
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 flex flex-col justify-between items-start md:flex-row md:items-end">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Events & Programs</h1>
          <p className="text-gray-600">Register for upcoming seminars, meetups, and academic programs.</p>
        </div>
        <Button className="mt-4 md:mt-0">Create Event</Button>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id} className="flex flex-col h-full overflow-hidden transition-all hover:scale-[1.02]">
            <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex flex-col items-center justify-center text-blue-600 p-6 text-center">
              <div className="mb-2 rounded-full bg-white/50 p-3">
                <Calendar size={32} />
              </div>
              <p className="text-sm font-bold uppercase tracking-wider">{new Date(event.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <CardHeader className="flex-grow">
              <CardTitle className="text-xl font-bold text-gray-900 leading-snug">{event.title}</CardTitle>
              <div className="mt-2 space-y-1">
                <div className="flex items-center space-x-2 text-sm text-gray-500 font-medium">
                  <MapPin size={14} className="text-blue-600" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500 font-medium">
                  <Users size={14} className="text-blue-600" />
                  <span>{event.rsvps.length} Attending</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">{event.description}</p>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3 pt-6 border-t bg-gray-50/50">
              <Button className="w-full">RSVP Now</Button>
              <Button variant="outline" className="w-full">View Participant List</Button>
            </CardFooter>
          </Card>
        ))}
        {events.length === 0 && (
          <div className="col-span-full py-20 text-center rounded-3xl border-2 border-dashed border-gray-100 bg-gray-50/50">
            <Ticket className="mx-auto mb-4 h-12 w-12 text-gray-200" />
            <p className="text-gray-500 italic font-medium">No upcoming events scheduled.</p>
            <p className="text-sm text-gray-400 mt-2">Check back soon for seminars and meetups!</p>
          </div>
        )}
      </div>
    </div>
  );
}
