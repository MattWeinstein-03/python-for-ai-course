export interface Exercise {
  title: string;
  task: string;
  code: string;
}

export interface Lesson {
  title: string;
  sub: string;
  track: 0 | 1 | 2;
  duration: string;
  tag?: "lab" | "project" | "new";
  content: string; // HTML
  exercises: Exercise[];
}

export const TRACKS = [
  { label: "Beginner", color: "text-green-500", dot: "bg-green-500", badge: "bg-green-500/10 text-green-600 dark:text-green-400", range: [0, 9] as [number,number] },
  { label: "Intermediate", color: "text-amber-500", dot: "bg-amber-500", badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400", range: [10, 19] as [number,number] },
  { label: "Advanced", color: "text-violet-500", dot: "bg-violet-500", badge: "bg-violet-500/10 text-violet-500", range: [20, 24] as [number,number] },
];

export const LESSONS: Lesson[] = [
  // ─── BEGINNER ────────────────────────────────────────────────────
  {
    title: "Python Setup & Your First Program",
    sub: "Environment, Jupyter, Hello World",
    track: 0, duration: "45 min",
    content: `
<h2>Why Python for AI?</h2>
<p>Python dominates AI and machine learning for three reasons: a simple, readable syntax that lets you focus on ideas rather than syntax; a massive ecosystem of libraries (NumPy, PyTorch, Hugging Face); and a huge community producing tutorials, papers, and tools.</p>
<div class="callout info"><span class="callout-icon">💡</span><div><strong>Key Insight</strong><p>Nearly every AI paper, model, and framework ships Python code first. Learning Python is learning the language of AI.</p></div></div>
<h2>Setting Up Your Environment</h2>
<p>For serious AI work, you want <strong>Conda</strong> (manages Python + packages in isolated environments) and <strong>Jupyter Lab</strong> (interactive notebook for experimenting). In this course, Python runs directly in your browser via Pyodide — no setup needed.</p>
<h3>The Python REPL</h3>
<p>Python can run interactively. Type an expression, get a result immediately. This feedback loop is essential for data exploration and debugging.</p>
<h2>Variables and print()</h2>
<p>A variable is a named container for a value. Use <code>print()</code> to output values to the console. Python uses dynamic typing — you don't declare types explicitly.</p>
<div class="callout tip"><span class="callout-icon">✅</span><div><strong>Best Practice</strong><p>Use <code>snake_case</code> for variable names: <code>learning_rate</code>, <code>num_epochs</code>, <code>model_output</code>. This is the Python standard (PEP 8).</p></div></div>`,
    exercises: [
      {
        title: "Hello, AI World",
        task: "Print the message <strong>\"Hello, AI World!\"</strong> using Python's print() function. Then print your name on a second line.",
        code: `# Your first Python program
print("Hello, AI World!")

# Now print your own name below:
`
      },
      {
        title: "Variables & Arithmetic",
        task: "Create variables for <strong>learning_rate = 0.001</strong>, <strong>epochs = 100</strong>, and <strong>batch_size = 32</strong>. Then print each one with a label using an f-string like: <code>f\"Learning rate: {learning_rate}\"</code>",
        code: `# AI training hyperparameters
learning_rate = 0.001
epochs = 100
batch_size = 32

# Print each variable with a label using f-strings:
print(f"Learning rate: {learning_rate}")
# Add the remaining two prints below:
`
      },
      {
        title: "Exploring Types",
        task: "Python has several built-in types. Run this code and study the output. Then add one more variable of type <strong>list</strong> called <code>layers</code> with values <code>[64, 128, 64]</code> and print its type.",
        code: `# Python's core types
x = 42           # int
pi = 3.14159     # float
name = "PyAI"    # str
active = True    # bool

for var in [x, pi, name, active]:
    print(f"{var!r:15} → type: {type(var).__name__}")

# Add your list variable here:
`
      }
    ]
  },
  {
    title: "Variables, Types & Operators",
    sub: "int, float, str, bool, casting, f-strings",
    track: 0, duration: "1 hr",
    content: `
<h2>Python's Type System</h2>
<p>Python is <em>dynamically typed</em> — variables don't have a fixed type, but values do. This flexibility speeds up prototyping but requires careful attention when types interact unexpectedly.</p>
<div class="concept-grid">
  <div class="concept-card"><div class="concept-term">int</div><div class="concept-def">Whole numbers: -3, 0, 42, 1_000_000</div></div>
  <div class="concept-card"><div class="concept-term">float</div><div class="concept-def">Decimals: 3.14, -0.001, 1e-4, float('inf')</div></div>
  <div class="concept-card"><div class="concept-term">str</div><div class="concept-def">Text: "hello", 'world', """multiline"""</div></div>
  <div class="concept-card"><div class="concept-term">bool</div><div class="concept-def">True or False — subclass of int!</div></div>
</div>
<h2>Type Casting</h2>
<p>Convert between types explicitly using <code>int()</code>, <code>float()</code>, <code>str()</code>, <code>bool()</code>. Important: <code>bool(0)</code> is <code>False</code>, but <code>bool(0.0001)</code> is <code>True</code>.</p>
<div class="callout warning"><span class="callout-icon">⚠️</span><div><strong>Watch Out</strong><p>Floating point arithmetic isn't exact: <code>0.1 + 0.2 == 0.30000000000000004</code>. For ML, this rarely matters — but for financial code, use Python's <code>decimal</code> module.</p></div></div>
<h2>F-Strings (Python 3.6+)</h2>
<p>F-strings are the modern way to embed variables in text. The <code>f</code> prefix activates it, and <code>{variable}</code> inserts the value. Use format specs like <code>{value:.4f}</code> for 4 decimal places.</p>`,
    exercises: [
      {
        title: "Type Exploration",
        task: "Explore Python types. Check if <code>True + True == 2</code> (hint: bool is a subclass of int). Then try <code>type(True + 1)</code> and explain the result with a comment.",
        code: `# Type exploration
print(type(42))
print(type(3.14))
print(type("hello"))
print(type(True))

# Is bool a subclass of int?
print(isinstance(True, int))
print(True + True)        # What does this equal?
print(True + 1)           # What type is this?

# Casting
print(int("42"))
print(float("3.14"))
print(str(100))
print(bool(0), bool(1), bool(""), bool("hello"))
`
      },
      {
        title: "Operator Practice",
        task: "Python has special operators beyond +,-,*,/. Figure out what <code>//</code>, <code>%</code>, and <code>**</code> do by experimenting with the code below, then add a comment explaining each.",
        code: `a, b = 17, 5

print(a + b)   # addition
print(a - b)   # subtraction
print(a * b)   # multiplication
print(a / b)   # true division (always float)
print(a // b)  # ??? — try to figure out what this does
print(a % b)   # ??? — what is this?
print(a ** b)  # ??? — what does ** mean?

# These are used constantly in AI/ML:
# batch_idx = sample_num // batch_size
# is_last = sample_num % batch_size == 0
`
      },
      {
        title: "F-String Formatting",
        task: "Format the training metrics below using f-strings. Print accuracy to 2 decimal places with a % sign, and loss to 6 decimal places. The output should look like: <code>Epoch 5/10 | Acc: 94.32% | Loss: 0.012345</code>",
        code: `epoch = 5
total_epochs = 10
accuracy = 94.3247
loss = 0.0123451

# Format and print like: Epoch 5/10 | Acc: 94.32% | Loss: 0.012345
print(f"Epoch {epoch}/{total_epochs} | Acc: {accuracy:.2f}% | Loss: {loss:.6f}")

# Now try: pad epoch to 3 digits using {epoch:03d}
# And: right-align accuracy in a field of 7 chars: {accuracy:7.2f}
`
      }
    ]
  },
  {
    title: "Control Flow & Loops",
    sub: "if/elif/else, for, while, comprehensions",
    track: 0, duration: "1.5 hr",
    content: `
<h2>Decision Making with if/elif/else</h2>
<p>Control flow lets your program make decisions. Python uses indentation (4 spaces) instead of curly braces to define blocks — this is enforced by the language.</p>
<h3>Comparison Operators</h3>
<table class="lesson-table"><thead><tr><th>Operator</th><th>Meaning</th><th>Example</th></tr></thead><tbody>
<tr><td><code>==</code></td><td>Equal to</td><td><code>loss == 0</code></td></tr>
<tr><td><code>!=</code></td><td>Not equal</td><td><code>epoch != 0</code></td></tr>
<tr><td><code>&gt;=</code></td><td>Greater or equal</td><td><code>accuracy &gt;= 0.95</code></td></tr>
<tr><td><code>in</code></td><td>Membership</td><td><code>"relu" in activations</code></td></tr>
<tr><td><code>is</code></td><td>Identity</td><td><code>x is None</code></td></tr>
</tbody></table>
<h2>Loops</h2>
<p>Python's <code>for</code> loop iterates over any iterable — lists, strings, ranges, dictionaries. The <code>range(start, stop, step)</code> function generates number sequences.</p>
<h2>List Comprehensions</h2>
<p>Comprehensions are Python's most distinctive feature. They create lists in a single expression — faster than loops and more readable once you're used to them. Used constantly in data preprocessing.</p>
<div class="callout info"><span class="callout-icon">💡</span><div><strong>AI Usage</strong><p>Comprehensions appear everywhere in ML code: filtering samples, normalizing batches, transforming tokens. Master them early.</p></div></div>`,
    exercises: [
      {
        title: "Training Loop Simulation",
        task: "Simulate 5 training epochs. Each epoch, the loss should decrease by 20% from the previous value. Print each epoch's loss formatted to 4 decimal places. Add an <code>if</code> check to print \"Great progress!\" when loss drops below 0.5.",
        code: `loss = 1.0
epochs = 5

for epoch in range(1, epochs + 1):
    loss = loss * 0.8  # 20% reduction per epoch
    print(f"Epoch {epoch}: loss = {loss:.4f}")
    # Add: print "Great progress!" if loss < 0.5
`
      },
      {
        title: "List Comprehensions",
        task: "Use list comprehensions to: (1) normalize a list of values to 0-1 range (subtract min, divide by range), (2) filter out values below 0.5, (3) square the remaining values.",
        code: `values = [1, 4, 2, 8, 5, 7, 3, 9, 6]

# 1. Normalize to 0-1: (x - min) / (max - min)
min_v, max_v = min(values), max(values)
normalized = [(x - min_v) / (max_v - min_v) for x in values]
print("Normalized:", [round(x, 2) for x in normalized])

# 2. Filter: keep only values >= 0.5
filtered = [x for x in normalized if x >= 0.5]
print("Filtered:", [round(x, 2) for x in filtered])

# 3. Square each remaining value
squared = [x**2 for x in filtered]
print("Squared:", [round(x, 4) for x in squared])
`
      },
      {
        title: "FizzBuzz (AI Interview Classic)",
        task: "Print numbers 1-30. For multiples of 3 print 'Fizz', multiples of 5 print 'Buzz', multiples of both print 'FizzBuzz', otherwise the number. Then solve it using a one-liner list comprehension!",
        code: `# Classic loop version
for n in range(1, 31):
    if n % 15 == 0:
        print("FizzBuzz")
    elif n % 3 == 0:
        print("Fizz")
    elif n % 5 == 0:
        print("Buzz")
    else:
        print(n)

print()

# Comprehension one-liner (fills a list):
result = ["FizzBuzz" if n%15==0 else "Fizz" if n%3==0 else "Buzz" if n%5==0 else str(n) for n in range(1,31)]
print(result)
`
      }
    ]
  },
  {
    title: "Functions & Scope",
    sub: "def, args, kwargs, decorators, closures",
    track: 0, duration: "1.5 hr", tag: "new",
    content: `
<h2>Functions: The Building Blocks</h2>
<p>Functions let you name and reuse blocks of code. Every AI pipeline is built from functions — data loaders, preprocessing transforms, training steps, evaluation metrics. Write small, focused functions.</p>
<h3>Parameters vs Arguments</h3>
<p><strong>Parameters</strong> are the names in the function definition. <strong>Arguments</strong> are the values you pass when calling. Python supports positional args, keyword args, defaults, <code>*args</code> (variable positional), and <code>**kwargs</code> (variable keyword).</p>
<div class="callout info"><span class="callout-icon">💡</span><div><strong>Key Pattern</strong><p>Use keyword-only args (after <code>*</code>) for configuration parameters that should always be named explicitly: <code>def train(model, *, lr=1e-3, epochs=10)</code></p></div></div>
<h2>Decorators</h2>
<p>Decorators wrap a function with extra behavior. The <code>@decorator</code> syntax is syntactic sugar for <code>fn = decorator(fn)</code>. They're used for caching, timing, logging, and in frameworks like FastAPI for routing.</p>
<h2>Lambda Functions</h2>
<p>Anonymous one-line functions. Used with <code>map()</code>, <code>filter()</code>, <code>sorted(key=)</code>. Don't overuse them — if the logic is complex, write a named function.</p>`,
    exercises: [
      {
        title: "Activation Functions",
        task: "Implement three common neural network activation functions as Python functions: <code>relu(x)</code>, <code>sigmoid(x)</code>, and <code>tanh(x)</code>. Test each with values -2, -1, 0, 1, 2.",
        code: `import math

def relu(x):
    """Rectified Linear Unit — max(0, x)"""
    return max(0, x)

def sigmoid(x):
    """Sigmoid — 1 / (1 + e^-x). Outputs 0-1."""
    return 1 / (1 + math.exp(-x))

def tanh(x):
    """Hyperbolic tangent. Outputs -1 to 1."""
    return math.tanh(x)

# Test all three
test_vals = [-2, -1, 0, 1, 2]
print(f"{'x':>6} | {'ReLU':>8} | {'Sigmoid':>8} | {'Tanh':>8}")
print("-" * 42)
for x in test_vals:
    print(f"{x:>6} | {relu(x):>8.4f} | {sigmoid(x):>8.4f} | {tanh(x):>8.4f}")
`
      },
      {
        title: "Args & Kwargs",
        task: "Write a function <code>build_model_config(**kwargs)</code> that accepts any keyword arguments and prints a formatted config. Then write a function <code>scale_values(values, *factors)</code> that multiplies values by each factor.",
        code: `def build_model_config(model_name="MLP", **kwargs):
    """Build and display a model configuration dict."""
    config = {"model": model_name, **kwargs}
    print("Model Configuration:")
    for key, val in config.items():
        print(f"  {key}: {val}")
    return config

build_model_config("ResNet", layers=50, dropout=0.3, lr=0.001, batch_size=64)

print()

def scale_values(values, *factors):
    """Scale values by one or more factors."""
    for factor in factors:
        values = [v * factor for v in values]
        print(f"After ×{factor}: {values}")
    return values

scale_values([1, 2, 3, 4], 2, 0.5, 10)
`
      },
      {
        title: "Decorator: Timer",
        task: "Write a <code>@timer</code> decorator that measures and prints how long a function takes to run. Apply it to a function that simulates a slow computation. Then write a <code>@memoize</code> decorator that caches results.",
        code: `import time
import functools

def timer(fn):
    """Decorator: prints execution time."""
    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = fn(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"[timer] {fn.__name__}() took {elapsed:.4f}s")
        return result
    return wrapper

def memoize(fn):
    """Decorator: caches results by arguments."""
    cache = {}
    @functools.wraps(fn)
    def wrapper(*args):
        if args not in cache:
            cache[args] = fn(*args)
        return cache[args]
    return wrapper

@timer
def slow_sum(n):
    return sum(range(n))

@memoize
def fibonacci(n):
    if n <= 1: return n
    return fibonacci(n-1) + fibonacci(n-2)

print(slow_sum(10_000_000))
print(fibonacci(35))  # Fast because of memoization
`
      }
    ]
  },
  {
    title: "Data Structures",
    sub: "Lists, dicts, sets, tuples, comprehensions",
    track: 0, duration: "1.5 hr",
    content: `
<h2>Python's Core Data Structures</h2>
<p>Choosing the right data structure is a fundamental programming skill. Each has different performance characteristics and use cases.</p>
<table class="lesson-table"><thead><tr><th>Structure</th><th>Ordered</th><th>Mutable</th><th>Duplicates</th><th>Use in AI</th></tr></thead><tbody>
<tr><td><code>list</code></td><td>✓</td><td>✓</td><td>✓</td><td>Batch samples, epoch losses</td></tr>
<tr><td><code>tuple</code></td><td>✓</td><td>✗</td><td>✓</td><td>Model input shapes, coordinates</td></tr>
<tr><td><code>dict</code></td><td>✓ (3.7+)</td><td>✓</td><td>keys: ✗</td><td>Config, feature maps, metrics</td></tr>
<tr><td><code>set</code></td><td>✗</td><td>✓</td><td>✗</td><td>Vocabulary, unique labels</td></tr>
</tbody></table>
<h2>Slicing</h2>
<p>List slicing <code>lst[start:stop:step]</code> extracts sub-sequences. The <code>step=-1</code> reversal trick (<code>lst[::-1]</code>) is used constantly. NumPy arrays support the same syntax.</p>
<h2>Dict Methods</h2>
<p><code>.get(key, default)</code> safely retrieves without raising KeyError. <code>.items()</code>, <code>.keys()</code>, <code>.values()</code> for iteration. <code>defaultdict</code> and <code>Counter</code> from <code>collections</code> are essential tools.</p>`,
    exercises: [
      {
        title: "List Slicing Mastery",
        task: "Practice list slicing — it's essential for working with NumPy arrays. Extract the first 3 items, the last 3 items, every other item, and reverse the list using slice notation only (no functions).",
        code: `data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

print("First 3:", data[:3])
print("Last 3:", data[-3:])
print("Every other:", data[::2])
print("Reversed:", data[::-1])
print("Middle 4:", data[3:7])

# Training data splits using slicing:
split = int(len(data) * 0.8)
train = data[:split]
test = data[split:]
print(f"\nTrain ({len(train)} samples):", train)
print(f"Test  ({len(test)} samples):", test)
`
      },
      {
        title: "Dicts as Feature Maps",
        task: "Build a dictionary to track model metrics across epochs. Use a dict comprehension to create it, then update it and find the best epoch by minimum loss.",
        code: `import random
random.seed(42)

# Simulate 10 epochs of training metrics
metrics = {
    epoch: {
        "loss": round(1.0 * (0.75 ** epoch) + random.uniform(-0.02, 0.02), 4),
        "accuracy": round(1 - (0.75 ** epoch) * 0.9, 4)
    }
    for epoch in range(1, 11)
}

# Print all epochs
print(f"{'Epoch':>6} | {'Loss':>8} | {'Accuracy':>10}")
print("-" * 32)
for ep, m in metrics.items():
    print(f"{ep:>6} | {m['loss']:>8.4f} | {m['accuracy']:>10.4f}")

# Find best epoch (lowest loss)
best_epoch = min(metrics, key=lambda e: metrics[e]['loss'])
print(f"\nBest epoch: {best_epoch} (loss={metrics[best_epoch]['loss']})")
`
      },
      {
        title: "Word Frequency Counter",
        task: "Count word frequencies in a text — the core of many NLP preprocessing pipelines. Use a dict to count, then find the top 5 most frequent words.",
        code: `from collections import Counter

text = """python is great for machine learning machine learning with python
is very popular neural networks are powerful python neural networks
learn python learn machine learning today"""

# Method 1: Manual dict counting
word_counts = {}
for word in text.split():
    word_counts[word] = word_counts.get(word, 0) + 1

print("Manual counting:")
for word, count in sorted(word_counts.items(), key=lambda x: -x[1])[:5]:
    print(f"  {word}: {count}")

# Method 2: Counter (the Pythonic way)
counter = Counter(text.split())
print("\nTop 5 words (Counter):")
for word, count in counter.most_common(5):
    print(f"  {word}: {count}")

# Unique words (vocabulary)
vocab = set(text.split())
print(f"\nVocab size: {len(vocab)} unique words")
`
      }
    ]
  },
  {
    title: "OOP — Classes & Objects",
    sub: "Classes, inheritance, dunder methods, properties",
    track: 0, duration: "2 hr",
    content: `
<h2>Why OOP Matters for AI</h2>
<p>Almost every PyTorch model is a Python class. <code>nn.Module</code>, <code>Dataset</code>, <code>DataLoader</code> — you'll subclass these constantly. Understanding classes deeply means you can read and write PyTorch code fluently.</p>
<h2>Class Anatomy</h2>
<p><code>__init__</code> is the constructor — called when you create an instance. <code>self</code> refers to the instance itself. Instance variables are stored on <code>self</code>; class variables are shared across all instances.</p>
<div class="callout info"><span class="callout-icon">💡</span><div><strong>Dunder Methods</strong><p>Methods with double underscores (<code>__repr__</code>, <code>__len__</code>, <code>__getitem__</code>) let objects behave like built-in types. PyTorch Datasets <em>require</em> <code>__len__</code> and <code>__getitem__</code>.</p></div></div>
<h2>Inheritance</h2>
<p>Child classes inherit all methods from the parent and can override them. Use <code>super()</code> to call the parent's version. This is exactly how you build PyTorch models — inherit from <code>nn.Module</code>, call <code>super().__init__()</code>, then define your layers.</p>`,
    exercises: [
      {
        title: "Build a Dataset Class",
        task: "Implement a <code>SimpleDataset</code> class that mimics PyTorch's Dataset interface. It needs <code>__len__</code> and <code>__getitem__</code>. Store a list of (feature, label) tuples and add a <code>shuffle()</code> method.",
        code: `import random

class SimpleDataset:
    """A dataset class mimicking PyTorch's Dataset interface."""

    def __init__(self, features, labels):
        assert len(features) == len(labels), "Features and labels must match"
        self.data = list(zip(features, labels))

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        return self.data[idx]

    def __repr__(self):
        return f"SimpleDataset(size={len(self)})"

    def shuffle(self):
        random.shuffle(self.data)
        return self

    def batch(self, batch_size):
        """Yield batches of (features, labels)."""
        for i in range(0, len(self), batch_size):
            batch = self.data[i:i+batch_size]
            feats = [x[0] for x in batch]
            lbls = [x[1] for x in batch]
            yield feats, lbls

# Create dataset
features = [[i, i*2] for i in range(10)]
labels = [i % 2 for i in range(10)]
ds = SimpleDataset(features, labels)

print(ds)
print(f"Length: {len(ds)}")
print(f"Item 0: {ds[0]}")

print("\nBatches (size=3):")
for i, (X, y) in enumerate(ds.batch(3)):
    print(f"  Batch {i}: X={X}, y={y}")
`
      },
      {
        title: "Inheritance: Model Hierarchy",
        task: "Build a base <code>BaseModel</code> class with <code>predict()</code> and <code>evaluate()</code> methods, then create <code>LinearModel</code> and <code>RandomModel</code> that inherit from it. Show polymorphism in action.",
        code: `import random
import math

class BaseModel:
    """Abstract base for all models."""
    def __init__(self, name):
        self.name = name
        self.is_trained = False

    def train(self, X, y):
        raise NotImplementedError("Subclasses must implement train()")

    def predict(self, X):
        raise NotImplementedError("Subclasses must implement predict()")

    def evaluate(self, X, y):
        preds = self.predict(X)
        correct = sum(p == t for p, t in zip(preds, y))
        accuracy = correct / len(y)
        print(f"[{self.name}] Accuracy: {accuracy:.2%} ({correct}/{len(y)})")
        return accuracy

    def __repr__(self):
        status = "trained" if self.is_trained else "untrained"
        return f"{self.name}({status})"


class RandomModel(BaseModel):
    def __init__(self, classes):
        super().__init__("RandomBaseline")
        self.classes = classes

    def train(self, X, y):
        self.is_trained = True

    def predict(self, X):
        return [random.choice(self.classes) for _ in X]


# Demo
X = list(range(20))
y = [x % 2 for x in X]  # binary: even=0, odd=1

rand_model = RandomModel([0, 1])
rand_model.train(X, y)
rand_model.evaluate(X, y)
print(rand_model)
`
      }
    ]
  },
  {
    title: "File I/O & Error Handling",
    sub: "open(), JSON, CSV, try/except, context managers",
    track: 0, duration: "1 hr",
    content: `
<h2>Reading & Writing Files</h2>
<p>Real AI projects constantly load and save data — datasets as CSV, model configs as JSON, checkpoints as binary. Python's <code>with open()</code> pattern (context manager) ensures files are always properly closed.</p>
<div class="callout tip"><span class="callout-icon">✅</span><div><strong>Always use context managers</strong><p>Use <code>with open(path) as f:</code> — never open files without a <code>with</code> block. It guarantees the file closes even if an exception occurs.</p></div></div>
<h2>JSON — The Config Standard</h2>
<p>JSON is the universal format for model configs, API responses, and metadata. Python's <code>json</code> module serializes Python dicts/lists to JSON strings and back with <code>json.dumps()</code> and <code>json.loads()</code>.</p>
<h2>Exception Handling</h2>
<p>Errors in Python are exceptions — objects raised when something goes wrong. Use <code>try/except/finally</code> to handle them gracefully. Production ML code must handle missing files, corrupted data, and network failures without crashing.</p>`,
    exercises: [
      {
        title: "JSON Config Manager",
        task: "Build a <code>ConfigManager</code> that saves and loads model hyperparameters as JSON. Add a <code>merge()</code> method that updates config with new values and a <code>validate()</code> method that checks required keys exist.",
        code: `import json
import math

class ConfigManager:
    REQUIRED_KEYS = ["model_name", "learning_rate", "epochs", "batch_size"]

    def __init__(self, config=None):
        self.config = config or {}

    def save(self, path):
        # In browser we can't write files, so we'll print the JSON
        json_str = json.dumps(self.config, indent=2)
        print(f"Config (would save to {path}):")
        print(json_str)
        return json_str

    @classmethod
    def from_dict(cls, d):
        return cls(d)

    def merge(self, updates):
        self.config = {**self.config, **updates}
        return self

    def validate(self):
        missing = [k for k in self.REQUIRED_KEYS if k not in self.config]
        if missing:
            raise ValueError(f"Missing required keys: {missing}")
        if not (0 < self.config.get("learning_rate", 0) < 1):
            raise ValueError("learning_rate must be between 0 and 1")
        return True

    def __repr__(self):
        return f"ConfigManager({self.config})"

# Test it
cfg = ConfigManager.from_dict({
    "model_name": "GPT-mini",
    "learning_rate": 0.001,
    "epochs": 50,
    "batch_size": 32,
    "hidden_dim": 256
})

cfg.save("model_config.json")

# Merge new values
cfg.merge({"learning_rate": 0.0005, "epochs": 100})
print("\nAfter merge:", cfg.config["learning_rate"], cfg.config["epochs"])

# Validate
try:
    cfg.validate()
    print("Config is valid ✓")
except ValueError as e:
    print(f"Validation error: {e}")
`
      },
      {
        title: "Robust Data Loading",
        task: "Write a function that loads a list of numbers from a string (simulating a file), handles errors gracefully, and computes statistics. It should skip invalid entries and report how many were skipped.",
        code: `def parse_data(raw_text):
    """Parse numbers from text, handling errors gracefully."""
    values = []
    errors = 0

    for line_num, line in enumerate(raw_text.strip().split('\n'), 1):
        line = line.strip()
        if not line or line.startswith('#'):
            continue
        try:
            value = float(line)
            if not (-1e6 <= value <= 1e6):
                raise ValueError(f"Value out of range: {value}")
            values.append(value)
        except ValueError as e:
            print(f"Line {line_num}: skipping '{line}' ({e})")
            errors += 1

    return values, errors

def compute_stats(values):
    if not values:
        return {}
    n = len(values)
    mean = sum(values) / n
    variance = sum((x - mean)**2 for x in values) / n
    import math
    return {
        "count": n,
        "mean": round(mean, 4),
        "std": round(math.sqrt(variance), 4),
        "min": min(values),
        "max": max(values),
    }

# Simulate a file with some bad data
raw = """
# Training losses
0.9823
0.7645
bad_value
0.5432
NaN_entry
0.4123
9999999999
0.3210
0.2456
"""

values, errors = parse_data(raw)
print(f"\nLoaded {len(values)} values, skipped {errors} errors")
stats = compute_stats(values)
for k, v in stats.items():
    print(f"  {k}: {v}")
`
      }
    ]
  },
  {
    title: "NumPy Essentials",
    sub: "Arrays, broadcasting, linear algebra, indexing",
    track: 0, duration: "2 hr", tag: "lab",
    content: `
<h2>NumPy: The Foundation of AI</h2>
<p>NumPy provides the N-dimensional array (<code>ndarray</code>) — the data structure that powers every AI library. PyTorch tensors, Pandas DataFrames, and scikit-learn estimators all build on or interoperate with NumPy.</p>
<div class="concept-grid">
  <div class="concept-card"><div class="concept-term">ndarray</div><div class="concept-def">N-dimensional array of uniform type. Fast because data is contiguous in memory.</div></div>
  <div class="concept-card"><div class="concept-term">dtype</div><div class="concept-def">Data type of array elements. float32 vs float64 matters for GPU memory.</div></div>
  <div class="concept-card"><div class="concept-term">shape</div><div class="concept-def">Tuple of dimensions. (100, 784) = 100 samples × 784 features.</div></div>
  <div class="concept-card"><div class="concept-term">broadcasting</div><div class="concept-def">Automatic shape expansion for element-wise ops. Core of vectorized math.</div></div>
</div>
<h2>Broadcasting Rules</h2>
<p>Broadcasting lets you do math between arrays of different shapes without loops. NumPy expands smaller arrays along size-1 dimensions. This is how mean-centering works: subtract a vector from a matrix.</p>
<div class="callout warning"><span class="callout-icon">⚠️</span><div><strong>Shape Errors</strong><p>The most common NumPy error: incompatible shapes. Always print <code>.shape</code> when debugging. A matrix of shape (100, 10) can broadcast with (10,) but not (100,).</p></div></div>`,
    exercises: [
      {
        title: "Array Creation & Operations",
        task: "Create arrays using different methods, explore shapes and dtypes, perform vectorized operations. No Python loops — use NumPy functions for everything.",
        code: `import numpy as np

# Array creation
arr1 = np.array([1, 2, 3, 4, 5], dtype=np.float32)
arr2 = np.zeros((3, 4))
arr3 = np.ones((2, 3))
arr4 = np.arange(0, 10, 2)
arr5 = np.linspace(0, 1, 5)
arr6 = np.random.randn(4, 4)  # Standard normal distribution

print("arr1:", arr1, "| dtype:", arr1.dtype, "| shape:", arr1.shape)
print("arr2 shape:", arr2.shape)
print("arr4:", arr4)
print("arr5:", arr5)
print("\nRandom 4x4 matrix:")
print(np.round(arr6, 2))

# Vectorized math (no loops!)
X = np.random.randn(100, 10)  # 100 samples, 10 features
print(f"\nX shape: {X.shape}")
print(f"Mean per feature: {np.round(X.mean(axis=0), 3)}")
print(f"Std per feature:  {np.round(X.std(axis=0), 3)}")

# Normalize (z-score)
X_norm = (X - X.mean(axis=0)) / X.std(axis=0)
print(f"After normalization — Mean: {X_norm.mean(axis=0).mean():.6f}, Std: {X_norm.std(axis=0).mean():.6f}")
`
      },
      {
        title: "Matrix Multiplication",
        task: "Matrix multiplication is the core operation of neural networks. Use <code>@</code> operator (or <code>np.dot</code>) to compute a forward pass through a simple two-layer network.",
        code: `import numpy as np
np.random.seed(42)

# Simulate a mini neural network forward pass
batch_size = 4
input_dim = 3
hidden_dim = 5
output_dim = 2

# Input batch
X = np.random.randn(batch_size, input_dim)

# Layer 1 weights and biases
W1 = np.random.randn(input_dim, hidden_dim) * 0.1
b1 = np.zeros(hidden_dim)

# Layer 2 weights and biases
W2 = np.random.randn(hidden_dim, output_dim) * 0.1
b2 = np.zeros(output_dim)

# Forward pass
def relu(x):
    return np.maximum(0, x)

def softmax(x):
    e = np.exp(x - x.max(axis=1, keepdims=True))
    return e / e.sum(axis=1, keepdims=True)

z1 = X @ W1 + b1          # (4,3) @ (3,5) = (4,5)
a1 = relu(z1)              # Element-wise activation
z2 = a1 @ W2 + b2          # (4,5) @ (5,2) = (4,2)
probs = softmax(z2)        # Class probabilities

print("Input shape:", X.shape)
print("After layer 1:", a1.shape)
print("Output probs:", np.round(probs, 4))
print("Sums to 1:", np.round(probs.sum(axis=1), 6))
`
      },
      {
        title: "Advanced Indexing",
        task: "Master NumPy indexing — boolean masks, fancy indexing, and np.where. These patterns appear constantly in data preprocessing and loss computation.",
        code: `import numpy as np
np.random.seed(0)

# Simulate model predictions and true labels
n_samples = 20
y_true = np.random.randint(0, 2, n_samples)
y_pred_prob = np.random.uniform(0, 1, n_samples)
y_pred = (y_pred_prob > 0.5).astype(int)

print("True labels:", y_true)
print("Predictions:", y_pred)

# Boolean mask indexing
correct_mask = y_true == y_pred
print(f"\nCorrect: {correct_mask.sum()}/{n_samples}")

# Fancy indexing: get probabilities for correct predictions
correct_probs = y_pred_prob[correct_mask]
print(f"Avg confidence on correct: {correct_probs.mean():.3f}")

# np.where: clip predictions to prevent log(0)
eps = 1e-7
safe_probs = np.where(y_pred_prob < eps, eps, y_pred_prob)
safe_probs = np.where(safe_probs > 1-eps, 1-eps, safe_probs)

# Binary cross-entropy loss
bce = -(y_true * np.log(safe_probs) + (1-y_true) * np.log(1-safe_probs))
print(f"\nBCE loss per sample: {np.round(bce[:5], 4)}")
print(f"Mean BCE loss: {bce.mean():.4f}")
`
      }
    ]
  },
  {
    title: "Pandas for Data Analysis",
    sub: "DataFrames, groupby, merge, cleaning, EDA",
    track: 0, duration: "2 hr", tag: "lab",
    content: `
<h2>Pandas: Data Wrangling for ML</h2>
<p>Almost every ML project starts with messy tabular data. Pandas is the tool for loading, exploring, cleaning, and transforming it before feeding it into a model.</p>
<h2>DataFrame & Series</h2>
<p>A <code>DataFrame</code> is a 2D table with named columns. A <code>Series</code> is a single column. Operations on DataFrames are vectorized — no loops needed for column-wise operations.</p>
<div class="callout info"><span class="callout-icon">💡</span><div><strong>loc vs iloc</strong><p><code>df.loc[label]</code> selects by row/column label. <code>df.iloc[integer]</code> selects by integer position. Mixing them up is a common source of bugs.</p></div></div>
<h2>The EDA Workflow</h2>
<ol>
<li>Load data — <code>pd.read_csv()</code></li>
<li>Inspect — <code>.shape</code>, <code>.dtypes</code>, <code>.head()</code>, <code>.describe()</code></li>
<li>Find missing values — <code>.isnull().sum()</code></li>
<li>Handle missing data — <code>.fillna()</code>, <code>.dropna()</code></li>
<li>Explore distributions — <code>.value_counts()</code>, <code>.groupby()</code></li>
<li>Engineer features — create new columns from existing ones</li>
</ol>`,
    exercises: [
      {
        title: "DataFrame Basics",
        task: "Create a DataFrame of AI model benchmarks, explore it with Pandas methods, and compute per-model statistics.",
        code: `import pandas as pd
import numpy as np

# Create benchmark dataset
np.random.seed(42)
data = {
    "model": ["GPT-4", "Claude-3", "Gemini-Pro", "Llama-3", "Mistral-7B",
              "GPT-4", "Claude-3", "Gemini-Pro", "Llama-3", "Mistral-7B"],
    "task": ["reasoning", "reasoning", "reasoning", "reasoning", "reasoning",
             "coding", "coding", "coding", "coding", "coding"],
    "score": [92.3, 90.1, 88.7, 82.4, 79.8, 87.5, 85.2, 83.1, 76.3, 72.9],
    "latency_ms": [850, 920, 680, 420, 310, 920, 1050, 750, 480, 340],
    "params_B": [None, None, None, 70, 7, None, None, None, 70, 7]
}

df = pd.DataFrame(data)

print("Shape:", df.shape)
print("\nFirst 5 rows:")
print(df.head())

print("\nData types:")
print(df.dtypes)

print("\nNumerical summary:")
print(df.describe().round(2))

print("\nMissing values:")
print(df.isnull().sum())

# Group by model, get mean score
print("\nMean score by model:")
print(df.groupby("model")["score"].mean().sort_values(ascending=False).round(2))
`
      },
      {
        title: "Data Cleaning Pipeline",
        task: "Clean a messy dataset: handle missing values, fix data types, remove duplicates, and engineer a new feature. Use method chaining where possible.",
        code: `import pandas as pd
import numpy as np

np.random.seed(0)

# Messy dataset (simulating real-world data issues)
raw = pd.DataFrame({
    "age": [25, None, 32, 45, 25, 28, None, 55, 33, 29],
    "income": [50000, 75000, None, 120000, 50000, 62000, 80000, None, 95000, 58000],
    "education": ["BS", "MS", "PhD", "BS", "BS", "MS", "PhD", "BS", "MS", None],
    "target": [0, 1, 1, 1, 0, 1, 1, 0, 1, 0]
})

print("Raw data:")
print(raw)
print(f"\nMissing values:\n{raw.isnull().sum()}")

# Cleaning pipeline
clean = (raw
    .copy()
    .assign(age=lambda df: df['age'].fillna(df['age'].median()))
    .assign(income=lambda df: df['income'].fillna(df['income'].mean()))
    .assign(education=lambda df: df['education'].fillna('Unknown'))
    .drop_duplicates()
)

# Feature engineering
clean['income_per_age'] = clean['income'] / clean['age']
clean['edu_encoded'] = clean['education'].map({'BS': 0, 'MS': 1, 'PhD': 2, 'Unknown': -1})

print("\nCleaned data:")
print(clean.round(2))
print(f"\nShape: {raw.shape} → {clean.shape}")
`
      }
    ]
  },
  {
    title: "Project: Exploratory Data Analysis",
    sub: "Full EDA pipeline on a real dataset",
    track: 0, duration: "3 hr", tag: "project",
    content: `
<h2>End-to-End EDA Project</h2>
<p>In this project, you'll perform a complete exploratory data analysis on a synthetic housing dataset — the same workflow used at the start of every real ML project.</p>
<h3>Project Goals</h3>
<ol>
<li>Load and inspect the dataset</li>
<li>Identify and handle missing data</li>
<li>Explore feature distributions and correlations</li>
<li>Engineer new features</li>
<li>Produce a clean, model-ready dataset</li>
</ol>
<div class="callout tip"><span class="callout-icon">✅</span><div><strong>Real EDA Mindset</strong><p>Don't just run code — form hypotheses first. "I expect price to correlate with size." Then verify. Document every decision and assumption.</p></div></div>
<h2>The Dataset</h2>
<p>Synthetic housing data with 200 properties. Features: size (sqft), bedrooms, bathrooms, age, location quality score, and condition. Target: sale price.</p>`,
    exercises: [
      {
        title: "Load & Inspect",
        task: "Generate the synthetic housing dataset and perform initial inspection. Find: shape, dtypes, missing value counts, basic statistics for numeric columns.",
        code: `import numpy as np
import pandas as pd

np.random.seed(42)
n = 200

# Generate synthetic housing data
df = pd.DataFrame({
    'sqft': np.random.normal(1800, 500, n).clip(400, 5000).round(),
    'bedrooms': np.random.choice([2,3,4,5], n, p=[0.2,0.4,0.3,0.1]),
    'bathrooms': np.random.choice([1,2,3,4], n, p=[0.1,0.5,0.3,0.1]),
    'age_years': np.random.exponential(20, n).clip(0, 80).round().astype(int),
    'location_score': np.random.uniform(1, 10, n).round(1),
    'condition': np.random.choice(['poor','fair','good','excellent'], n, p=[0.1,0.3,0.4,0.2]),
})

# Inject some missing values
df.loc[np.random.choice(n, 15, replace=False), 'sqft'] = np.nan
df.loc[np.random.choice(n, 8, replace=False), 'location_score'] = np.nan

# Target: price
base_price = 100_000
df['price'] = (
    base_price
    + df['sqft'].fillna(df['sqft'].median()) * 120
    + df['bedrooms'] * 15_000
    + df['location_score'].fillna(5) * 20_000
    - df['age_years'] * 800
    + np.random.normal(0, 20_000, n)
).round(-3)

print(f"Dataset shape: {df.shape}")
print(f"\nData types:\n{df.dtypes}")
print(f"\nMissing values:\n{df.isnull().sum()}")
print(f"\nNumerical summary:\n{df.describe().round(2)}")
`
      },
      {
        title: "Correlation Analysis",
        task: "Compute the correlation matrix for numeric features. Find which features correlate most strongly with price. Use a simple ASCII bar chart to visualize correlations.",
        code: `import numpy as np
import pandas as pd

np.random.seed(42)
n = 200
df = pd.DataFrame({
    'sqft': np.random.normal(1800, 500, n).clip(400, 5000),
    'bedrooms': np.random.choice([2,3,4,5], n, p=[0.2,0.4,0.3,0.1]).astype(float),
    'bathrooms': np.random.choice([1,2,3,4], n, p=[0.1,0.5,0.3,0.1]).astype(float),
    'age_years': np.random.exponential(20, n).clip(0, 80),
    'location_score': np.random.uniform(1, 10, n),
})
df['price'] = (100000 + df['sqft']*120 + df['bedrooms']*15000
               + df['location_score']*20000 - df['age_years']*800
               + np.random.normal(0, 20000, n))

# Correlation with price
corr_with_price = df.corr()['price'].drop('price').sort_values(key=abs, ascending=False)

print("Correlation with price:")
print("-" * 45)
for feat, corr in corr_with_price.items():
    bar_len = int(abs(corr) * 30)
    direction = "+" if corr > 0 else "-"
    bar = direction * bar_len
    print(f"  {feat:>15}: {corr:>+6.3f} |{bar}")

print(f"\nFull correlation matrix:")
print(df.corr().round(3))
`
      },
      {
        title: "Feature Engineering",
        task: "Engineer new features that could improve a predictive model. Create: price_per_sqft, total_rooms, is_new (age < 10), and encode the condition column numerically. Output the final model-ready dataframe.",
        code: `import numpy as np
import pandas as pd

np.random.seed(42)
n = 200
df = pd.DataFrame({
    'sqft': np.random.normal(1800, 500, n).clip(400, 5000),
    'bedrooms': np.random.choice([2,3,4,5], n, p=[0.2,0.4,0.3,0.1]).astype(float),
    'bathrooms': np.random.choice([1,2,3,4], n, p=[0.1,0.5,0.3,0.1]).astype(float),
    'age_years': np.random.exponential(20, n).clip(0, 80),
    'location_score': np.random.uniform(1, 10, n),
    'condition': np.random.choice(['poor','fair','good','excellent'], n, p=[0.1,0.3,0.4,0.2]),
})
df['price'] = (100000 + df['sqft']*120 + df['bedrooms']*15000
               + df['location_score']*20000 - df['age_years']*800
               + np.random.normal(0, 20000, n))

# Feature engineering
df['total_rooms'] = df['bedrooms'] + df['bathrooms']
df['sqft_per_room'] = df['sqft'] / df['total_rooms']
df['is_new'] = (df['age_years'] < 10).astype(int)
df['location_premium'] = (df['location_score'] > 7).astype(int)

# Ordinal encode condition
condition_map = {'poor': 0, 'fair': 1, 'good': 2, 'excellent': 3}
df['condition_encoded'] = df['condition'].map(condition_map)
df = df.drop(columns=['condition'])

# Final feature set
feature_cols = [c for c in df.columns if c != 'price']
X = df[feature_cols]
y = df['price']

print("Final feature matrix shape:", X.shape)
print("\nFeatures:", list(X.columns))
print("\nFirst 3 rows:")
print(X.head(3).round(2))
print(f"\nTarget range: \${y.min():.0f} — \${y.max():.0f}")
print(f"Target mean:  \${y.mean():.0f}")
`
      }
    ]
  },

  // ─── INTERMEDIATE ─────────────────────────────────────────────────
  {
    title: "ML Foundations & Intuition",
    sub: "Bias/variance, train/val/test, loss functions",
    track: 1, duration: "1.5 hr",
    content: `
<h2>What is Machine Learning?</h2>
<p>Traditional programming: you write rules. Machine learning: you provide examples and the algorithm learns the rules. The key insight is that for many problems (image recognition, language understanding), we can't enumerate all the rules — but we can collect data.</p>
<div class="concept-grid">
  <div class="concept-card"><div class="concept-term">Supervised</div><div class="concept-def">Learn from labeled (X, y) pairs. Goal: predict y for new X.</div></div>
  <div class="concept-card"><div class="concept-term">Unsupervised</div><div class="concept-def">Find structure in unlabeled data. Clustering, compression.</div></div>
  <div class="concept-card"><div class="concept-term">Loss Function</div><div class="concept-def">Measures how wrong the model is. Training minimizes this.</div></div>
  <div class="concept-card"><div class="concept-term">Generalization</div><div class="concept-def">Does the model work on data it hasn't seen? The real goal.</div></div>
</div>
<h2>The Bias-Variance Tradeoff</h2>
<p><strong>High bias (underfitting):</strong> model is too simple, misses patterns, performs badly on both train and test data. <strong>High variance (overfitting):</strong> model memorizes training data, doesn't generalize — high train accuracy, low test accuracy. The goal: find the sweet spot.</p>
<div class="callout info"><span class="callout-icon">💡</span><div><strong>The Golden Rule</strong><p>Split your data <em>before</em> any preprocessing. If you fit a scaler on the full dataset before splitting, you've leaked test data into training — your results are optimistically biased.</p></div></div>`,
    exercises: [
      {
        title: "Train/Val/Test Splits",
        task: "Properly split data into 70% train, 15% validation, 15% test. Then simulate overfitting by showing a model that has near-perfect training accuracy but poor test accuracy.",
        code: `import numpy as np

np.random.seed(42)

# Generate dataset
n = 1000
X = np.random.randn(n, 5)
y = (X[:, 0] + 0.5*X[:, 1] - 0.3*X[:, 2] + np.random.randn(n)*0.5 > 0).astype(int)

# Split: 70/15/15
def train_val_test_split(X, y, val_ratio=0.15, test_ratio=0.15):
    n = len(X)
    idx = np.random.permutation(n)
    test_end = int(n * test_ratio)
    val_end = test_end + int(n * val_ratio)

    test_idx = idx[:test_end]
    val_idx = idx[test_end:val_end]
    train_idx = idx[val_end:]

    return (X[train_idx], y[train_idx],
            X[val_idx], y[val_idx],
            X[test_idx], y[test_idx])

X_train, y_train, X_val, y_val, X_test, y_test = train_val_test_split(X, y)

print(f"Dataset: {n} samples")
print(f"  Train: {len(X_train)} ({len(X_train)/n:.0%})")
print(f"  Val:   {len(X_val)} ({len(X_val)/n:.0%})")
print(f"  Test:  {len(X_test)} ({len(X_test)/n:.0%})")

# Class balance check
print(f"\nClass balance — Train: {y_train.mean():.2%} positive")
print(f"Class balance — Test:  {y_test.mean():.2%} positive")
`
      },
      {
        title: "Loss Functions from Scratch",
        task: "Implement Mean Squared Error (for regression) and Binary Cross-Entropy (for classification) from scratch using NumPy. Test them and verify they decrease as predictions improve.",
        code: `import numpy as np

def mse_loss(y_true, y_pred):
    """Mean Squared Error — for regression."""
    return np.mean((y_true - y_pred) ** 2)

def rmse_loss(y_true, y_pred):
    return np.sqrt(mse_loss(y_true, y_pred))

def bce_loss(y_true, y_pred_prob, eps=1e-7):
    """Binary Cross-Entropy — for classification."""
    p = np.clip(y_pred_prob, eps, 1 - eps)
    return -np.mean(y_true * np.log(p) + (1 - y_true) * np.log(1 - p))

# Test: as predictions improve, loss should decrease
y_true = np.array([1, 0, 1, 1, 0, 0, 1, 0])

print("MSE Loss:")
for pred_std in [2.0, 1.0, 0.5, 0.1]:
    preds = y_true + np.random.randn(len(y_true)) * pred_std
    print(f"  noise_std={pred_std}: MSE={mse_loss(y_true, preds):.4f}, RMSE={rmse_loss(y_true, preds):.4f}")

print("\nBCE Loss:")
for quality in ["random", "decent", "good", "perfect"]:
    if quality == "random": probs = np.random.uniform(0, 1, len(y_true))
    elif quality == "decent": probs = np.clip(y_true + np.random.randn(len(y_true))*0.5, 0.05, 0.95)
    elif quality == "good": probs = np.clip(y_true + np.random.randn(len(y_true))*0.1, 0.05, 0.95)
    else: probs = np.where(y_true == 1, 0.99, 0.01)
    print(f"  {quality:8s}: BCE={bce_loss(y_true, probs):.4f}")
`
      }
    ]
  },
  {
    title: "Linear & Logistic Regression",
    sub: "Gradient descent, sklearn, regularization",
    track: 1, duration: "2 hr",
    content: `
<h2>Linear Regression</h2>
<p>The simplest ML model: predict a continuous output as a weighted sum of inputs. Despite its simplicity, it reveals core concepts: loss functions, gradient descent, overfitting.</p>
<p>The model: <code>ŷ = Xθ</code> where X is the feature matrix and θ are the learned weights. We minimize MSE: <code>L = (1/n) Σ(yᵢ - ŷᵢ)²</code></p>
<h2>Gradient Descent</h2>
<p>The update rule: <code>θ = θ - α ∇L(θ)</code> where α is the learning rate. The gradient of MSE with respect to θ is <code>(2/n) Xᵀ(Xθ - y)</code>. This tells us which direction to step in parameter space to reduce the loss.</p>
<div class="callout tip"><span class="callout-icon">✅</span><div><strong>Learning Rate</strong><p>Too high → loss oscillates or diverges. Too low → training is slow. Typical starting values: 0.1 for normalized data, 1e-3 to 1e-4 for deep learning.</p></div></div>
<h2>Logistic Regression</h2>
<p>For binary classification, wrap a linear model with a sigmoid: <code>P(y=1|x) = σ(Xθ)</code>. Despite the name, it's a <em>classification</em> algorithm. It outputs probabilities and is trained with cross-entropy loss.</p>`,
    exercises: [
      {
        title: "Linear Regression from Scratch",
        task: "Implement linear regression with gradient descent. Train it on a synthetic dataset, track loss over epochs, and compare your implementation to numpy's least-squares solution.",
        code: `import numpy as np

np.random.seed(42)

# Generate data: y = 2x1 + 3x2 - 1 + noise
n = 100
X_raw = np.random.randn(n, 2)
true_weights = np.array([2.0, 3.0])
true_bias = -1.0
y = X_raw @ true_weights + true_bias + np.random.randn(n) * 0.5

# Add bias term
X = np.column_stack([np.ones(n), X_raw])  # (100, 3)

# Gradient descent
def train_linear(X, y, lr=0.1, epochs=200):
    theta = np.zeros(X.shape[1])
    losses = []
    for ep in range(epochs):
        y_pred = X @ theta
        loss = np.mean((y - y_pred) ** 2)
        losses.append(loss)
        grad = (2/len(y)) * X.T @ (y_pred - y)
        theta -= lr * grad
    return theta, losses

theta, losses = train_linear(X, y, lr=0.1, epochs=100)

print(f"True params:    bias={true_bias:.2f}, w={true_weights}")
print(f"Learned params: bias={theta[0]:.4f}, w={theta[1:]}")
print(f"\nFinal training loss: {losses[-1]:.6f}")
print(f"Loss at epoch 1:  {losses[0]:.4f}")
print(f"Loss at epoch 10: {losses[9]:.4f}")
print(f"Loss at epoch 100: {losses[-1]:.4f}")

# Numpy least squares solution (optimal)
theta_np, _, _, _ = np.linalg.lstsq(X, y, rcond=None)
print(f"\nNumPy lstsq: bias={theta_np[0]:.4f}, w={theta_np[1:]}")
`
      },
      {
        title: "Logistic Regression with sklearn",
        task: "Train a logistic regression classifier on a binary dataset. Evaluate it using accuracy, precision, recall, and F1. Plot a confusion matrix using ASCII art.",
        code: `import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix

np.random.seed(42)

# Generate binary classification dataset
n = 500
X = np.random.randn(n, 4)
# Decision boundary: nonlinear combination
y = ((X[:,0]**2 + X[:,1] - X[:,2]*0.5 + np.random.randn(n)*0.3) > 0).astype(int)

# Split and scale
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
scaler = StandardScaler()
X_train_s = scaler.fit_transform(X_train)
X_test_s = scaler.transform(X_test)

# Train
model = LogisticRegression(random_state=42)
model.fit(X_train_s, y_train)
y_pred = model.predict(X_test_s)

# Metrics
print(f"Accuracy:  {accuracy_score(y_test, y_pred):.4f}")
print(f"Precision: {precision_score(y_test, y_pred):.4f}")
print(f"Recall:    {recall_score(y_test, y_pred):.4f}")
print(f"F1-Score:  {f1_score(y_test, y_pred):.4f}")

# ASCII confusion matrix
cm = confusion_matrix(y_test, y_pred)
print(f"\nConfusion Matrix:")
print(f"              Pred 0   Pred 1")
print(f"  Actual 0:   {cm[0,0]:>5}    {cm[0,1]:>5}")
print(f"  Actual 1:   {cm[1,0]:>5}    {cm[1,1]:>5}")
print(f"\nTP={cm[1,1]}, TN={cm[0,0]}, FP={cm[0,1]}, FN={cm[1,0]}")
`
      }
    ]
  },
  {
    title: "Decision Trees & Random Forests",
    sub: "Splitting criteria, bagging, feature importance",
    track: 1, duration: "2 hr",
    content: `
<h2>Decision Trees</h2>
<p>Trees split data recursively by asking yes/no questions about features. Each split maximizes information gain (classification) or reduces variance (regression). Easy to interpret, but overfit easily.</p>
<h3>Key Hyperparameters</h3>
<table class="lesson-table"><thead><tr><th>Parameter</th><th>Controls</th><th>Default</th></tr></thead><tbody>
<tr><td><code>max_depth</code></td><td>Tree depth — main regularizer</td><td>None (unlimited)</td></tr>
<tr><td><code>min_samples_leaf</code></td><td>Min samples per leaf</td><td>1</td></tr>
<tr><td><code>criterion</code></td><td>Split quality: gini or entropy</td><td>gini</td></tr>
</tbody></table>
<h2>Random Forests</h2>
<p>Ensemble of trees, each trained on a random subset of data (bagging) and features. Reduces variance dramatically. Usually 100-500 trees. The gold standard for tabular ML problems.</p>
<div class="callout info"><span class="callout-icon">💡</span><div><strong>Feature Importance</strong><p>Random forests give you free feature importance — how much each feature contributed to splits. Use this to identify irrelevant features and understand your data.</p></div></div>`,
    exercises: [
      {
        title: "Tree vs Forest: Overfitting Demo",
        task: "Show the overfitting problem with a deep tree, then show how a random forest fixes it. Compare train vs test accuracy for both.",
        code: `import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.datasets import make_classification

np.random.seed(42)

# Generate dataset
X, y = make_classification(n_samples=500, n_features=10, n_informative=5,
                            n_redundant=2, random_state=42)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

print(f"{'Model':<25} {'Train Acc':>10} {'Test Acc':>10} {'Overfit':>10}")
print("-" * 58)

# Test different tree depths
for max_d in [2, 5, 10, None]:
    dt = DecisionTreeClassifier(max_depth=max_d, random_state=42)
    dt.fit(X_train, y_train)
    tr_acc = dt.score(X_train, y_train)
    te_acc = dt.score(X_test, y_test)
    label = f"DecisionTree(depth={max_d})"
    print(f"{label:<25} {tr_acc:>10.4f} {te_acc:>10.4f} {tr_acc-te_acc:>+10.4f}")

# Random Forest
rf = RandomForestClassifier(n_estimators=200, random_state=42, n_jobs=-1)
rf.fit(X_train, y_train)
tr_acc = rf.score(X_train, y_train)
te_acc = rf.score(X_test, y_test)
print(f"{'RandomForest(200 trees)':<25} {tr_acc:>10.4f} {te_acc:>10.4f} {tr_acc-te_acc:>+10.4f}")

# Feature importance
print("\nTop 5 Feature Importances:")
importances = sorted(enumerate(rf.feature_importances_), key=lambda x: -x[1])[:5]
for feat_idx, imp in importances:
    bar = "█" * int(imp * 50)
    print(f"  Feature {feat_idx:>2}: {imp:.4f} |{bar}")
`
      },
      {
        title: "Hyperparameter Tuning",
        task: "Use GridSearchCV to find the best hyperparameters for a Random Forest. Compare performance with and without cross-validation tuning.",
        code: `import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, GridSearchCV, cross_val_score
from sklearn.datasets import make_classification

np.random.seed(42)
X, y = make_classification(n_samples=600, n_features=12, n_informative=6, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Baseline model
rf_base = RandomForestClassifier(n_estimators=100, random_state=42)
rf_base.fit(X_train, y_train)
print(f"Baseline test accuracy: {rf_base.score(X_test, y_test):.4f}")

# Grid search
param_grid = {
    "n_estimators": [50, 100, 200],
    "max_depth": [5, 10, None],
    "min_samples_leaf": [1, 3, 5],
}

grid_search = GridSearchCV(
    RandomForestClassifier(random_state=42),
    param_grid, cv=5, scoring="accuracy",
    n_jobs=-1, verbose=0
)
grid_search.fit(X_train, y_train)

print(f"\nBest params: {grid_search.best_params_}")
print(f"Best CV score: {grid_search.best_score_:.4f}")
print(f"Tuned test accuracy: {grid_search.best_estimator_.score(X_test, y_test):.4f}")

# Cross-validation on best model
cv_scores = cross_val_score(grid_search.best_estimator_, X_train, y_train, cv=5)
print(f"\n5-fold CV: {cv_scores.mean():.4f} ± {cv_scores.std():.4f}")
`
      }
    ]
  },
  {
    title: "Gradient Boosting & XGBoost",
    sub: "Boosting, XGBoost, LightGBM, SHAP values",
    track: 1, duration: "2 hr",
    content: `
<h2>Gradient Boosting</h2>
<p>Instead of bagging (Random Forests, parallel), boosting trains trees <em>sequentially</em>. Each tree focuses on the residual errors of the previous one. The result: extremely powerful models on tabular data.</p>
<p><strong>The idea:</strong> at each step, fit a new tree to the gradient of the loss. Add this tree to the ensemble with a learning rate. Repeat. Hundreds of weak learners combine into one strong learner.</p>
<div class="callout warning"><span class="callout-icon">⚠️</span><div><strong>Overfitting Risk</strong><p>Boosting can overfit if you use too many trees or too deep trees. Always use early stopping (stop when validation loss stops improving) and tune <code>learning_rate</code>.</p></div></div>
<h2>XGBoost</h2>
<p>Extreme Gradient Boosting — optimized implementation with regularization, handling missing values natively, and GPU support. Wins most tabular ML competitions when combined with feature engineering.</p>`,
    exercises: [
      {
        title: "XGBoost vs Random Forest",
        task: "Compare XGBoost and Random Forest on a dataset. Show the impact of early stopping on XGBoost.",
        code: `import numpy as np
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.model_selection import train_test_split
from sklearn.datasets import make_classification
from sklearn.metrics import accuracy_score

np.random.seed(42)
X, y = make_classification(n_samples=1000, n_features=20, n_informative=10,
                            n_redundant=5, random_state=42)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
X_tr, X_val, y_tr, y_val = train_test_split(X_train, y_train, test_size=0.2, random_state=42)

# Random Forest baseline
rf = RandomForestClassifier(n_estimators=200, random_state=42)
rf.fit(X_train, y_train)
rf_acc = rf.score(X_test, y_test)
print(f"Random Forest accuracy: {rf_acc:.4f}")

# Sklearn GradientBoosting (n_estimators varies)
print("\nGradient Boosting — effect of n_estimators:")
for n_trees in [10, 50, 100, 200, 500]:
    gb = GradientBoostingClassifier(n_estimators=n_trees, learning_rate=0.1,
                                     max_depth=4, random_state=42)
    gb.fit(X_tr, y_tr)
    val_acc = accuracy_score(y_val, gb.predict(X_val))
    test_acc = accuracy_score(y_test, gb.predict(X_test))
    print(f"  {n_trees:>4} trees | val={val_acc:.4f} | test={test_acc:.4f}")

# Manual early stopping
print("\nManual early stopping:")
from sklearn.ensemble import GradientBoostingClassifier
best_val, best_n, best_model = 0, 0, None
for n in range(10, 301, 10):
    gb = GradientBoostingClassifier(n_estimators=n, learning_rate=0.05, max_depth=3, random_state=42)
    gb.fit(X_tr, y_tr)
    v = accuracy_score(y_val, gb.predict(X_val))
    if v > best_val:
        best_val, best_n, best_model = v, n, gb

print(f"Best n_estimators: {best_n} (val acc={best_val:.4f})")
print(f"Test accuracy with best model: {accuracy_score(y_test, best_model.predict(X_test)):.4f}")
`
      }
    ]
  },
  {
    title: "Model Evaluation & Pipelines",
    sub: "Cross-validation, ROC-AUC, sklearn Pipelines",
    track: 1, duration: "2 hr",
    content: `
<h2>Why Proper Evaluation Matters</h2>
<p>A model that looks great on a held-out test set might still be misleading if: you peeked at test data during development, you chose the model architecture based on test performance, or your test split isn't representative.</p>
<h2>Cross-Validation</h2>
<p>k-fold CV splits data into k folds, trains on k-1, evaluates on the remaining fold, and repeats k times. Gives a reliable estimate of generalization performance with full data utilization.</p>
<h2>ROC Curve & AUC</h2>
<p>For classification, accuracy alone is misleading with imbalanced classes. The ROC curve plots true positive rate vs false positive rate at different thresholds. AUC (area under curve) = 1.0 is perfect; 0.5 is random.</p>
<h2>Pipelines</h2>
<p>sklearn Pipelines chain preprocessing + model into one object. Crucial for preventing data leakage — the scaler only sees training data, not test data.</p>`,
    exercises: [
      {
        title: "Cross-Validation Deep Dive",
        task: "Compare multiple models using stratified k-fold cross-validation. Visualize score distributions with an ASCII box plot.",
        code: `import numpy as np
from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.datasets import make_classification

np.random.seed(42)
X, y = make_classification(n_samples=800, n_features=15, n_informative=8,
                            class_sep=0.8, random_state=42)

models = {
    "LogReg": Pipeline([("scaler", StandardScaler()), ("model", LogisticRegression(random_state=42))]),
    "RandomForest": RandomForestClassifier(n_estimators=100, random_state=42),
    "GradBoost": GradientBoostingClassifier(n_estimators=100, random_state=42),
}

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

print(f"{'Model':<15} {'Mean':>7} {'Std':>7} {'Min':>7} {'Max':>7}")
print("-" * 47)

for name, model in models.items():
    scores = cross_val_score(model, X, y, cv=cv, scoring="roc_auc", n_jobs=-1)
    print(f"{name:<15} {scores.mean():>7.4f} {scores.std():>7.4f} {scores.min():>7.4f} {scores.max():>7.4f}")
    # ASCII distribution
    bar = "".join("▊" if s > scores.mean() else "▎" for s in scores)
    print(f"  Fold scores: {bar}  {list(scores.round(4))}")

print("\nUsing pipelines ensures no data leakage from scaling!")
`
      },
      {
        title: "sklearn Pipeline with Feature Engineering",
        task: "Build a full sklearn Pipeline that: scales numeric features, one-hot encodes categoricals, then trains a gradient boosting model. Evaluate with 5-fold CV.",
        code: `import numpy as np
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import cross_val_score, StratifiedKFold
from sklearn.impute import SimpleImputer

np.random.seed(42)
n = 500

# Mixed dataset with numeric and categorical features
df = pd.DataFrame({
    "age": np.random.normal(35, 10, n).clip(18, 70),
    "income": np.random.lognormal(10.5, 0.8, n),
    "score": np.random.uniform(0, 100, n),
    "education": np.random.choice(["HS", "BS", "MS", "PhD"], n, p=[0.2, 0.4, 0.3, 0.1]),
    "region": np.random.choice(["North", "South", "East", "West"], n),
})

# Target
y = ((df["income"] > 50000) & (df["score"] > 40)).astype(int).values

# Add some missing values
for col in ["age", "income", "education"]:
    mask = np.random.choice(n, 25, replace=False)
    df.loc[mask, col] = np.nan

X = df

# Build preprocessing + model pipeline
numeric_features = ["age", "income", "score"]
categorical_features = ["education", "region"]

numeric_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler()),
])

categorical_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("encoder", OneHotEncoder(handle_unknown="ignore", sparse_output=False)),
])

preprocessor = ColumnTransformer([
    ("num", numeric_pipeline, numeric_features),
    ("cat", categorical_pipeline, categorical_features),
])

full_pipeline = Pipeline([
    ("preprocessing", preprocessor),
    ("model", GradientBoostingClassifier(n_estimators=100, random_state=42))
])

# Cross-validate
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(full_pipeline, X, y, cv=cv, scoring="roc_auc")

print(f"Pipeline AUC: {scores.mean():.4f} ± {scores.std():.4f}")
print(f"All folds: {scores.round(4)}")
print(f"\nPipeline steps:")
for name, step in full_pipeline.steps:
    print(f"  {name}: {type(step).__name__}")
`
      }
    ]
  },
  {
    title: "Project: Kaggle-Style ML Competition",
    sub: "End-to-end tabular ML pipeline",
    track: 1, duration: "3 hr", tag: "project",
    content: `
<h2>Full ML Pipeline Project</h2>
<p>This project mirrors a real Kaggle competition workflow. You'll take a synthetic dataset from raw data to submission-ready predictions using everything from this track.</p>
<h3>Competition Goal</h3>
<p>Predict whether a loan applicant will default (binary classification). The winning metric is ROC-AUC.</p>
<h3>Your Workflow</h3>
<ol>
<li>EDA and data understanding</li>
<li>Feature engineering</li>
<li>Model selection and tuning</li>
<li>Ensemble/blend predictions</li>
<li>Evaluate on holdout set</li>
</ol>
<div class="callout info"><span class="callout-icon">💡</span><div><strong>Competition Mindset</strong><p>The biggest gains come from feature engineering, not model choice. Understand your data deeply before tuning hyperparameters.</p></div></div>`,
    exercises: [
      {
        title: "Data Preparation",
        task: "Load the synthetic loan dataset, perform EDA, handle missing values, and engineer features. Target: loan_default (0/1).",
        code: `import numpy as np
import pandas as pd

np.random.seed(42)
n = 1000

# Generate synthetic loan dataset
df = pd.DataFrame({
    "age": np.random.normal(40, 12, n).clip(18, 75).round().astype(int),
    "annual_income": np.random.lognormal(10.8, 0.6, n).round(-2),
    "credit_score": np.random.normal(680, 80, n).clip(300, 850).round().astype(int),
    "loan_amount": np.random.lognormal(10.2, 0.5, n).round(-2),
    "loan_term_months": np.random.choice([12, 24, 36, 60], n, p=[0.1, 0.3, 0.4, 0.2]),
    "num_credit_lines": np.random.poisson(5, n),
    "employment_years": np.random.exponential(8, n).clip(0, 40).round(1),
    "home_ownership": np.random.choice(["rent", "own", "mortgage"], n, p=[0.35, 0.25, 0.40]),
    "loan_purpose": np.random.choice(["debt_consolidation", "home_improvement", "other"], n, p=[0.4, 0.3, 0.3]),
})

# Target: default probability influenced by features
default_score = (
    -0.003 * df["credit_score"]
    + 0.00001 * df["loan_amount"]
    - 0.0001 * df["annual_income"]
    + 0.01 * df["loan_term_months"] / 12
    + 0.5
    + np.random.randn(n) * 0.3
)
df["loan_default"] = (default_score > 0.3).astype(int)

# Add missing values
for col, rate in [("annual_income", 0.03), ("employment_years", 0.08), ("credit_score", 0.02)]:
    df.loc[np.random.choice(n, int(n*rate), replace=False), col] = np.nan

print(f"Dataset: {df.shape}")
print(f"\nDefault rate: {df['loan_default'].mean():.2%}")
print(f"\nMissing values:\n{df.isnull().sum()[df.isnull().sum()>0]}")

# Feature engineering
df["debt_to_income"] = df["loan_amount"] / df["annual_income"].fillna(df["annual_income"].median())
df["monthly_payment"] = df["loan_amount"] / df["loan_term_months"]
df["income_per_credit_line"] = df["annual_income"].fillna(df["annual_income"].median()) / (df["num_credit_lines"] + 1)
df["credit_score_bucket"] = pd.cut(df["credit_score"].fillna(680), bins=[0, 580, 670, 740, 850], labels=[0,1,2,3])

print(f"\nEngineered features added. Final shape: {df.shape}")
print(f"\nCorrelations with target:")
numeric_corr = df.select_dtypes(include=np.number).corr()["loan_default"].drop("loan_default").sort_values()
for feat, corr in numeric_corr.items():
    print(f"  {feat:>25}: {corr:>+.4f}")
`
      },
      {
        title: "Model Training & Evaluation",
        task: "Train multiple models on the loan dataset, use cross-validation to compare them, then blend their predictions for better performance.",
        code: `import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import roc_auc_score

np.random.seed(42)
n = 1000

# Recreate dataset
df = pd.DataFrame({
    "age": np.random.normal(40, 12, n).clip(18, 75),
    "annual_income": np.random.lognormal(10.8, 0.6, n),
    "credit_score": np.random.normal(680, 80, n).clip(300, 850),
    "loan_amount": np.random.lognormal(10.2, 0.5, n),
    "loan_term_months": np.random.choice([12, 24, 36, 60], n).astype(float),
    "num_credit_lines": np.random.poisson(5, n).astype(float),
    "employment_years": np.random.exponential(8, n).clip(0, 40),
    "home_ownership": np.random.choice(["rent", "own", "mortgage"], n, p=[0.35,0.25,0.40]),
})
default_score = -0.003*df["credit_score"] + 0.00001*df["loan_amount"] + 0.5 + np.random.randn(n)*0.3
y = (default_score > 0.3).astype(int).values

num_cols = ["age","annual_income","credit_score","loan_amount","loan_term_months","num_credit_lines","employment_years"]
cat_cols = ["home_ownership"]

preproc = ColumnTransformer([
    ("num", Pipeline([("imp", SimpleImputer(strategy="median")), ("sc", StandardScaler())]), num_cols),
    ("cat", Pipeline([("imp", SimpleImputer(strategy="most_frequent")), ("enc", OneHotEncoder(sparse_output=False))]), cat_cols),
])

X_train, X_test, y_train, y_test = train_test_split(df, y, test_size=0.2, stratify=y, random_state=42)

models = {
    "LogReg": Pipeline([("prep", preproc), ("m", LogisticRegression(C=1.0, random_state=42))]),
    "RF-100": Pipeline([("prep", preproc), ("m", RandomForestClassifier(n_estimators=100, random_state=42))]),
    "GBM-100": Pipeline([("prep", preproc), ("m", GradientBoostingClassifier(n_estimators=100, random_state=42))]),
}

print(f"{'Model':<10} {'CV AUC (5-fold)':>18} {'Test AUC':>12}")
print("-" * 44)

test_probs = {}
for name, pipe in models.items():
    cv_scores = cross_val_score(pipe, X_train, y_train, cv=5, scoring="roc_auc")
    pipe.fit(X_train, y_train)
    proba = pipe.predict_proba(X_test)[:, 1]
    test_probs[name] = proba
    test_auc = roc_auc_score(y_test, proba)
    print(f"{name:<10} {cv_scores.mean():.4f} ± {cv_scores.std():.4f}     {test_auc:.4f}")

# Blend: average predictions
blend_probs = np.mean(list(test_probs.values()), axis=0)
blend_auc = roc_auc_score(y_test, blend_probs)
print(f"\n{'BLEND':<10} {'---':>18} {blend_auc:>12.4f}")
print("\nEnsemble > individual models — more signal, less noise!")
`
      }
    ]
  },

  // ─── ADVANCED ─────────────────────────────────────────────────────
  {
    title: "Neural Networks from Scratch",
    sub: "Backpropagation, activations, pure NumPy",
    track: 2, duration: "3 hr",
    content: `
<h2>Why Build from Scratch?</h2>
<p>PyTorch handles gradients automatically. But if you don't understand backpropagation, you can't debug training failures, tune learning rates intelligently, or understand why architectures work. Build it once from scratch — you'll never be confused again.</p>
<h2>The Forward Pass</h2>
<p>Each layer computes: <code>z = Wx + b</code> (linear), then <code>a = activation(z)</code>. The final layer's output is compared to the target using a loss function.</p>
<h2>Backpropagation</h2>
<p>Backprop applies the chain rule to compute ∂L/∂W for every weight matrix. The gradient flows backward through each layer. This is the algorithm that makes deep learning possible.</p>
<div class="callout info"><span class="callout-icon">💡</span><div><strong>Vanishing Gradients</strong><p>With sigmoid activations, gradients shrink as they flow backward through layers. Deep networks with sigmoids can't learn. ReLU solves this — its gradient is always 0 or 1, not squashed.</p></div></div>`,
    exercises: [
      {
        title: "Two-Layer Network: Forward Pass",
        task: "Implement a two-layer neural network forward pass from scratch using only NumPy. Include ReLU and softmax activations.",
        code: `import numpy as np

np.random.seed(42)

class TwoLayerNet:
    def __init__(self, input_dim, hidden_dim, output_dim, lr=0.01):
        # Xavier initialization
        scale1 = np.sqrt(2.0 / input_dim)
        scale2 = np.sqrt(2.0 / hidden_dim)
        self.W1 = np.random.randn(input_dim, hidden_dim) * scale1
        self.b1 = np.zeros(hidden_dim)
        self.W2 = np.random.randn(hidden_dim, output_dim) * scale2
        self.b2 = np.zeros(output_dim)
        self.lr = lr
        self.cache = {}

    def relu(self, z):
        return np.maximum(0, z)

    def relu_grad(self, z):
        return (z > 0).astype(float)

    def softmax(self, z):
        z_stable = z - z.max(axis=1, keepdims=True)  # numerical stability
        exp_z = np.exp(z_stable)
        return exp_z / exp_z.sum(axis=1, keepdims=True)

    def forward(self, X):
        z1 = X @ self.W1 + self.b1
        a1 = self.relu(z1)
        z2 = a1 @ self.W2 + self.b2
        probs = self.softmax(z2)
        self.cache = {'X': X, 'z1': z1, 'a1': a1, 'probs': probs}
        return probs

    def cross_entropy_loss(self, probs, y_true):
        n = len(y_true)
        log_probs = -np.log(probs[np.arange(n), y_true] + 1e-7)
        return log_probs.mean()

# Test forward pass
n, d_in, d_h, d_out = 32, 10, 64, 3
net = TwoLayerNet(d_in, d_h, d_out, lr=0.01)

X = np.random.randn(n, d_in)
y = np.random.randint(0, d_out, n)

probs = net.forward(X)

print(f"Input shape:  {X.shape}")
print(f"Output shape: {probs.shape}")
print(f"Probs sum to 1: {np.allclose(probs.sum(axis=1), 1)}")
print(f"Loss: {net.cross_entropy_loss(probs, y):.4f}")
print(f"Predicted classes: {probs.argmax(axis=1)[:10]}")
`
      },
      {
        title: "Backpropagation & Training Loop",
        task: "Implement backpropagation for the two-layer network. Train it on a synthetic classification task and watch the loss decrease.",
        code: `import numpy as np

np.random.seed(42)

class TwoLayerNet:
    def __init__(self, d_in, d_h, d_out, lr=0.05):
        s1, s2 = np.sqrt(2/d_in), np.sqrt(2/d_h)
        self.W1 = np.random.randn(d_in, d_h) * s1
        self.b1 = np.zeros(d_h)
        self.W2 = np.random.randn(d_h, d_out) * s2
        self.b2 = np.zeros(d_out)
        self.lr = lr

    def forward(self, X):
        self.X = X
        self.z1 = X @ self.W1 + self.b1
        self.a1 = np.maximum(0, self.z1)          # ReLU
        self.z2 = self.a1 @ self.W2 + self.b2
        e = np.exp(self.z2 - self.z2.max(axis=1,keepdims=True))
        self.probs = e / e.sum(axis=1, keepdims=True)  # Softmax
        return self.probs

    def backward(self, y_true):
        n = len(y_true)
        # dL/dz2: softmax + cross-entropy gradient
        dz2 = self.probs.copy()
        dz2[np.arange(n), y_true] -= 1
        dz2 /= n

        dW2 = self.a1.T @ dz2
        db2 = dz2.sum(axis=0)

        da1 = dz2 @ self.W2.T
        dz1 = da1 * (self.z1 > 0)  # ReLU gradient

        dW1 = self.X.T @ dz1
        db1 = dz1.sum(axis=0)

        # Update
        self.W1 -= self.lr * dW1
        self.b1 -= self.lr * db1
        self.W2 -= self.lr * dW2
        self.b2 -= self.lr * db2

    def loss(self, y_true):
        return -np.log(self.probs[np.arange(len(y_true)), y_true] + 1e-7).mean()

    def accuracy(self, y_true):
        return (self.probs.argmax(axis=1) == y_true).mean()

# Dataset
from sklearn.datasets import make_classification
X, y = make_classification(n_samples=500, n_features=8, n_classes=3,
                            n_informative=6, n_redundant=0, random_state=42)
X = (X - X.mean(0)) / X.std(0)

net = TwoLayerNet(8, 64, 3, lr=0.05)

print(f"{'Epoch':>6} | {'Loss':>8} | {'Accuracy':>10}")
print("-" * 32)
for epoch in range(1, 201):
    probs = net.forward(X)
    net.backward(y)
    if epoch % 25 == 0 or epoch == 1:
        print(f"{epoch:>6} | {net.loss(y):>8.4f} | {net.accuracy(y):>10.4f}")
`
      }
    ]
  },
  {
    title: "PyTorch Fundamentals",
    sub: "Tensors, autograd, nn.Module, training loops",
    track: 2, duration: "3 hr", tag: "lab",
    content: `
<h2>PyTorch: The Framework of Choice</h2>
<p>PyTorch is the dominant framework for AI research and increasingly for production. It provides: automatic differentiation via <code>autograd</code>, GPU-accelerated tensor operations, a module system for building networks, and an ecosystem covering vision, NLP, audio, and more.</p>
<h2>Tensors</h2>
<p>Tensors are like NumPy arrays but with two superpowers: they can run on GPU, and they can track gradients. A scalar is a 0D tensor, a vector is 1D, a matrix is 2D. Most operations are identical to NumPy.</p>
<div class="callout warning"><span class="callout-icon">⚠️</span><div><strong>In-browser limitation</strong><p>Pyodide doesn't ship PyTorch (it's too large). The exercises below show real PyTorch code — study and run the pure NumPy equivalents to understand the concepts, then run PyTorch in a local Jupyter or Colab environment.</p></div></div>
<h2>nn.Module Pattern</h2>
<p>Every PyTorch model inherits from <code>nn.Module</code>. Register layers in <code>__init__</code>, define the forward pass in <code>forward()</code>. PyTorch automatically tracks parameters for the optimizer.</p>`,
    exercises: [
      {
        title: "PyTorch Concepts in NumPy",
        task: "Simulate PyTorch's tensor + autograd behavior using NumPy. Build a linear layer class with manual gradient computation, then verify it matches the analytical gradient.",
        code: `import numpy as np

# Simulating PyTorch's computational graph manually

class Tensor:
    """Minimal autograd tensor."""
    def __init__(self, data, requires_grad=False):
        self.data = np.array(data, dtype=float)
        self.requires_grad = requires_grad
        self.grad = None
        self._backward = lambda: None

    def __matmul__(self, other):
        out = Tensor(self.data @ other.data, requires_grad=True)
        def _backward():
            if self.requires_grad:
                if self.grad is None: self.grad = np.zeros_like(self.data)
                self.grad += out.grad @ other.data.T
            if other.requires_grad:
                if other.grad is None: other.grad = np.zeros_like(other.data)
                other.grad += self.data.T @ out.grad
        out._backward = _backward
        return out

    def __add__(self, other):
        out = Tensor(self.data + other.data, requires_grad=True)
        def _backward():
            if self.requires_grad:
                if self.grad is None: self.grad = np.zeros_like(self.data)
                self.grad += out.grad
            if other.requires_grad:
                if other.grad is None: other.grad = np.zeros_like(other.data)
                other.grad += out.grad.sum(axis=0)  # sum over batch
        out._backward = _backward
        return out

    def mse_loss(self, target):
        diff = self.data - target.data
        loss_val = np.mean(diff ** 2)
        loss = Tensor(loss_val)
        loss.grad = np.array(1.0)
        def _backward():
            if self.requires_grad:
                if self.grad is None: self.grad = np.zeros_like(self.data)
                self.grad += (2 / self.data.size) * diff
        loss._backward = _backward
        self._backward = _backward
        return loss

# Demonstrate: linear layer y = XW + b, MSE loss
np.random.seed(42)
X = Tensor(np.random.randn(4, 3))
W = Tensor(np.random.randn(3, 2) * 0.1, requires_grad=True)
b = Tensor(np.zeros(2), requires_grad=True)
y_true = Tensor(np.random.randn(4, 2))

# Forward: z = X @ W + b
z = X @ W + b
loss = z.mse_loss(y_true)
loss._backward()

print("Forward pass complete")
print(f"Output shape: {z.data.shape}")
print(f"MSE Loss: {loss.data:.6f}")
print(f"dL/dW shape: {W.grad.shape if W.grad is not None else 'not computed'}")

# Compare to analytical gradient
diff = z.data - y_true.data
analytical_dW = (2 / z.data.size) * X.data.T @ diff
print(f"\nAnalytical dL/dW matches autograd: {np.allclose(W.grad, analytical_dW)}")
`
      },
      {
        title: "Neural Network Training Loop Pattern",
        task: "Implement the canonical PyTorch training loop pattern using NumPy. This is the exact pattern you'll use with real PyTorch.",
        code: `import numpy as np

np.random.seed(42)

# This mirrors the PyTorch training loop exactly:
# model = MyNet()
# optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)
# for epoch in range(epochs):
#     for X_batch, y_batch in dataloader:
#         optimizer.zero_grad()
#         pred = model(X_batch)
#         loss = loss_fn(pred, y_batch)
#         loss.backward()
#         optimizer.step()

# NumPy implementation of the same pattern:

class LinearNet:
    def __init__(self, sizes, lr=0.01):
        self.weights = []
        self.biases = []
        for i in range(len(sizes)-1):
            s = np.sqrt(2/sizes[i])
            self.weights.append(np.random.randn(sizes[i], sizes[i+1]) * s)
            self.biases.append(np.zeros(sizes[i+1]))
        self.lr = lr
        self.cache = []

    def forward(self, X):
        self.cache = [X]
        a = X
        for i, (W, b) in enumerate(zip(self.weights[:-1], self.biases[:-1])):
            z = a @ W + b
            a = np.maximum(0, z)  # ReLU
            self.cache.append((z, a))
        # Output layer (linear)
        logits = a @ self.weights[-1] + self.biases[-1]
        return logits

    def softmax_ce_loss(self, logits, y):
        e = np.exp(logits - logits.max(1, keepdims=True))
        probs = e / e.sum(1, keepdims=True)
        n = len(y)
        loss = -np.log(probs[np.arange(n), y] + 1e-7).mean()
        dlogits = probs.copy()
        dlogits[np.arange(n), y] -= 1
        dlogits /= n
        return loss, probs, dlogits

    def zero_grad(self):
        self.grads_W = [np.zeros_like(W) for W in self.weights]
        self.grads_b = [np.zeros_like(b) for b in self.biases]

    def backward(self, dlogits):
        da = dlogits
        for i in range(len(self.weights)-1, -1, -1):
            a_prev = self.cache[i] if i == 0 else self.cache[i][1]
            self.grads_W[i] = a_prev.T @ da
            self.grads_b[i] = da.sum(0)
            if i > 0:
                da = da @ self.weights[i].T * (self.cache[i][0] > 0)

    def step(self):
        for i in range(len(self.weights)):
            self.weights[i] -= self.lr * self.grads_W[i]
            self.biases[i] -= self.lr * self.grads_b[i]

# Dataset
from sklearn.datasets import make_classification
X, y = make_classification(400, n_features=8, n_classes=3,
                            n_informative=6, n_redundant=0, random_state=0)
X = (X - X.mean(0)) / X.std(0)

model = LinearNet([8, 64, 32, 3], lr=0.03)
BATCH = 32

print(f"{'Epoch':>5} | {'Loss':>7} | {'Acc':>7}")
for epoch in range(1, 101):
    # Shuffle
    idx = np.random.permutation(len(X))
    X, y = X[idx], y[idx]

    for start in range(0, len(X), BATCH):
        Xb = X[start:start+BATCH]
        yb = y[start:start+BATCH]

        logits = model.forward(Xb)
        loss, probs, dlogits = model.softmax_ce_loss(logits, yb)
        model.zero_grad()
        model.backward(dlogits)
        model.step()

    if epoch % 20 == 0 or epoch == 1:
        logits = model.forward(X)
        _, probs, _ = model.softmax_ce_loss(logits, y)
        acc = (logits.argmax(1) == y).mean()
        print(f"{epoch:>5} | {loss:>7.4f} | {acc:>7.4f}")
`
      }
    ]
  },
  {
    title: "Transformers & Self-Attention",
    sub: "Attention mechanism, multi-head attention, positional encoding",
    track: 2, duration: "3 hr", tag: "new",
    content: `
<h2>The Attention Revolution</h2>
<p>In 2017, "Attention Is All You Need" replaced RNNs with a purely attention-based architecture. This enabled GPT, BERT, and every modern LLM. Understanding attention is understanding the foundation of modern AI.</p>
<h2>Self-Attention Intuition</h2>
<p>For each token, attention asks: "which other tokens in the sequence are relevant to understanding this token?" It computes weighted averages of all token representations, where weights come from learned similarity scores.</p>
<p>Three matrices are learned: <strong>Query (Q)</strong> — "what am I looking for?", <strong>Key (K)</strong> — "what do I contain?", <strong>Value (V)</strong> — "what do I return if selected?"</p>
<p>Attention score: <code>Attention(Q,K,V) = softmax(QKᵀ / √d_k) · V</code></p>
<div class="callout info"><span class="callout-icon">💡</span><div><strong>Scaling Factor</strong><p>We divide by √d_k to prevent dot products from growing too large (which would push softmax into saturation where gradients vanish).</p></div></div>
<h2>Causal Masking</h2>
<p>In language modeling (GPT-style), tokens can only attend to previous tokens — not future ones. This is implemented by masking future positions to -∞ before softmax, making them zero weight after softmax.</p>`,
    exercises: [
      {
        title: "Self-Attention from Scratch",
        task: "Implement the scaled dot-product self-attention mechanism from scratch using NumPy. Verify the output shapes and that attention weights sum to 1.",
        code: `import numpy as np

np.random.seed(42)

def scaled_dot_product_attention(Q, K, V, mask=None):
    """
    Q, K, V: (batch, heads, seq_len, d_k)
    Returns: (batch, heads, seq_len, d_k), attention weights
    """
    d_k = Q.shape[-1]

    # Compute attention scores: (batch, heads, seq, seq)
    scores = Q @ K.transpose(0, 1, 3, 2) / np.sqrt(d_k)

    # Optional causal mask (for decoder)
    if mask is not None:
        scores = np.where(mask, -1e9, scores)

    # Softmax over last dimension (attending positions)
    scores_stable = scores - scores.max(axis=-1, keepdims=True)
    attn_weights = np.exp(scores_stable)
    attn_weights = attn_weights / attn_weights.sum(axis=-1, keepdims=True)

    # Weighted sum of values
    output = attn_weights @ V

    return output, attn_weights

# Test
batch_size = 2
n_heads = 4
seq_len = 6
d_k = 16  # dimension per head
d_model = n_heads * d_k  # 64

# Random inputs
X = np.random.randn(batch_size, seq_len, d_model)

# Linear projections (W_Q, W_K, W_V)
W_Q = np.random.randn(d_model, d_model) * 0.1
W_K = np.random.randn(d_model, d_model) * 0.1
W_V = np.random.randn(d_model, d_model) * 0.1

# Project and reshape to (batch, heads, seq, d_k)
def project(X, W, n_heads, d_k):
    B, T, D = X.shape
    out = X @ W  # (B, T, D)
    return out.reshape(B, T, n_heads, d_k).transpose(0, 2, 1, 3)

Q = project(X, W_Q, n_heads, d_k)
K = project(X, W_K, n_heads, d_k)
V = project(X, W_V, n_heads, d_k)

print(f"Q, K, V shapes: {Q.shape}")

# Run attention
output, weights = scaled_dot_product_attention(Q, K, V)
print(f"Output shape: {output.shape}")
print(f"Attn weights sum to 1: {np.allclose(weights.sum(-1), 1)}")
print(f"\nAttention weights for batch 0, head 0:")
print(np.round(weights[0, 0], 3))
`
      },
      {
        title: "Causal Attention (GPT-Style)",
        task: "Add causal masking to self-attention so each position can only attend to previous positions. This is the key difference between GPT (decoder) and BERT (encoder) architectures.",
        code: `import numpy as np

np.random.seed(42)

def causal_self_attention(X, W_Q, W_K, W_V, W_O):
    """
    Full causal (masked) self-attention for a GPT-like decoder.
    X: (batch, seq_len, d_model)
    """
    B, T, D = X.shape
    n_heads = 4
    d_k = D // n_heads

    def project_multihead(x, W):
        proj = x @ W  # (B, T, D)
        return proj.reshape(B, T, n_heads, d_k).transpose(0, 2, 1, 3)

    Q = project_multihead(X, W_Q)
    K = project_multihead(X, W_K)
    V = project_multihead(X, W_V)

    # Causal mask: upper triangle = True (masked out)
    mask = np.triu(np.ones((T, T), dtype=bool), k=1)  # (T, T)

    # Attention scores
    scores = Q @ K.transpose(0, 1, 3, 2) / np.sqrt(d_k)
    scores = np.where(mask[None, None, :, :], -1e9, scores)

    # Softmax
    scores -= scores.max(-1, keepdims=True)
    weights = np.exp(scores)
    weights /= weights.sum(-1, keepdims=True)

    # Output
    attn_out = weights @ V  # (B, heads, T, d_k)
    # Concat heads
    attn_out = attn_out.transpose(0, 2, 1, 3).reshape(B, T, D)
    output = attn_out @ W_O  # Final projection

    return output, weights

# Test
B, T, D = 2, 8, 64
X = np.random.randn(B, T, D)
W_Q = np.random.randn(D, D) * 0.02
W_K = np.random.randn(D, D) * 0.02
W_V = np.random.randn(D, D) * 0.02
W_O = np.random.randn(D, D) * 0.02

out, weights = causal_self_attention(X, W_Q, W_K, W_V, W_O)

print(f"Output shape: {out.shape}")
print(f"\nCausal attention weights (head 0, position 0-4):")
w = weights[0, 0, :5, :5]  # batch 0, head 0, first 5 positions
print(np.round(w, 3))
print("\nNotice: upper triangle is 0 (future positions masked)")
print("Each position only attends to itself and previous positions")
`
      }
    ]
  },
  {
    title: "Fine-Tuning LLMs with LoRA",
    sub: "Hugging Face, LoRA/QLoRA, PEFT, SFTTrainer",
    track: 2, duration: "3 hr", tag: "new",
    content: `
<h2>Large Language Models</h2>
<p>Modern LLMs (GPT-4, Llama-3, Mistral) have billions of parameters. Full fine-tuning is prohibitively expensive. <strong>Parameter-Efficient Fine-Tuning (PEFT)</strong> methods like LoRA adapt a model using only a tiny fraction of trainable parameters.</p>
<h2>LoRA: Low-Rank Adaptation</h2>
<p>Instead of updating the full weight matrix W (which is huge), LoRA adds two small matrices: <code>W' = W + BA</code> where B is (d, r) and A is (r, d), and r << d. Only A and B are trained. For a 7B parameter model, LoRA with rank 16 might train only ~8M parameters — a 1000× reduction.</p>
<div class="concept-grid">
  <div class="concept-card"><div class="concept-term">r (rank)</div><div class="concept-def">Bottleneck dimension. Higher = more capacity but more params. Typical: 4-64.</div></div>
  <div class="concept-card"><div class="concept-term">alpha (α)</div><div class="concept-def">Scaling factor for LoRA output. Usually set to r or 2r.</div></div>
  <div class="concept-card"><div class="concept-term">target_modules</div><div class="concept-def">Which linear layers to apply LoRA to. Usually q_proj, v_proj.</div></div>
  <div class="concept-card"><div class="concept-term">QLoRA</div><div class="concept-def">LoRA + 4-bit quantization. Allows fine-tuning 7B+ models on 12GB GPU.</div></div>
</div>
<div class="callout tip"><span class="callout-icon">✅</span><div><strong>Practical Guide</strong><p>For domain adaptation (fine-tuning on your company's data), LoRA rank 8-16 is usually sufficient. For strong instruction following, rank 64 with a larger dataset.</p></div></div>`,
    exercises: [
      {
        title: "LoRA Math from Scratch",
        task: "Implement the LoRA weight decomposition in NumPy. Show how the trainable parameters compare to the full weight matrix, and simulate a forward pass through a LoRA-adapted linear layer.",
        code: `import numpy as np

np.random.seed(42)

class LoRALayer:
    """
    LoRA-adapted linear layer: out = x @ (W + B @ A) + bias
    Only A and B are trainable; W is frozen.
    """
    def __init__(self, in_features, out_features, rank=4, alpha=8):
        self.in_features = in_features
        self.out_features = out_features
        self.rank = rank
        self.scale = alpha / rank

        # Frozen pre-trained weight
        self.W = np.random.randn(in_features, out_features) * 0.02
        self.bias = np.zeros(out_features)

        # Trainable LoRA matrices
        # A: initialized with random Gaussian (fan_in)
        self.lora_A = np.random.randn(in_features, rank) * np.sqrt(2/in_features)
        # B: initialized with zeros (so initial LoRA output = 0)
        self.lora_B = np.zeros((rank, out_features))

    @property
    def trainable_params(self):
        return self.lora_A.size + self.lora_B.size

    @property
    def total_params(self):
        return self.W.size + self.bias.size

    def forward(self, x):
        # Standard path (frozen)
        main_out = x @ self.W + self.bias
        # LoRA delta (trainable)
        lora_delta = (x @ self.lora_A @ self.lora_B) * self.scale
        return main_out + lora_delta

    def effective_weight(self):
        """What the full effective weight matrix looks like."""
        return self.W + self.scale * (self.lora_A @ self.lora_B)

# Simulate a transformer attention projection (d_model=768)
d_model = 768
layer = LoRALayer(d_model, d_model, rank=16, alpha=32)

print(f"Layer: {d_model} → {d_model}")
print(f"Full weight params:     {layer.total_params:>10,}")
print(f"LoRA trainable params:  {layer.trainable_params:>10,}")
print(f"Param reduction:        {layer.total_params/layer.trainable_params:>10.1f}×")
print(f"Trainable fraction:     {layer.trainable_params/layer.total_params:>10.4%}")

# Forward pass
batch_size, seq_len = 4, 32
X = np.random.randn(batch_size, seq_len, d_model)
out = layer.forward(X.reshape(-1, d_model))
print(f"\nForward pass: {X.shape} → {out.shape}")

# Show LoRA delta is initially small (B=0 init)
delta = X.reshape(-1, d_model) @ layer.lora_A @ layer.lora_B * layer.scale
print(f"Initial LoRA delta magnitude: {np.abs(delta).mean():.6f} (near zero)")
print("After training, B learns to encode the task-specific adaptation")
`
      },
      {
        title: "Hugging Face Code Walkthrough",
        task: "Study and annotate the key parts of a LoRA fine-tuning script. Add detailed comments explaining each step, then modify hyperparameters to understand their effect.",
        code: `# LoRA Fine-Tuning Script Reference
# (Run in Colab/Jupyter with GPU — simulated here for study)

# ──────────────────────────────────────────────────────────────
# STEP 1: Load base model in 4-bit (QLoRA)
# ──────────────────────────────────────────────────────────────
# from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
# import torch
#
# bnb_config = BitsAndBytesConfig(
#     load_in_4bit=True,           # Quantize to 4-bit (saves ~4x memory)
#     bnb_4bit_use_double_quant=True,  # Extra compression
#     bnb_4bit_quant_type="nf4",   # NormalFloat4 — best for LLM weights
#     bnb_4bit_compute_dtype=torch.bfloat16  # Compute in bf16 for speed
# )
#
# model = AutoModelForCausalLM.from_pretrained(
#     "mistralai/Mistral-7B-v0.1",
#     quantization_config=bnb_config,
#     device_map="auto"            # Automatically place on GPU
# )
# tokenizer = AutoTokenizer.from_pretrained("mistralai/Mistral-7B-v0.1")

# ──────────────────────────────────────────────────────────────
# STEP 2: Configure LoRA
# ──────────────────────────────────────────────────────────────
# from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
#
# model = prepare_model_for_kbit_training(model)
#
# lora_config = LoraConfig(
#     r=16,                        # Rank — bottleneck dimension
#     lora_alpha=32,               # Scale = alpha/r = 2.0
#     target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],  # Attention layers
#     lora_dropout=0.05,           # Regularization
#     bias="none",                 # Don't add bias to LoRA layers
#     task_type="CAUSAL_LM"        # Language modeling task
# )
#
# model = get_peft_model(model, lora_config)
# model.print_trainable_parameters()
# # Output: trainable params: 20,971,520 || all params: 3,774,873,600 (0.56%)

# ──────────────────────────────────────────────────────────────
# STEP 3: Format your dataset
# ──────────────────────────────────────────────────────────────
# dataset format for instruction fine-tuning:
# {"text": "<s>[INST] {instruction} [/INST] {response} </s>"}

def format_prompt(instruction, response):
    return f"<s>[INST] {instruction} [/INST] {response} </s>"

examples = [
    ("What is gradient descent?", "Gradient descent is an optimization algorithm that minimizes a loss function by iteratively moving in the direction of the negative gradient."),
    ("Explain backpropagation.", "Backpropagation computes gradients using the chain rule, flowing the error signal backward through the network from output to input."),
]

for inst, resp in examples:
    print(format_prompt(inst, resp))
    print()

# ──────────────────────────────────────────────────────────────
# STEP 4: Training configuration
# ──────────────────────────────────────────────────────────────
training_config = {
    "learning_rate": 2e-4,        # Higher than full fine-tuning — adapters are small
    "per_device_train_batch_size": 4,
    "gradient_accumulation_steps": 4,  # Effective batch = 16
    "num_train_epochs": 3,
    "warmup_ratio": 0.03,
    "lr_scheduler_type": "cosine",
    "fp16": True,                 # Mixed precision training
    "logging_steps": 10,
    "save_steps": 100,
    "eval_steps": 100,
}

print("Training config:")
for k, v in training_config.items():
    print(f"  {k}: {v}")

effective_batch = training_config["per_device_train_batch_size"] * training_config["gradient_accumulation_steps"]
print(f"\nEffective batch size: {effective_batch}")
`
      }
    ]
  },
  {
    title: "RAG Systems & AI Agents",
    sub: "Embeddings, vector DBs, LangChain, tool-use agents",
    track: 2, duration: "3 hr",
    content: `
<h2>Retrieval-Augmented Generation (RAG)</h2>
<p>LLMs have a knowledge cutoff and can't access your private data. RAG grounds LLM responses in retrieved documents. The workflow: embed documents → store in vector DB → at query time, retrieve similar docs → pass as context to LLM.</p>
<h3>RAG Pipeline</h3>
<ol>
<li><strong>Chunk</strong> documents into manageable pieces (500-1000 tokens)</li>
<li><strong>Embed</strong> each chunk using a sentence transformer model</li>
<li><strong>Store</strong> embeddings + text in a vector database (Chroma, Pinecone, Qdrant)</li>
<li><strong>Retrieve</strong> top-k most similar chunks for each query</li>
<li><strong>Generate</strong> answer using LLM with retrieved context</li>
</ol>
<h2>AI Agents</h2>
<p>Agents extend LLMs with tools — the LLM decides which tool to call, calls it, observes the result, and continues reasoning. This enables: web search, code execution, database queries, API calls.</p>
<div class="callout info"><span class="callout-icon">💡</span><div><strong>ReAct Pattern</strong><p>Reason + Act: the LLM alternates between reasoning steps ("I need to search for X") and action steps (calling the search tool). This structured loop is the foundation of most agent frameworks.</p></div></div>`,
    exercises: [
      {
        title: "Cosine Similarity & Retrieval",
        task: "Implement cosine similarity and a simple nearest-neighbor retrieval system — the core of every vector database. Use it to retrieve the most relevant documents for a query.",
        code: `import numpy as np

def cosine_similarity(a, b):
    """Cosine similarity between two vectors."""
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b) + 1e-8)

def cosine_similarity_matrix(query, corpus):
    """Similarity between one query and all corpus vectors."""
    query_norm = query / (np.linalg.norm(query) + 1e-8)
    corpus_norm = corpus / (np.linalg.norm(corpus, axis=1, keepdims=True) + 1e-8)
    return corpus_norm @ query_norm

class SimpleVectorStore:
    def __init__(self, dim=64):
        self.dim = dim
        self.embeddings = []
        self.documents = []

    def add(self, text, embedding):
        self.documents.append(text)
        self.embeddings.append(embedding)

    def query(self, query_embedding, top_k=3):
        if not self.embeddings:
            return []
        corpus = np.array(self.embeddings)
        scores = cosine_similarity_matrix(query_embedding, corpus)
        top_indices = np.argsort(scores)[::-1][:top_k]
        return [(self.documents[i], float(scores[i])) for i in top_indices]

# Simulate embeddings (in real life: sentence-transformers or OpenAI embeddings)
np.random.seed(42)
dim = 32

# Knowledge base: AI topics
docs = [
    "Transformers use self-attention to process sequences in parallel",
    "Gradient descent minimizes loss by following the negative gradient",
    "Backpropagation computes gradients using the chain rule",
    "Convolutional neural networks are used for image recognition tasks",
    "LSTM networks solve the vanishing gradient problem in RNNs",
    "Transfer learning reuses pre-trained model weights for new tasks",
    "Attention mechanisms allow models to focus on relevant parts of input",
    "Regularization techniques like dropout prevent overfitting",
    "Batch normalization stabilizes training by normalizing layer inputs",
    "The softmax function converts logits to probability distributions",
]

# Simulate: topics about attention get similar embeddings
def fake_embed(text):
    """Fake embeddings with topic clusters."""
    base = np.random.randn(dim) * 0.1
    if "attention" in text.lower() or "transformer" in text.lower():
        base[:8] += 2.0
    elif "gradient" in text.lower() or "backprop" in text.lower():
        base[8:16] += 2.0
    elif "convolution" in text.lower() or "image" in text.lower():
        base[16:24] += 2.0
    return base / np.linalg.norm(base)

store = SimpleVectorStore(dim)
for doc in docs:
    store.add(doc, fake_embed(doc))

# Query the store
queries = [
    "How does the attention mechanism work?",
    "How do neural networks learn from data?",
]

for q in queries:
    q_emb = fake_embed(q)
    results = store.query(q_emb, top_k=3)
    print(f"Query: '{q}'")
    for text, score in results:
        print(f"  [{score:.3f}] {text}")
    print()
`
      },
      {
        title: "Simple ReAct Agent",
        task: "Build a basic ReAct (Reason + Act) agent that uses a set of Python tools to answer questions. The agent selects tools, runs them, and synthesizes an answer.",
        code: `import numpy as np
import math
import re
from datetime import datetime

# ── TOOL DEFINITIONS ─────────────────────────────────────────────
def calculator(expression: str) -> str:
    """Evaluate a mathematical expression."""
    try:
        # Safe eval: only math operations
        allowed = {k: getattr(math, k) for k in dir(math) if not k.startswith('_')}
        allowed.update({'abs': abs, 'round': round, 'min': min, 'max': max})
        result = eval(expression, {"__builtins__": {}}, allowed)
        return f"{result}"
    except Exception as e:
        return f"Error: {e}"

def get_current_date(_: str) -> str:
    """Get today's date."""
    return datetime.now().strftime("%Y-%m-%d")

def lookup_fact(topic: str) -> str:
    """Look up a fact from knowledge base."""
    kb = {
        "gpt-4": "GPT-4 is OpenAI's multimodal LLM with ~1.8T parameters (estimated), released March 2023.",
        "transformer": "Transformers use self-attention, introduced in 'Attention Is All You Need' (Vaswani et al., 2017).",
        "python": "Python was created by Guido van Rossum, first released in 1991.",
        "backpropagation": "Backpropagation was popularized by Rumelhart et al. in 1986 for training neural networks.",
        "relu": "ReLU (Rectified Linear Unit) = max(0, x). Introduced to solve vanishing gradients.",
    }
    topic_lower = topic.lower()
    for key, val in kb.items():
        if key in topic_lower:
            return val
    return f"No information found about '{topic}'"

TOOLS = {
    "calculator": (calculator, "Evaluate math expressions. Input: expression string."),
    "get_date": (get_current_date, "Get today's date. Input: empty string."),
    "lookup": (lookup_fact, "Look up facts about AI topics. Input: topic name."),
}

# ── REACT AGENT ───────────────────────────────────────────────────
def react_agent(question: str, max_steps: int = 5) -> str:
    """Simple ReAct agent: Reason → Act → Observe → repeat."""
    print(f"\n{'='*60}")
    print(f"Question: {question}")
    print(f"{'='*60}")

    # Simple rule-based "reasoning" (in real life: LLM call)
    def select_tool(q: str):
        q = q.lower()
        if any(op in q for op in ['+','-','*','/','sqrt','**','calculate','compute','sum','product']):
            # Extract the expression
            expr_match = re.search(r'[\d\s\+\-\*/\(\)\.\^sqrt]+', q)
            expr = q.replace('calculate','').replace('compute','').replace('what is','').strip()
            return "calculator", expr
        elif "date" in q or "today" in q or "current time" in q:
            return "get_date", ""
        elif any(kw in q for kw in ["gpt","transformer","python","backprop","relu"]):
            return "lookup", q
        return None, None

    observations = []
    for step in range(1, max_steps+1):
        print(f"\nStep {step}: Reasoning...")
        tool_name, tool_input = select_tool(question)

        if not tool_name:
            print(f"  → No tool needed. Answering directly.")
            break

        print(f"  → Action: {tool_name}({repr(tool_input[:50])})")
        fn, desc = TOOLS[tool_name]
        result = fn(tool_input)
        print(f"  → Observation: {result}")
        observations.append(f"{tool_name}: {result}")
        break  # Simple agent: one tool call is enough

    # Synthesize answer
    if observations:
        return f"Based on {', '.join(observations)} — I can answer: {observations[-1]}"
    return "I can answer directly based on my training knowledge."

# Run agent on sample questions
questions = [
    "What is sqrt(144) + 5 * 8?",
    "Tell me about the transformer architecture",
    "What is today's date?",
]

for q in questions:
    answer = react_agent(q)
    print(f"\nFinal Answer: {answer}")
`
      }
    ]
  },
  {
    title: "Capstone: Build an LLM-Powered App",
    sub: "Full-stack AI pipeline — fine-tune, RAG, agents, deploy",
    track: 2, duration: "5 hr", tag: "project",
    content: `
<h2>Capstone Project</h2>
<p>This capstone ties together everything from the course. You'll design and document a complete LLM-powered application — the same architecture used in production AI products.</p>
<h3>Project: Domain-Specific AI Assistant</h3>
<p>Build an AI assistant for a specific domain (choose one: medical, legal, coding, finance, education). The system combines a fine-tuned LLM + RAG pipeline + agent tools.</p>
<h3>Architecture Components</h3>
<div class="concept-grid">
  <div class="concept-card"><div class="concept-term">Data Pipeline</div><div class="concept-def">Collect, clean, and format domain data for fine-tuning + RAG.</div></div>
  <div class="concept-card"><div class="concept-term">Fine-Tuned LLM</div><div class="concept-def">Base model (Mistral-7B / Llama-3-8B) + LoRA adapters trained on domain data.</div></div>
  <div class="concept-card"><div class="concept-term">RAG Pipeline</div><div class="concept-def">Domain documents → chunks → embeddings → vector DB → retriever.</div></div>
  <div class="concept-card"><div class="concept-term">Agent Layer</div><div class="concept-def">LLM + tools (search, calculator, DB lookup) with ReAct reasoning.</div></div>
  <div class="concept-card"><div class="concept-term">API Layer</div><div class="concept-def">FastAPI endpoint: receives queries, runs pipeline, returns responses.</div></div>
  <div class="concept-card"><div class="concept-term">Evaluation</div><div class="concept-def">BLEU/ROUGE for generation, RAG hit rate, agent task success rate.</div></div>
</div>
<div class="callout tip"><span class="callout-icon">🎓</span><div><strong>You've Made It</strong><p>If you've completed all 25 lessons and exercises, you have the foundation to build real AI systems. The next step: pick a project, open a Colab notebook, and build it.</p></div></div>`,
    exercises: [
      {
        title: "Architecture Design Document",
        task: "Write a complete architecture design for your domain-specific AI assistant. Include: system components, data flow, model choices, and trade-offs.",
        code: `# CAPSTONE: Domain-Specific AI Assistant Architecture
# ════════════════════════════════════════════════════════
# Fill in YOUR choices for each section below

DOMAIN = "coding assistant"  # Change: medical, legal, finance, education, etc.

architecture = {
    # ─── DATA LAYER ─────────────────────────────────────
    "data_sources": [
        "Stack Overflow Q&A (XML dump)",
        "GitHub code documentation (scraped)",
        "Python docs (official)",
        "Domain-specific textbooks (PDF → text)"
    ],
    "chunk_size": 512,          # tokens per RAG chunk
    "chunk_overlap": 64,        # overlap to preserve context

    # ─── EMBEDDING MODEL ─────────────────────────────────
    "embedding_model": "sentence-transformers/all-MiniLM-L6-v2",  # 384-dim
    "embedding_dim": 384,
    "vector_db": "chromadb",    # Local; or Pinecone/Qdrant for production

    # ─── BASE LLM ─────────────────────────────────────────
    "base_model": "mistralai/Mistral-7B-Instruct-v0.2",
    "quantization": "4-bit NF4 (QLoRA)",
    "estimated_gpu_memory": "~6GB (4-bit + LoRA activations)",

    # ─── LORA CONFIG ──────────────────────────────────────
    "lora_rank": 16,
    "lora_alpha": 32,
    "lora_target": ["q_proj", "k_proj", "v_proj", "o_proj"],
    "trainable_params_pct": "~0.5%",
    "training_data_size": 50_000,   # instruction-response pairs
    "training_epochs": 3,

    # ─── AGENT TOOLS ──────────────────────────────────────
    "tools": [
        "code_executor: run Python snippets safely",
        "doc_search: search codebase docs",
        "web_search: search StackOverflow via API",
        "explain_error: analyze tracebacks",
    ],

    # ─── API LAYER ────────────────────────────────────────
    "framework": "FastAPI",
    "endpoints": [
        "POST /chat — main conversation endpoint",
        "GET /health — health check",
        "POST /feedback — thumbs up/down for RLHF",
    ],
    "latency_target_p95": "< 3 seconds",

    # ─── EVALUATION ───────────────────────────────────────
    "metrics": {
        "code_correctness": "execution success rate",
        "rag_hit_rate": "% queries with relevant retrieval",
        "user_satisfaction": "thumbs up/down ratio",
        "latency_p50_p95": "50th/95th percentile latency",
    }
}

# Print architecture summary
print(f"Domain: {DOMAIN.upper()}")
print("=" * 50)
for section, value in architecture.items():
    if isinstance(value, list):
        print(f"\n{section}:")
        for item in value:
            print(f"  • {item}")
    elif isinstance(value, dict):
        print(f"\n{section}:")
        for k, v in value.items():
            print(f"  {k}: {v}")
    else:
        print(f"{section}: {value}")
`
      },
      {
        title: "End-to-End Mini Pipeline",
        task: "Implement a complete (simplified) AI pipeline: document indexing → query → retrieval → generation → response. This is the full RAG flow in ~100 lines.",
        code: `import numpy as np
import re
from datetime import datetime

np.random.seed(42)

# ─────────────────────────────────────────────────────────────────
# 1. DOCUMENT STORE (simulates ChromaDB)
# ─────────────────────────────────────────────────────────────────
class DocumentStore:
    def __init__(self):
        self.docs = []
        self.embeddings = []

    def fake_embed(self, text):
        """Fake embeddings with topic clusters."""
        dim = 32
        v = np.random.randn(dim) * 0.1
        keywords = {
            "attention transformer": slice(0, 6),
            "gradient loss train": slice(6, 12),
            "neural network layer": slice(12, 18),
            "data preprocess feature": slice(18, 24),
            "deploy api production": slice(24, 30),
        }
        for kw_group, sl in keywords.items():
            if any(kw in text.lower() for kw in kw_group.split()):
                v[sl] += 3.0
        return v / (np.linalg.norm(v) + 1e-8)

    def add_documents(self, documents):
        for doc in documents:
            self.docs.append(doc)
            self.embeddings.append(self.fake_embed(doc["content"]))
        print(f"Indexed {len(documents)} documents ({len(self.docs)} total)")

    def search(self, query, top_k=3):
        q_emb = self.fake_embed(query)
        matrix = np.array(self.embeddings)
        scores = matrix @ q_emb
        top_idx = np.argsort(scores)[::-1][:top_k]
        return [(self.docs[i], float(scores[i])) for i in top_idx]

# ─────────────────────────────────────────────────────────────────
# 2. KNOWLEDGE BASE
# ─────────────────────────────────────────────────────────────────
knowledge_base = [
    {"id": "t1", "content": "Transformers use self-attention to process all tokens in parallel, unlike RNNs which are sequential."},
    {"id": "t2", "content": "The attention formula is: Attention(Q,K,V) = softmax(QK^T / sqrt(d_k)) * V"},
    {"id": "t3", "content": "Multi-head attention runs attention in parallel with different projections, then concatenates results."},
    {"id": "g1", "content": "Gradient descent minimizes loss by computing gradients and stepping opposite to the gradient direction."},
    {"id": "g2", "content": "Backpropagation efficiently computes gradients using the chain rule across all layers."},
    {"id": "g3", "content": "Learning rate determines step size. Too large: diverges. Too small: slow convergence."},
    {"id": "n1", "content": "A neural network layer computes: output = activation(W * input + b)"},
    {"id": "n2", "content": "ReLU activation: max(0, x). Solves vanishing gradients. Default for hidden layers."},
    {"id": "d1", "content": "Data preprocessing: normalize features, handle missing values, encode categoricals."},
    {"id": "p1", "content": "FastAPI is used to serve ML models as REST APIs. Use @app.post('/predict') for inference endpoints."},
    {"id": "p2", "content": "Docker containerizes ML applications for reproducible deployment across environments."},
]

# ─────────────────────────────────────────────────────────────────
# 3. LLM SIMULATOR (replaces actual LLM call)
# ─────────────────────────────────────────────────────────────────
def simulate_llm(prompt: str, context: str) -> str:
    """Simulates LLM response based on retrieved context."""
    if not context.strip():
        return "I don't have enough context to answer that question confidently."

    # Extract key facts from context
    sentences = [s.strip() for s in context.split('.') if len(s.strip()) > 20]
    if sentences:
        return f"Based on the retrieved knowledge: {sentences[0]}. " + \
               (f"Additionally, {sentences[1]}." if len(sentences) > 1 else "")
    return f"Based on context: {context[:200]}"

# ─────────────────────────────────────────────────────────────────
# 4. RAG PIPELINE
# ─────────────────────────────────────────────────────────────────
class RAGPipeline:
    def __init__(self, store, top_k=3):
        self.store = store
        self.top_k = top_k

    def answer(self, query: str) -> dict:
        start = datetime.now()

        # Retrieve
        results = self.store.search(query, self.top_k)

        # Build context
        context = "\n".join(f"[{doc['id']}] {doc['content']}" for doc, score in results if score > 0.1)

        # Generate
        response = simulate_llm(query, context)

        latency = (datetime.now() - start).total_seconds() * 1000

        return {
            "query": query,
            "response": response,
            "sources": [doc["id"] for doc, _ in results[:3]],
            "top_scores": [round(s, 3) for _, s in results[:3]],
            "latency_ms": round(latency, 2),
        }

# ─────────────────────────────────────────────────────────────────
# 5. RUN THE PIPELINE
# ─────────────────────────────────────────────────────────────────
store = DocumentStore()
store.add_documents(knowledge_base)
rag = RAGPipeline(store, top_k=3)

test_queries = [
    "How does the attention mechanism work?",
    "What is gradient descent and how does it learn?",
    "How do I deploy a model to production?",
]

print()
for query in test_queries:
    result = rag.answer(query)
    print(f"Q: {result['query']}")
    print(f"A: {result['response']}")
    print(f"Sources: {result['sources']} | Scores: {result['top_scores']} | {result['latency_ms']}ms")
    print()
`
      }
    ]
  },
];
