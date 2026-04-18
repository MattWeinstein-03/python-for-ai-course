import { useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth, ThemeContext } from "@/App";
import { apiRequest } from "@/lib/queryClient";
import { LESSONS as lessons, TRACKS } from "@/lib/lessons";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
  Lock,
  Sparkles,
  Zap,
} from "lucide-react";
import LessonViewer from "@/components/LessonViewer";

const FREE_LESSON_LIMIT = 3; // lessons 0–2 are free

// ── Types ──────────────────────────────────────────────────────────
interface LessonProgress {
  lessonIndex: number;
  completed: boolean;
  exercisesDone: number[];
  lastVisited: number | null;
}

// ── Track color map ────────────────────────────────────────────────
const TRACK_COLORS: Record<string, string> = {
  Beginner: "bg-emerald-500",
  Intermediate: "bg-amber-500",
  Advanced: "bg-violet-500",
};
const TRACK_TEXT: Record<string, string> = {
  Beginner: "text-emerald-600 dark:text-emerald-400",
  Intermediate: "text-amber-600 dark:text-amber-400",
  Advanced: "text-violet-600 dark:text-violet-400",
};

function getTrackForLesson(idx: number) {
  return TRACKS.find((t) => idx >= t.range[0] && idx <= t.range[1])?.label ?? "Beginner";
}

