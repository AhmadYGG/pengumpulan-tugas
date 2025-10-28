"use client";
import { useEffect, useState } from "react";
import AddSubmissionModal from "./AddSubmissionModal";

export default function SubmissionTable({ courseId }: { courseId: number }) {
  const [subs, setSubs] = useState<any[]>([]);
  const [editData, setEditData] = useState<any | null>(null);

  async function loadSubs() {
    const res = await fetch(`/api/submissions?courseId=${courseId}`);
    const data = await res.json();
    setSubs(data);
  }

  async function deleteSub(id: number) {
    if (!confirm("Yakin mau hapus data ini?")) return;
    const res = await fetch(`/api/submissions/${id}`, { method: "DELETE" });
    if (res.ok) {
      setSubs((prev) => prev.filter((s) => s.id !== id));
    } else {
      alert("Gagal menghapus data");
    }
  }

  useEffect(() => {
    if (courseId) loadSubs();
  }, [courseId]);

  return (
    <>
      <div className="overflow-x-auto bg-[#142223] border border-[#2c4c50] rounded-xl">
        <table className="min-w-full text-sm text-left text-white">
          <thead className="bg-[#17343c] text-[#3ca1a1]">
            <tr>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">NIM</th>
              <th className="px-4 py-2">Tugas Esai</th>
              <th className="px-4 py-2">Tugas WebBlog</th>
              <th className="px-4 py-2 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {subs.length > 0 ? (
              subs.map((s) => (
                <tr
                  key={s.id}
                  className="border-t border-[#244042] hover:bg-[#1b2f30]"
                >
                  <td className="px-4 py-2">{s.name}</td>
                  <td className="px-4 py-2">{s.nim}</td>
                  <td className="px-4 py-2">
                    <a
                      href={s.linkTugas}
                      target="_blank"
                      rel="noreferrer"
                      className="underline text-[#3ca1a1] hover:text-[#50b3b3]"
                    >
                      Lihat
                    </a>
                  </td>
                  <td className="px-4 py-2">
                    {s.linkTugas2 ? (
                      <a
                        href={s.linkTugas2}
                        target="_blank"
                        rel="noreferrer"
                        className="underline text-[#3ca1a1] hover:text-[#50b3b3]"
                      >
                        Lihat
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => setEditData(s)}
                      className="px-3 py-1 text-sm bg-[#3ca1a1] hover:bg-[#2e7b7b] rounded mr-2 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteSub(s.id)}
                      className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 rounded transition"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6 text-gray-400 italic"
                >
                  Belum ada data submission.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editData && (
        <AddSubmissionModal
          open={!!editData}
          onClose={() => setEditData(null)}
          defaultCourseId={courseId}
          existingData={editData}
          onSaved={loadSubs}
        />
      )}
    </>
  );
}
