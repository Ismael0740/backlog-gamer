use sqlx::migrate::MigrateDatabase;

use sqlx::{SqlitePool};

pub async fn init(path: &str) -> SqlitePool {
    if !sqlx::Sqlite::database_exists(path).await.unwrap_or(false) {
        sqlx::Sqlite::create_database(path).await.unwrap();
    }

    let pool = SqlitePool::connect(path).await.unwrap();

    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS games (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            platform TEXT DEFAULT 'PC',
            started_on TEXT,
            finished_on TEXT
        );
        "#
    )
    .execute(&pool)
    .await
    .unwrap();

    pool
}

#[derive(serde::Serialize, sqlx::FromRow)]
pub struct Game {
    pub id: i64,
    pub title: String,
    pub platform: String,
    pub started_on: Option<String>,
    pub finished_on: Option<String>,
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


pub async fn fetch_games(pool: &SqlitePool) -> Vec<Game> {
    sqlx::query_as::<_, Game>(
        "SELECT id, title, platform, started_on, finished_on FROM games ORDER BY id DESC"
    )
    .fetch_all(pool)
    .await
    .unwrap()
}


