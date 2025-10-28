"use client";
import { useEffect, useState } from "react";
import CourseTabs from "./components/CourseTabs";
import SubmissionTable from "./components/SubmissionTable";
import AddSubmissionModal from "./components/AddSubmissionModal";

export default function Page() {
  const [courses, setCourses] = useState<any[]>([]);
  const [activeCourse, setActiveCourse] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("/api/courses")
      .then((r) => r.json())
      .then(setCourses);
  }, []);

  useEffect(() => {
    if (courses.length && activeCourse === null) setActiveCourse(courses[0].id);
  }, [courses]);

  return (
    <main className="min-h-screen bg-[#0f172a] text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-[#1e293b] rounded-2xl shadow-md p-6 border border-[#334155]">
        <h1 className="text-xl font-semibold text-[#3ca1a1] mb-2">
          Pengumpulan Tugas
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          Kelola daftar tugas berdasarkan mata kuliah kamu.
        </p>

        <CourseTabs
          courses={courses}
          setCourses={setCourses}
          activeCourse={activeCourse}
          setActiveCourse={setActiveCourse}
        />

        <div className="mt-6">
          <div className="flex justify-end mb-3">
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 rounded-lg bg-[#3ca1a1] hover:bg-[#2e7b7b] transition font-medium"
            >
              + Tambah Data Pengumpulan
            </button>
          </div>

          {activeCourse && (
            <div className="bg-[#22313f] rounded-xl shadow-inner p-4 border border-[#334155]">
              <SubmissionTable courseId={activeCourse} />
            </div>
          )}
        </div>
      </div>

      <AddSubmissionModal
        open={showModal}
        onClose={() => setShowModal(false)}
        defaultCourseId={activeCourse}
      />
    </main>
  );
}
