import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ Ambil semua submissions (filter by courseId optional)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId");

  try {
    const submissions = await prisma.submission.findMany({
      where: courseId ? { courseId: Number(courseId) } : {},
      orderBy: { id: "desc" },
    });
    return NextResponse.json(submissions);
  } catch (error) {
    console.error("GET /submissions error:", error);
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}

// ✅ Tambah submission baru
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, nim, linkTugas, linkTugas2, courseId } = body;

    if (!name || !nim || !linkTugas || !courseId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const submission = await prisma.submission.create({
      data: { name, nim, linkTugas, linkTugas2, courseId: Number(courseId) },
    });

    return NextResponse.json(submission);
  } catch (error) {
    console.error("POST /submissions error:", error);
    return NextResponse.json({ error: "Failed to create submission" }, { status: 500 });
  }
}
