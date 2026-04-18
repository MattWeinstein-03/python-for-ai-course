import { useEffect, useRef, useState, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Play,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  Loader2,
  Terminal,
  BookOpen,
} from "lucide-react";

// ── CodeMirror global type ────────────────────────────────────────
declare global {
  interface Window {
    CodeMirror: any;
    loadPyodide: (opts?: any) => Promise<any>;
    pyodideInstance: any;
  }
}

interface Exercise {
  title: string;
  task: string;
  code: string;
}

interface Lesson {
  title: string;
  sub?: string;
  content: string;
  exercises: Exercise[];
}

interface LessonProgress {
  lessonIndex: number;
  completed: boolean;
  exercisesDone: number[];
  lastVisited: number | null;
}

interface Props {
  lesson: Lesson;
  lessonIndex: number;
  progress?: LessonProgress;
  onSaveProgress: (lessonIndex: number, completed: boolean, exercisesDone: number[]) => void;
  onNext?: () => void;
}

// ── Pyodide singleton loader ──────────────────────────────────────
let pyodidePromise: Promise<any> | null = null;

function ensurePyodide(): Promise<any> {
  if (window.pyodideInstance) return Promise.resolve(window.pyodideInstance);
  if (pyodidePromise) return pyodidePromise;

  pyodidePromise = (async () => {
    if (!window.loadPyodide) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.js";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load Pyodide"));
        document.head.appendChild(script);
      });
    }
    const py = await window.loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.0/full/",
    });
    await py.loadPackage("numpy");
    window.pyodideInstance = py;
    return py;
  })();

  return pyodidePromise;
}

// ── CodeMirror editor component ───────────────────────────────────
function CodeEditor({
  initialCode,
  editorRef,
}: {
  initialCode: string;
  editorRef: React.MutableRefObject<any>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !window.CodeMirror) return;

    // Clean up old instance
    if (editorRef.current) {
      editorRef.current.toTextArea();
      editorRef.current = null;
    }

    const textarea = document.createElement("textarea");
    textarea.value = initialCode;
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(textarea);

    const cm = window.CodeMirror.fromTextArea(textarea, {
      mode: "python",
      theme: "dracula",
      lineNumbers: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      styleActiveLine: true,
      indentUnit: 4,
      tabSize: 4,
      indentWithTabs: false,
      lineWrapping: false,
      viewportMargin: Infinity,
      extraKeys: {
        Tab: (cm: any) => cm.execCommand("indentMore"),
        "Shift-Tab": (cm: any) => cm.execCommand("indentLess"),
      },
    });

    editorRef.current = cm;
    setTimeout(() => cm.refresh(), 50);

    return () => {
      if (editorRef.current) {
        editorRef.current.toTextArea();
        editorRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCode]);

  return <div ref={containerRef} className="code-editor-container" style={{ minHeight: 120 }} />;
}

