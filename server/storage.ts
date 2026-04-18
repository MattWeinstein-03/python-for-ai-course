import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { eq, and } from "drizzle-orm";
import { users, progress, sessions, type User, type InsertUser, type Progress, type InsertProgress } from "@shared/schema";

const sqlite = new Database("course.db");
export const db = drizzle(sqlite);

// ── MIGRATE ──────────────────────────────────────────────────────
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    is_pro INTEGER NOT NULL DEFAULT 0,
    created_at INTEGER DEFAULT (unixepoch())
  )
`);
// Add is_pro column to existing DBs (safe if already exists)
try { db.run(`ALTER TABLE users ADD COLUMN is_pro INTEGER NOT NULL DEFAULT 0`); } catch {}
db.run(`
  CREATE TABLE IF NOT EXISTS progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id),
    lesson_index INTEGER NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0,
    exercises_done TEXT NOT NULL DEFAULT '[]',
    last_visited INTEGER DEFAULT (unixepoch()),
    UNIQUE(user_id, lesson_index)
  )
`);
db.run(`
  CREATE TABLE IF NOT EXISTS sessions (
    sid TEXT PRIMARY KEY,
    sess TEXT NOT NULL,
    expire INTEGER NOT NULL
  )
`);

export interface IStorage {
  // Users
  getUserById(id: number): User | undefined;
  getUserByEmail(email: string): User | undefined;
  createUser(data: InsertUser): User;
  grantPro(userId: number): void;

  // Progress
  getUserProgress(userId: number): Progress[];
  getLessonProgress(userId: number, lessonIndex: number): Progress | undefined;
  upsertProgress(userId: number, lessonIndex: number, completed: boolean, exercisesDone: number[]): Progress;
  resetProgress(userId: number): void;
}

export const storage: IStorage = {
  getUserById(id) {
    return db.select().from(users).where(eq(users.id, id)).get();
  },

  getUserByEmail(email) {
    return db.select().from(users).where(eq(users.email, email)).get();
  },

  createUser(data) {
    return db.insert(users).values(data).returning().get();
  },

  grantPro(userId) {
    db.update(users).set({ isPro: true }).where(eq(users.id, userId)).run();
  },

  getUserProgress(userId) {
    return db.select().from(progress).where(eq(progress.userId, userId)).all();
  },

  getLessonProgress(userId, lessonIndex) {
    return db.select().from(progress)
      .where(and(eq(progress.userId, userId), eq(progress.lessonIndex, lessonIndex)))
      .get();
  },

  upsertProgress(userId, lessonIndex, completed, exercisesDone) {
    const existing = db.select().from(progress)
      .where(and(eq(progress.userId, userId), eq(progress.lessonIndex, lessonIndex)))
      .get();

    const exercisesJson = JSON.stringify(exercisesDone);
    const now = new Date();

    if (existing) {
      return db.update(progress)
        .set({ completed, exercisesDone: exercisesJson, lastVisited: now })
        .where(and(eq(progress.userId, userId), eq(progress.lessonIndex, lessonIndex)))
        .returning().get();
    } else {
      return db.insert(progress)
        .values({ userId, lessonIndex, completed, exercisesDone: exercisesJson, lastVisited: now })
        .returning().get();
    }
  },

  resetProgress(userId) {
    db.delete(progress).where(eq(progress.userId, userId)).run();
  },
};
