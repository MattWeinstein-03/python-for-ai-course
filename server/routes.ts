import type { Express } from "express";
import type { Server } from "http";
import session from "express-session";
import SqliteStore from "better-sqlite3-session-store";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import { storage } from "./storage";
import { z } from "zod";

// Owner email always gets full access
const PRO_EMAILS = new Set(["grqn75rzrp@privaterelay.appleid.com"]);
const FREE_LESSON_LIMIT = 3; // lessons 0–2 free, 3+ require pro

// Persistent SQLite-backed session store — survives server restarts
const sessionDb = new Database("sessions.db");
const SqliteSessionStore = SqliteStore(session);

export function registerRoutes(httpServer: Server, app: Express) {
  // ── SESSION ────────────────────────────────────────────────────
  app.use(session({
    secret: "pyai-course-secret-2026",
    resave: false,
    saveUninitialized: false,
    store: new SqliteSessionStore({ client: sessionDb }),
    cookie: { secure: false, httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 },
  }));

  // ── AUTH MIDDLEWARE ────────────────────────────────────────────
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.session.userId) return res.status(401).json({ error: "Not authenticated" });
    next();
  };

  // ── REGISTER ──────────────────────────────────────────────────
  app.post("/api/auth/register", async (req, res) => {
    const schema = z.object({
      email: z.string().email(),
      username: z.string().min(2).max(30),
      password: z.string().min(6),
    });

    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.errors[0].message });

    const { email, username, password } = parsed.data;

    const existing = storage.getUserByEmail(email);
    if (existing) return res.status(409).json({ error: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, 10);
    let user = storage.createUser({ email, username, passwordHash });

    // Auto-grant pro to owner email
    if (PRO_EMAILS.has(email.toLowerCase())) {
      storage.grantPro(user.id);
      user = storage.getUserById(user.id)!;
    }

    (req.session as any).userId = user.id;
    res.json({ id: user.id, email: user.email, username: user.username, isPro: user.isPro });
  });

  // ── LOGIN ─────────────────────────────────────────────────────
  app.post("/api/auth/login", async (req, res) => {
    const schema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Invalid input" });

    const { email, password } = parsed.data;
    let user = storage.getUserByEmail(email);
    if (!user) return res.status(401).json({ error: "Invalid email or password" });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: "Invalid email or password" });

    // Auto-grant pro to owner email on login too
    if (PRO_EMAILS.has(email.toLowerCase()) && !user.isPro) {
      storage.grantPro(user.id);
      user = storage.getUserById(user.id)!;
    }

    (req.session as any).userId = user.id;
    res.json({ id: user.id, email: user.email, username: user.username, isPro: user.isPro });
  });

  // ── LOGOUT ────────────────────────────────────────────────────
  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy(() => res.json({ ok: true }));
  });

  // ── ME ────────────────────────────────────────────────────────
  app.get("/api/auth/me", (req, res) => {
    const userId = (req.session as any).userId;
    if (!userId) return res.status(401).json({ error: "Not authenticated" });
    const user = storage.getUserById(userId);
    if (!user) return res.status(401).json({ error: "User not found" });
    res.json({ id: user.id, email: user.email, username: user.username, isPro: user.isPro });
  });

  // ── UPGRADE (mock — marks user as pro) ──────────────────────────
  app.post("/api/billing/upgrade", requireAuth, (req, res) => {
    const userId = (req.session as any).userId;
    storage.grantPro(userId);
    const user = storage.getUserById(userId);
    res.json({ ok: true, isPro: true, message: "Upgraded to Pro" });
  });

  // ── FREE LESSON LIMIT ──────────────────────────────────────────
  app.get("/api/access/:lessonIndex", requireAuth, (req, res) => {
    const userId = (req.session as any).userId;
    const lessonIndex = parseInt(req.params.lessonIndex);
    const user = storage.getUserById(userId);
    const canAccess = user?.isPro || lessonIndex < FREE_LESSON_LIMIT;
    res.json({ canAccess, isPro: user?.isPro, freeLimit: FREE_LESSON_LIMIT });
  });

  // ── GET ALL PROGRESS ──────────────────────────────────────────
  app.get("/api/progress", requireAuth, (req, res) => {
    const userId = (req.session as any).userId;
    const allProgress = storage.getUserProgress(userId);
    res.json(allProgress.map(p => ({
      lessonIndex: p.lessonIndex,
      completed: p.completed,
      exercisesDone: JSON.parse(p.exercisesDone || "[]"),
      lastVisited: p.lastVisited,
    })));
  });

  // ── SAVE PROGRESS ─────────────────────────────────────────────
  app.post("/api/progress/:lessonIndex", requireAuth, (req, res) => {
    const userId = (req.session as any).userId;
    const lessonIndex = parseInt(req.params.lessonIndex);
    const schema = z.object({
      completed: z.boolean(),
      exercisesDone: z.array(z.number()),
    });

    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Invalid data" });

    const result = storage.upsertProgress(
      userId, lessonIndex,
      parsed.data.completed,
      parsed.data.exercisesDone
    );
    res.json({ ok: true, lessonIndex: result.lessonIndex, completed: result.completed });
  });

  // ── RESET PROGRESS ────────────────────────────────────────────
  app.delete("/api/progress", requireAuth, (req, res) => {
    const userId = (req.session as any).userId;
    storage.resetProgress(userId);
    res.json({ ok: true });
  });
}
