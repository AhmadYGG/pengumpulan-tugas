import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ Update submission (PUT)
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const body = await req.json();
    const { name, nim, linkTugas, linkTugas2, courseId } = body;

    const updated = await prisma.submission.update({
      where: { id },
      data: { name, nim, linkTugas, linkTugas2, courseId: Number(courseId) },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /submissions/:id error:", error);
    return NextResponse.json({ error: "Failed to update submission" }, { status: 500 });
  }
}

// ✅ Hapus submission (DELETE)
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    await prisma.submission.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /submissions/:id error:", error);
    return NextResponse.json({ error: "Failed to delete submission" }, { status: 500 });
  }
}
