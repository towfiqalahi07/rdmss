import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('adminpassword', 10)

  // Create a system user (Admin)
  const admin = await prisma.user.create({
    data: {
      name: "RDMSS Admin",
      email: "admin@rdmss.org",
      username: "admin",
      password: hashedPassword,
      college: "Rajshahi Medical College",
      session: "2025-26",
      district: "Rajshahi",
      role: "ADMIN",
      points: 1000,
      profile: {
        create: { isPublic: true }
      }
    }
  });

  const ambassadorHashedPassword = await bcrypt.hash('ambassadorpassword', 10)

  // Create an Ambassador
  await prisma.user.create({
    data: {
      name: "Campus Ambassador",
      email: "ambassador@rdmss.org",
      username: "ambassador",
      password: ambassadorHashedPassword,
      college: "Rajshahi Medical College",
      session: "2025-26",
      district: "Rajshahi",
      role: "AMBASSADOR",
      points: 500,
      profile: {
        create: { isPublic: true }
      }
    }
  });

  const studentHashedPassword = await bcrypt.hash('password123', 10)

  // Create some students
  const districts = ["Bogra", "Pabna", "Sirajganj", "Naogaon", "Natore"];
  for (let i = 1; i <= 5; i++) {
    await prisma.user.create({
      data: {
        name: `Student ${i}`,
        email: `student${i}@example.com`,
        username: `student${i}`,
        password: studentHashedPassword,
        college: "Shaheed Ziaur Rahman Medical College, Bogra",
        session: "2025-26",
        district: districts[i-1],
        role: "STUDENT",
        points: i * 50,
        interests: "Research, Volunteering",
        profile: {
          create: { isPublic: true }
        }
      }
    });
  }

  // Create announcements
  await prisma.announcement.create({
    data: {
      title: "Welcome to RDMSS!",
      content: "We are excited to launch the RDMSS platform for 2025-26 session students.",
      authorId: admin.id
    }
  });

  // Create a blog post
  await prisma.blogPost.create({
    data: {
      title: "How to survive first year of Med School",
      content: "A guide for incoming students of the 2025-26 session.",
      category: "Experience",
      authorId: admin.id
    }
  });

  // Create an event
  await prisma.event.create({
    data: {
      title: "RDMSS Annual Seminar 2025",
      description: "Join us for a day of learning and networking.",
      date: new Date("2025-12-25"),
      location: "Rajshahi Medical College Auditorium",
      authorId: admin.id
    }
  });

  console.log("Seed complete!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
