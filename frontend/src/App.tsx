import { useState } from "react";
import { addGame } from "./lib/api";
import { GameList } from "./components/GameList";

function App() {
  const [title, setTitle] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await addGame(title);
    setTitle("");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Backlog Gamer</h1>

      <form onSubmit={submit} className="flex gap-2 mb-4">
        <input
          className="border rounded px-2 py-1 flex-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título del juego"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-3 py-1"
        >
          Añadir
        </button>
      </form>

      <GameList />
    </div>
  );
}

export default App;