// ── Exercise panel ────────────────────────────────────────────────
function ExercisePanel({
  exercise,
  exerciseIdx,
  isDone,
  onComplete,
}: {
  exercise: Exercise;
  exerciseIdx: number;
  isDone: boolean;
  onComplete: (idx: number) => void;
}) {
  const editorRef = useRef<any>(null);
  const [output, setOutput] = useState<string>("");
  const [running, setRunning] = useState(false);
  const [pyStatus, setPyStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");

  // Pre-warm Pyodide
  useEffect(() => {
    setPyStatus("loading");
    ensurePyodide()
      .then(() => setPyStatus("ready"))
      .catch(() => setPyStatus("error"));
  }, []);

  const runCode = async () => {
    if (!editorRef.current) return;
    setRunning(true);
    setOutput("");
    try {
      const py = await ensurePyodide();
      const code = editorRef.current.getValue();

      // Capture stdout
      py.runPython(`
import sys, io
_buf = io.StringIO()
sys.stdout = _buf
`);

      let result = "";
      try {
        const val = py.runPython(code);
        const captured: string = py.runPython("_buf.getvalue()");
        result = captured;
        if (val !== undefined && val !== null && String(val) !== "None") {
          result += (result ? "\n" : "") + String(val);
        }
      } catch (err: any) {
        result = `❌ Error:\n${err.message}`;
      }

      py.runPython("sys.stdout = sys.__stdout__");
      setOutput(result.trim() || "(no output)");
    } catch (err: any) {
      setOutput(`❌ Pyodide error:\n${err.message}`);
    } finally {
      setRunning(false);
    }
  };

  const resetCode = () => {
    if (editorRef.current) {
      editorRef.current.setValue(exercise.code);
    }
    setOutput("");
  };

  return (
    <div
      data-testid={`exercise-panel-${exerciseIdx}`}
      className={`rounded-lg border overflow-hidden ${
        isDone
          ? "border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/5"
          : "border-border bg-card"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/50">
        {isDone ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
        ) : (
          <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
        )}
        <span className="font-semibold text-sm text-foreground">
          Exercise {exerciseIdx + 1}: {exercise.title}
        </span>
        {isDone && (
          <Badge className="ml-auto text-xs bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-0 py-0 px-2">
            Done
          </Badge>
        )}
      </div>

      {/* Prompt */}
      <div
        className="px-4 py-3 bg-muted/30 text-sm text-foreground/80 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: exercise.task }}
      />

      {/* Code editor */}
      <div className="relative">
        {pyStatus === "loading" && (
          <div className="absolute inset-0 bg-[#282a36]/90 flex items-center justify-center z-10 gap-2 text-sm text-white rounded">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading Python runtime...
          </div>
        )}
        {pyStatus === "error" && (
          <div className="absolute inset-0 bg-destructive/10 flex items-center justify-center z-10 text-sm text-destructive">
            Failed to load Pyodide — check your connection.
          </div>
        )}
        <CodeEditor
          initialCode={exercise.code}
          editorRef={editorRef}
        />
      </div>

      {/* Output */}
      {output && (
        <div className="border-t border-border/50">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 border-b border-border/30">
            <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-medium">Output</span>
          </div>
          <pre
            data-testid={`output-${exerciseIdx}`}
            className="px-4 py-3 text-sm font-mono overflow-x-auto bg-[#1a1a2e] text-green-300 whitespace-pre-wrap max-h-48"
          >
            {output}
          </pre>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-t border-border/50 flex-wrap">
        <Button
          size="sm"
          onClick={runCode}
          disabled={running || pyStatus === "loading" || pyStatus === "error"}
          className="gap-1.5 h-8"
          data-testid={`button-run-${exerciseIdx}`}
        >
          {running ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              Run
            </>
          )}
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={resetCode}
          className="gap-1.5 h-8"
          data-testid={`button-reset-${exerciseIdx}`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </Button>

        {!isDone && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onComplete(exerciseIdx)}
            className="gap-1.5 h-8 ml-auto border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
            data-testid={`button-mark-done-${exerciseIdx}`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Mark done
          </Button>
        )}
      </div>
    </div>
  );
}

// ── Main LessonViewer ─────────────────────────────────────────────
export default function LessonViewer({
  lesson,
  lessonIndex,
  progress,
  onSaveProgress,
  onNext,
}: Props) {
  const exercisesDone: number[] = progress?.exercisesDone ?? [];
  const isCompleted = progress?.completed ?? false;

  const handleExerciseComplete = useCallback(
    (exerciseIdx: number) => {
      const newDone = exercisesDone.includes(exerciseIdx)
        ? exercisesDone
        : [...exercisesDone, exerciseIdx];
      const allDone = newDone.length === lesson.exercises.length;
      onSaveProgress(lessonIndex, allDone, newDone);
    },
    [exercisesDone, lesson.exercises.length, lessonIndex, onSaveProgress]
  );

  const markLessonComplete = () => {
    onSaveProgress(lessonIndex, true, exercisesDone);
  };

  const exercisePct =
    lesson.exercises.length > 0
      ? Math.round((exercisesDone.length / lesson.exercises.length) * 100)
      : 0;

  return (
    <ScrollArea className="flex-1 h-full">
      <div className="max-w-3xl mx-auto px-6 py-8 pb-16">
        {/* Lesson header */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h1
              data-testid="lesson-title"
              className="text-xl font-bold text-foreground leading-tight"
            >
              {lesson.title}
            </h1>
            {isCompleted && (
              <Badge className="flex-shrink-0 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-0">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                Completed
              </Badge>
            )}
          </div>

          {lesson.sub && (
            <p className="text-sm text-muted-foreground mb-3">{lesson.sub}</p>
          )}

          {lesson.exercises.length > 0 && (
            <div className="flex items-center gap-2">
              <Progress value={exercisePct} className="h-1.5 flex-1 max-w-48" />
              <span className="text-xs text-muted-foreground">
                {exercisesDone.length}/{lesson.exercises.length} exercises
              </span>
            </div>
          )}
        </div>

        {/* Lesson content */}
        <div
          data-testid="lesson-content"
          className="lesson-content mb-10"
          dangerouslySetInnerHTML={{ __html: lesson.content }}
        />

        {/* Exercises */}
        {lesson.exercises.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px flex-1 bg-border" />
              <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <BookOpen className="w-4 h-4 text-primary" />
                Exercises ({lesson.exercises.length})
              </div>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="space-y-6">
              {lesson.exercises.map((exercise, idx) => (
                <ExercisePanel
                  key={`${lessonIndex}-${idx}`}
                  exercise={exercise}
                  exerciseIdx={idx}
                  isDone={exercisesDone.includes(idx)}
                  onComplete={handleExerciseComplete}
                />
              ))}
            </div>
          </div>
        )}

        {/* Bottom actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-border">
          {!isCompleted ? (
            <Button
              onClick={markLessonComplete}
              className="gap-2"
              data-testid="button-complete-lesson"
            >
              <CheckCircle2 className="w-4 h-4" />
              Mark lesson complete
            </Button>
          ) : (
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Lesson complete
            </div>
          )}

          {onNext && (
            <Button
              variant={isCompleted ? "default" : "outline"}
              onClick={onNext}
              className="gap-2 ml-auto"
              data-testid="button-next-lesson-bottom"
            >
              Next lesson
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </ScrollArea>
  );
}
