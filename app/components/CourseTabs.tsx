"use client";
import { useState } from "react";

export default function CourseTabs({
  courses,
  setCourses,
  activeCourse,
  setActiveCourse,
}: any) {
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");

  async function createCourse() {
    if (!name.trim()) return;
    const res = await fetch("/api/courses", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: { "Content-Type": "application/json" },
    });
    const newCourse = await res.json();
    setCourses((c: any[]) => [...c, newCourse]);
    setName("");
    setCreating(false);
    setActiveCourse(newCourse.id);
  }

  return (
    <div className="flex items-center flex-wrap gap-2">
      {courses.map((c: any) => (
        <button
          key={c.id}
          onClick={() => setActiveCourse(c.id)}
          className={`px-4 py-2 rounded-md border transition-all ${
            activeCourse === c.id
              ? "bg-[#3ca1a1] text-white border-[#3ca1a1]"
              : "bg-[#22313f] text-gray-300 border-[#334155] hover:bg-[#2d3d4e]"
          }`}
        >
          {c.name}
        </button>
      ))}

      {/* {creating ? (
        <div className="flex items-center gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-[#22313f] border border-[#334155] px-3 py-2 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3ca1a1]"
            placeholder="Nama Mata Kuliah"
          />
          <button
            onClick={createCourse}
            className="px-3 py-2 rounded-md bg-[#3ca1a1] hover:bg-[#2e7b7b] text-white"
          >
            Add
          </button>
          <button
            onClick={() => setCreating(false)}
            className="px-3 py-2 text-gray-600 hover:text-white"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setCreating(true)}
          className="px-3 py-2 rounded-md bg-[#22313f] border border-[#334155] hover:bg-[#2d3d4e] text-[#3ca1a1]"
        >
          + Course
        </button>
      )} */}
    </div>
  );
}
