// frontend/src/components/AddGameForm.tsx

import { useState } from "react";

type Props = {
  create: (title: string, platform?: string) => Promise<void>;
};

export function AddGameForm({ create }: Props) {
  const [title, setTitle] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    await create(title); // ✅ usa el prop
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título del juego"
        className="border rounded px-2 py-1 flex-1"
      />
      <button type="submit" className="bg-blue-600 text-white rounded px-3 py-1">
        Añadir
      </button>
    </form>
  );
}
