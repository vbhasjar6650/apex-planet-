// ---------------------------
// Quiz Data
// ---------------------------
const quizData = [
  {
    q: "Which method adds a new item to the end of an array in JavaScript?",
    options: ["shift()", "push()", "unshift()", "pop()"],
    answer: 1
  },
  {
    q: "Which keyword declares a block-scoped variable?",
    options: ["var", "let", "const", "static"],
    answer: 1
  },
  {
    q: "What does === do compared to == in JavaScript?",
    options: [
      "Nothing different",
      "Only compares values, not types",
      "Compares both value and type",
      "Performs bitwise comparison"
    ],
    answer: 2
  },
  {
    q: "Which array method returns a new array with elements that pass a test?",
    options: ["map()", "filter()", "reduce()", "forEach()"],
    answer: 1
  },
  {
    q: "Which DOM API selects the first matching element for a CSS selector?",
    options: ["getElementById", "querySelector", "querySelectorAll", "getElementsByClassName"],
    answer: 1
  }
];

// ---------------------------
// Quiz Logic
// ---------------------------
let current = 0;
let score = 0;
let selectedIndex = null;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const progressEl = document.getElementById("progress");

function renderQuestion() {
  const { q, options } = quizData[current];

  // Reset UI states
  questionEl.textContent = q;
  optionsEl.innerHTML = "";
  resultEl.textContent = "";
  selectedIndex = null;
  nextBtn.disabled = true;

  // Progress
  progressEl.textContent = `Question ${current + 1} of ${quizData.length}`;

  // Render options
  options.forEach((text, idx) => {
    const label = document.createElement("label");
    label.className = "option";
    label.setAttribute("role", "radio");
    label.setAttribute("aria-checked", "false");

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "option";
    input.value = idx;
    input.addEventListener("change", () => {
      selectedIndex = idx;
      nextBtn.disabled = false;
      // Update visual selection
      [...optionsEl.children].forEach(c => c.classList.remove("selected"));
      label.classList.add("selected");
      // ARIA update
      [...optionsEl.children].forEach(c => c.setAttribute("aria-checked", "false"));
      label.setAttribute("aria-checked", "true");
    });

    const span = document.createElement("span");
    span.textContent = text;

    label.appendChild(input);
    label.appendChild(span);
    optionsEl.appendChild(label);
  });

  // Button label
  nextBtn.textContent = current === quizData.length - 1 ? "Finish" : "Next";
}

function handleNext() {
  if (selectedIndex === null) return;

  const correctIndex = quizData[current].answer;
  if (selectedIndex === correctIndex) score++;

  if (current < quizData.length - 1) {
    current++;
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  questionEl.textContent = "Quiz complete!";
  optionsEl.innerHTML = "";
  progressEl.textContent = `You answered ${score} of ${quizData.length} correctly.`;
  resultEl.textContent = score === quizData.length
    ? "Perfect score! 🚀"
    : score >= Math.ceil(quizData.length * 0.7)
      ? "Great job! 💪"
      : "Nice try — review and try again! 📚";
  nextBtn.disabled = true;
  nextBtn.textContent = "Done";
}

nextBtn.addEventListener("click", handleNext);
renderQuestion();

// ---------------------------
// Carousel Logic
// ---------------------------
const track = document.querySelector(".carousel-track");
const slides = Array.from(track.querySelectorAll("img"));
const prev = document.querySelector(".carousel-btn.prev");
const next = document.querySelector(".carousel-btn.next");
const dotsWrap = document.querySelector(".carousel-dots");

let index = 0;

// Build dots
slides.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.className = "dot";
  dot.setAttribute("role", "tab");
  dot.setAttribute("aria-label", `Go to image ${i + 1}`);
  dot.addEventListener("click", () => goTo(i));
  dotsWrap.appendChild(dot);
});

function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;
  const dots = dotsWrap.querySelectorAll(".dot");
  dots.forEach((d, i) => d.classList.toggle("active", i === index));
}

function goTo(i) {
  index = (i + slides.length) % slides.length;
  updateCarousel();
}

prev.addEventListener("click", () => goTo(index - 1));
next.addEventListener("click", () => goTo(index + 1));

// Auto-advance every 5s (pause on hover)
let timer = setInterval(() => goTo(index + 1), 5000);
const viewport = document.querySelector(".carousel-viewport");
viewport.addEventListener("mouseenter", () => clearInterval(timer));
viewport.addEventListener("mouseleave", () => {
  clearInterval(timer);
  timer = setInterval(() => goTo(index + 1), 5000);
});
updateCarousel();

// ---------------------------
// Fetch API Demo (JokeAPI)
// ---------------------------
// Public endpoint: [v2.jokeapi.dev](https://v2.jokeapi.dev/joke/Programming?type=single)
const fetchBtn = document.getElementById("fetch-joke");
const jokeEl = document.getElementById("joke");

async function fetchJoke() {
  jokeEl.textContent = "Loading...";
  try {
    const res = await fetch("[v2.jokeapi.dev](https://v2.jokeapi.dev/joke/Programming?type=single)", {
      headers: { "Accept": "application/json" },
      cache: "no-store"
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data && data.joke) {
      jokeEl.textContent = data.joke;
    } else {
      jokeEl.textContent = "No joke found. Try again.";
    }
  } catch (err) {
    jokeEl.textContent = `Failed to fetch joke. ${err.message}`;
  }
}

fetchBtn.addEventListener("click", fetchJoke);
