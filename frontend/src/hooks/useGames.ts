import { useEffect, useState } from "react";
import type { Game } from "../lib/api";
import { listGames, deleteGame as del } from "../lib/api";

export const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);

  async function refresh() {
    setGames(await listGames());
  }

  async function remove(id: number) {
    await del(id);
    await refresh();
  }

  useEffect(() => {
    refresh();
  }, []);

  return { games, refresh, remove };
};
