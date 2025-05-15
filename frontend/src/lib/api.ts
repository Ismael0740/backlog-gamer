import { invoke } from '@tauri-apps/api/core';

/** Modelo de juego que devuelve el backend */
export interface Game {
  id: number;
  title: string;
  platform: string;
  started_on?: string | null;
  finished_on?: string | null;
}

/** Añade un juego nuevo */
export async function addGame(title: string, platform = 'PC'): Promise<void> {
  await invoke('add_game', { title, platform });
}

/** Recupera todos los juegos */
export async function listGames(): Promise<Game[]> {
  return invoke<Game[]>('list_games');
}