// ── Paywall Modal ─────────────────────────────────────────────────
function PaywallModal({
  onClose,
  onUpgrade,
  upgrading,
}: {
  onClose: () => void;
  onUpgrade: () => void;
  upgrading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-card border border-border rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Gradient header */}
        <div className="bg-gradient-to-br from-violet-600 to-purple-700 px-8 pt-8 pb-6 text-center">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">Unlock Full Course</h2>
          <p className="text-white/80 text-sm">You've finished the free lessons. Upgrade to continue.</p>
        </div>

        {/* Features */}
        <div className="px-8 py-6 space-y-3">
          {[
            "All 25 lessons — Beginner to Advanced",
            "22 interactive coding exercises with Pyodide",
            "Neural networks, NLP, CV & reinforcement learning",
            "Progress saved automatically across sessions",
          ].map((f) => (
            <div key={f} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-violet-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-foreground/80">{f}</span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="px-8 pb-6 space-y-3">
          <div className="rounded-xl border border-violet-500/30 bg-violet-500/5 p-4 text-center">
            <div className="text-3xl font-bold text-foreground mb-0.5">$29</div>
            <div className="text-sm text-muted-foreground">One-time · Lifetime access</div>
          </div>

          <Button
            className="w-full gap-2 bg-violet-600 hover:bg-violet-700 text-white h-11"
            onClick={onUpgrade}
            disabled={upgrading}
            data-testid="button-upgrade"
          >
            <Zap className="w-4 h-4" />
            {upgrading ? "Processing..." : "Unlock full course — $29"}
          </Button>

          <button
            onClick={onClose}
            className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
            data-testid="button-paywall-close"
          >
            Back to free lessons
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main CoursePage ───────────────────────────────────────────────
export default function CoursePage() {
  const { user, logout } = useAuth();
  const { dark, toggle: toggleTheme } = useContext(ThemeContext);
  const { toast } = useToast();
  const qc = useQueryClient();
  const [activeLesson, setActiveLesson] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showPaywall, setShowPaywall] = useState(false);

  const isPro = user?.isPro ?? false;

  // ── Progress query ────────────────────────────────────────────
  const { data: progressData = [] } = useQuery<LessonProgress[]>({
    queryKey: ["/api/progress"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/progress");
      if (!res.ok) return [];
      return res.json();
    },
  });

  const progressMap = new Map<number, LessonProgress>(
    progressData.map((p) => [p.lessonIndex, p])
  );

  // ── Save progress mutation ─────────────────────────────────────
  const saveMutation = useMutation({
    mutationFn: async ({
      lessonIndex,
      completed,
      exercisesDone,
    }: {
      lessonIndex: number;
      completed: boolean;
      exercisesDone: number[];
    }) => {
      const res = await apiRequest("POST", `/api/progress/${lessonIndex}`, {
        completed,
        exercisesDone,
      });
      if (!res.ok) throw new Error("Failed to save");
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/progress"] });
    },
    onError: () => {
      toast({ title: "Could not save progress", variant: "destructive" });
    },
  });

  // ── Upgrade mutation ──────────────────────────────────────────
  const upgradeMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/billing/upgrade");
      if (!res.ok) throw new Error("Upgrade failed");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Welcome to Pro!", description: "You now have full course access." });
      setShowPaywall(false);
      // Reload the page to refresh user state (isPro)
      window.location.reload();
    },
    onError: () => {
      toast({ title: "Upgrade failed", variant: "destructive" });
    },
  });

  const saveProgress = (lessonIndex: number, completed: boolean, exercisesDone: number[]) => {
    saveMutation.mutate({ lessonIndex, completed, exercisesDone });
  };

  // ── Lesson selection with paywall gate ────────────────────────
  const selectLesson = (idx: number) => {
    if (!isPro && idx >= FREE_LESSON_LIMIT) {
      setShowPaywall(true);
      return;
    }
    setActiveLesson(idx);
  };

  // ── Stats ─────────────────────────────────────────────────────
  const completedCount = progressData.filter((p) => p.completed).length;
  const overallPct = Math.round((completedCount / lessons.length) * 100);

  const handleLogout = async () => {
    await logout();
    toast({ title: "Signed out" });
  };

  const lesson = lessons[activeLesson];
  const currentProgress = progressMap.get(activeLesson);
  const track = getTrackForLesson(activeLesson);

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {showPaywall && (
        <PaywallModal
          onClose={() => setShowPaywall(false)}
          onUpgrade={() => upgradeMutation.mutate()}
          upgrading={upgradeMutation.isPending}
        />
      )}

      {/* ── Sidebar ─────────────────────────────────────────────── */}
      <aside
        data-testid="sidebar"
        className={`
          flex flex-col border-r border-border bg-card
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? "w-72" : "w-0 overflow-hidden"}
          flex-shrink-0
        `}
      >
        {/* Sidebar header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
          <svg viewBox="0 0 28 28" className="w-7 h-7 flex-shrink-0" aria-label="PyAI">
            <rect width="28" height="28" rx="5" fill="hsl(252 80% 57%)" />
            <text x="14" y="19" textAnchor="middle" fontSize="11" fill="white" fontFamily="JetBrains Mono, monospace" fontWeight="700">Py</text>
          </svg>
          <span className="font-semibold text-sm text-foreground truncate">Python for AI</span>
          {isPro && (
            <Badge className="ml-auto text-xs bg-violet-500/20 text-violet-600 dark:text-violet-400 border-0 py-0 px-1.5 flex-shrink-0">
              Pro
            </Badge>
          )}
        </div>

        {/* User + overall progress */}
        <div className="px-4 py-3 border-b border-border space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-primary">
                {user?.username?.[0]?.toUpperCase() ?? "?"}
              </span>
            </div>
            <span className="text-xs font-medium text-foreground truncate">{user?.username}</span>
            <Badge variant="secondary" className="ml-auto text-xs py-0 px-1.5 flex-shrink-0">
              {completedCount}/{lessons.length}
            </Badge>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Overall progress</span>
              <span>{overallPct}%</span>
            </div>
            <Progress value={overallPct} className="h-1.5" />
          </div>
        </div>

        {/* Lesson list */}
        <ScrollArea className="flex-1">
          <div className="py-2">
            {TRACKS.map((track) => {
              const trackLessons = lessons.slice(track.range[0], track.range[1] + 1);
              const trackCompleted = trackLessons.filter((_, i) =>
                progressMap.get(track.range[0] + i)?.completed
              ).length;

              return (
                <div key={track.label} className="mb-1">
                  {/* Track header */}
                  <div className="px-4 py-2 flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${TRACK_COLORS[track.label]}`} />
                    <span className={`text-xs font-semibold uppercase tracking-wider ${TRACK_TEXT[track.label]}`}>
                      {track.label}
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {trackCompleted}/{trackLessons.length}
                    </span>
                  </div>

                  {/* Lessons */}
                  {trackLessons.map((lesson, localIdx) => {
                    const globalIdx = track.range[0] + localIdx;
                    const prog = progressMap.get(globalIdx);
                    const isActive = globalIdx === activeLesson;
                    const isDone = prog?.completed ?? false;
                    const locked = !isPro && globalIdx >= FREE_LESSON_LIMIT;

                    return (
                      <button
                        key={globalIdx}
                        data-testid={`lesson-item-${globalIdx}`}
                        onClick={() => selectLesson(globalIdx)}
                        className={`
                          w-full flex items-center gap-2.5 px-4 py-2 text-left text-sm
                          hover:bg-accent/50 transition-colors
                          ${isActive ? "bg-primary/10 text-primary font-medium" : ""}
                          ${locked ? "opacity-60" : ""}
                          ${!isActive ? (locked ? "text-muted-foreground" : "text-foreground/80") : ""}
                        `}
                      >
                        {locked ? (
                          <Lock className="w-4 h-4 flex-shrink-0 text-muted-foreground/50" />
                        ) : isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        ) : (
                          <Circle className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                        )}
                        <span className="truncate leading-tight">{lesson.title}</span>
                        {globalIdx === FREE_LESSON_LIMIT && !isPro && (
                          <span className="ml-auto text-xs text-violet-500 font-medium flex-shrink-0">Pro</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Upgrade CTA in sidebar for free users */}
          {!isPro && (
            <div className="mx-3 mb-3 rounded-lg bg-gradient-to-br from-violet-600/15 to-purple-600/10 border border-violet-500/20 p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-violet-500" />
                <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">Unlock all 25 lessons</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2.5">3 free lessons included. Upgrade for full access.</p>
              <Button
                size="sm"
                className="w-full h-7 text-xs bg-violet-600 hover:bg-violet-700 text-white"
                onClick={() => setShowPaywall(true)}
                data-testid="button-sidebar-upgrade"
              >
                Upgrade — $29
              </Button>
            </div>
          )}
        </ScrollArea>

        {/* Sidebar footer */}
        <div className="border-t border-border p-3 flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="w-8 h-8"
                data-testid="button-theme-toggle"
              >
                {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{dark ? "Light mode" : "Dark mode"}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="w-8 h-8 ml-auto"
                data-testid="button-logout"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Sign out</TooltipContent>
          </Tooltip>
        </div>
      </aside>

      {/* ── Main content ──────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="flex items-center gap-3 px-4 py-2.5 border-b border-border bg-card/50 backdrop-blur flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen((o) => !o)}
            className="w-8 h-8"
            data-testid="button-toggle-sidebar"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>

          <div className="flex items-center gap-2 min-w-0">
            <Badge
              variant="outline"
              className={`text-xs ${TRACK_TEXT[track]} border-current/30 flex-shrink-0`}
            >
              {track}
            </Badge>
            <span className="text-sm font-medium text-foreground truncate">{lesson?.title}</span>
          </div>

          {/* Nav arrows */}
          <div className="flex items-center gap-1 ml-auto flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              disabled={activeLesson === 0}
              onClick={() => selectLesson(Math.max(0, activeLesson - 1))}
              className="w-8 h-8"
              data-testid="button-prev-lesson"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-xs text-muted-foreground w-12 text-center">
              {activeLesson + 1} / {lessons.length}
            </span>
            <Button
              variant="ghost"
              size="icon"
              disabled={activeLesson === lessons.length - 1}
              onClick={() => selectLesson(Math.min(lessons.length - 1, activeLesson + 1))}
              className="w-8 h-8"
              data-testid="button-next-lesson"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </header>

        {/* Lesson viewer */}
        <LessonViewer
          lesson={lesson}
          lessonIndex={activeLesson}
          progress={currentProgress}
          onSaveProgress={saveProgress}
          onNext={
            activeLesson < lessons.length - 1
              ? () => selectLesson(activeLesson + 1)
              : undefined
          }
        />
      </div>
    </div>
  );
}
