// frontend/src/App.tsx

import { useGames } from "./hooks/useGames";
import { AddGameForm } from "./components/AddGameForm";
import { GameList } from "./components/GameList";

export default function App() {
  const { games, create, remove } = useGames(); // 👈 solo aquí

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-4">Backlog Gamer</h1>

      <AddGameForm create={create} />
      <GameList games={games} remove={remove} />
    </main>
  );
}
