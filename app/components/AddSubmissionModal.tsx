"use client";
import { useEffect, useState } from "react";

export default function AddSubmissionModal({
  open,
  onClose,
  defaultCourseId,
  existingData,
  onSaved,
}: any) {
  const [name, setName] = useState("");
  const [nim, setNim] = useState("");
  const [link1, setLink1] = useState("");
  const [link2, setLink2] = useState("");

  useEffect(() => {
    if (existingData) {
      setName(existingData.name);
      setNim(existingData.nim);
      setLink1(existingData.linkTugas || "");
      setLink2(existingData.linkTugas2 || "");
    } else {
      setName("");
      setNim("");
      setLink1("");
      setLink2("");
    }
  }, [existingData]);

  async function submit() {
    if (!name || !nim || !link1) return alert("Lengkapi semua field utama");

    const payload = {
      name,
      nim,
      linkTugas: link1,
      linkTugas2: link2,
      courseId: defaultCourseId,
    };

    const res = await fetch(
      existingData ? `/api/submissions/${existingData.id}` : "/api/submissions",
      {
        method: existingData ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (res.ok) {
      onClose();
      if (onSaved) onSaved();
    } else {
      alert("Gagal menyimpan data");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
      <div className="bg-[#17343c] text-white p-6 rounded-2xl shadow-xl w-full max-w-md border border-[#2c4c50]">
        <h2 className="text-lg font-semibold mb-4 text-[#3ca1a1]">
          {existingData ? "Edit Submission" : "Tambah Submission"}
        </h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama"
          className="w-full mb-3 bg-[#1d4e4f] text-white placeholder-gray-300 rounded-lg px-3 py-2 border border-[#2e7b7b] focus:outline-none focus:ring-2 focus:ring-[#3ca1a1]"
        />
        <input
          value={nim}
          onChange={(e) => setNim(e.target.value)}
          placeholder="NIM"
          className="w-full mb-3 bg-[#1d4e4f] text-white placeholder-gray-300 rounded-lg px-3 py-2 border border-[#2e7b7b] focus:outline-none focus:ring-2 focus:ring-[#3ca1a1]"
        />
        <input
          value={link1}
          onChange={(e) => setLink1(e.target.value)}
          placeholder="Link Tugas 1"
          className="w-full mb-3 bg-[#1d4e4f] text-white placeholder-gray-300 rounded-lg px-3 py-2 border border-[#2e7b7b] focus:outline-none focus:ring-2 focus:ring-[#3ca1a1]"
        />
        <input
          value={link2}
          onChange={(e) => setLink2(e.target.value)}
          placeholder="Link Tugas 2 (opsional)"
          className="w-full mb-4 bg-[#1d4e4f] text-white placeholder-gray-300 rounded-lg px-3 py-2 border border-[#2e7b7b] focus:outline-none focus:ring-2 focus:ring-[#3ca1a1]"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#2e7b7b] hover:bg-[#35948c] transition text-white"
          >
            Batal
          </button>
          <button
            onClick={submit}
            className="px-4 py-2 rounded-lg bg-[#3ca1a1] hover:bg-[#2e7b7b] transition text-white font-medium"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
