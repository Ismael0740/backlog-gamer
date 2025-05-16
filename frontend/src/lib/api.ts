import { invoke } from "@tauri-apps/api/core";

export type Game = {
  id: number;
  title: string;
  platform: string;
  started_on?: string | null;
  finished_on?: string | null;
};

export const addGame = (title: string, platform = "PC") =>
  invoke("add_game", { title, platform });

export const listGames = () =>
  invoke<Game[]>("list_games");

export const deleteGame = (id: number) =>
  invoke("delete_game", { id });
