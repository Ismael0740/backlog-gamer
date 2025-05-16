import type { Game } from "../lib/api";

type Props = {
  games: Game[];
  remove: (id: number) => Promise<void>;
};

export function GameList({ games, remove }: Props) {
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
