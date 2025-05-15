import { useState } from "react";
import { addGame } from "../lib/api";

export function AddGameForm() {
  const [title, setTitle] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    await addGame(title);
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
      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-3 py-1"
      >
        Añadir
      </button>
    </form>
  );
}
