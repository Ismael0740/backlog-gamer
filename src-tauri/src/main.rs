mod db;

use db::{Game, fetch_games};
use sqlx::{SqlitePool};
use tauri::Manager;
use std::path::PathBuf;

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
  let exe_path = std::env::current_exe().unwrap(); // ruta al binario
  let project_dir = exe_path
    .parent().unwrap()   // debug/
    .parent().unwrap()   // target/
    .parent().unwrap()   // src-tauri/
    .parent().unwrap();  // ✅ backlog-gamer/
  let db_path: PathBuf = project_dir.join("data").join("backlog.db");

  tauri::Builder::default()
      .setup(move |app| {
          let db_path = db_path.clone();
          tauri::async_runtime::block_on(async move {
              let db_path_str = db_path.to_str().unwrap();
              let pool = crate::db::init(db_path_str).await;
              app.manage(pool);
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

