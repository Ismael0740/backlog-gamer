import { useGames } from "../hooks/useGames";

export function GameList() {
  const { games, remove } = useGames();

  if (!games.length) return <p className="italic">Sin juegos aún…</p>;

  return (
    <ul className="mt-4 space-y-1">
      {games.map((g) => (
        <li key={g.id} className="border rounded px-3 py-2 flex justify-between items-center">
          <div>
            <span>{g.title}</span>{" "}
            <span className="text-sm text-gray-500">({g.platform})</span>
          </div>
          <button
            onClick={() =>
              confirm(`¿Eliminar “${g.title}”?`) && remove(g.id)
            }
            className="text-red-600 hover:text-red-800"
            title="Eliminar"
          >
            🗑️
          </button>
        </li>
      ))}
    </ul>
  );
}
