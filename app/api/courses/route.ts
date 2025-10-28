import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(courses);
}

export async function POST(req: Request) {
  const body = await req.json();
  // validate
  if (!body?.name || typeof body.name !== "string") {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }
  const course = await prisma.course.create({
    data: { name: body.name, code: body.code },
  });
  return NextResponse.json(course);
}
