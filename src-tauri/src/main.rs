mod db;

use db::{Game, fetch_games};
use sqlx::{SqlitePool};
use tauri::Manager;

#[tauri::command]
async fn add_game(pool: tauri::State<'_, SqlitePool>, title: String, platform: Option<String>) -> Result<(), String> {
    sqlx::query("INSERT INTO games (title, platform) VALUES (?, ?)")
        .bind(title)
        .bind(platform.unwrap_or_else(|| "PC".into()))
        .execute(&*pool)
        .await
        .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
async fn list_games(pool: tauri::State<'_, SqlitePool>) -> Result<Vec<Game>, String> {
    Ok(fetch_games(&*pool).await)
}

#[tauri::command]
async fn delete_game(pool: tauri::State<'_, SqlitePool>, id: i64) -> Result<(), String> {
    sqlx::query("DELETE FROM games WHERE id = ?")
        .bind(id)
        .execute(&*pool)
        .await
        .map_err(|e| e.to_string())?;
    Ok(())
}

fn main() {
  tauri::Builder::default()
      .setup(|app| {
          tauri::async_runtime::block_on(async {
              let pool = crate::db::init("sqlite:backlog.db").await;
              app.manage(pool); // ✅ Ya no se mueve entre hilos
          });
          Ok(())
      })
      .invoke_handler(tauri::generate_handler![
          add_game,
          list_games,
          delete_game
      ])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}

