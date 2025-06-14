// Quiz Data
const quizData = [
  {
    question: "Which HTML tag is used to define a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    correct: "<a>"
  },
  {
    question: "What CSS property sets the background color?",
    options: ["color", "background-color", "bg-color", "background"],
    correct: "background-color"
  },
  {
    question: "Which JavaScript keyword declares a variable?",
    options: ["var", "variable", "v", "letvar"],
    correct: "var"
  },
  {
    question: "What does DOM stand for in JavaScript?",
    options: [
      "Document Object Model",
      "Data Object Model",
      "Document Order Model",
      "Dynamic Object Model"
    ],
    correct: "Document Object Model"
  }
];

// Celebration Jokes for Winners
const celebrationJokes = [
  "Why did the web developer stay calm during the quiz? Because they knew how to *style* under pressure! 😎",
  "What did the JavaScript say after winning the quiz? 'I’m a *function*-ing champion!' 🎉",
  "Why was the HTML tag happy after the quiz? Because it finally found its *closing* match! 🥳",
  "How did the CSS celebrate the quiz win? By adding some *flex* to its victory dance! 💃"
];

// DOM Elements
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const resultElement = document.getElementById("result");
const nextButton = document.getElementById("next-btn");
const jokeContainer = document.getElementById("joke-container");
const celebrationSection = document.getElementById("celebration");
const celebrationJokeElement = document.getElementById("celebration-joke");
const progressBar = document.getElementById("progress");
const scoreElement = document.getElementById("score");

let currentQuestion = 0;
let score = 0;
let answered = false;

// Confetti Setup
const confettiSettings = {
  target: "confetti-canvas",
  max: 150,
  size: 1,
  animate: true,
  props: ["circle", "square", "triangle"],
  colors: [[165, 104, 245], [230, 61, 135], [0, 199, 190], [254, 214, 0]],
  clock: 25,
  rotate: true,
  width: window.innerWidth,
  height: window.innerHeight
};
let confetti;

// Update Progress Bar
function updateProgress() {
  const progressPercentage = ((currentQuestion + 1) / quizData.length) * 100;
  progressBar.style.width = `${progressPercentage}%`;
}

// Animate Score
function animateScore(newScore) {
  let start = score - 1 >= 0 ? score - 1 : 0;
  const end = newScore;
  const duration = 500;
  const startTime = performance.now();

  function update() {
    const elapsed = performance.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const currentScore = Math.floor(start + (end - start) * progress);
    scoreElement.textContent = `Score: ${currentScore}`;
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}

// Load Question
function loadQuestion() {
  answered = false;
  nextButton.classList.add("hidden");
  resultElement.textContent = "";
  celebrationSection.classList.add("hidden");
  if (confetti) confetti.clear();

  const q = quizData[currentQuestion];
  questionElement.textContent = q.question;
  optionsElement.innerHTML = "";
  q.options.forEach(option => {
    const button = document.createElement("button");
    button.className = "w-full px-4 py-3 text-white font-semibold rounded-lg shadow-md";
    button.textContent = option;
    button.addEventListener("click", () => checkAnswer(option));
    optionsElement.appendChild(button);
  });
  updateProgress();
}

// Check Answer
function checkAnswer(selected) {
  if (answered) return;
  answered = true;
  const q = quizData[currentQuestion];
  if (selected === q.correct) {
    score++;
    resultElement.textContent = "Correct! 🎉";
    resultElement.style.color = "#28a745";
    animateScore(score);
  } else {
    resultElement.textContent = `Wrong! The correct answer was ${q.correct}.`;
    resultElement.style.color = "#e74c3c";
  }
  nextButton.classList.remove("hidden");
}

// Show Celebration if User Wins
function showCelebration() {
  if (score >= 3) {
    celebrationSection.classList.remove("hidden");
    const randomJoke = celebrationJokes[Math.floor(Math.random() * celebrationJokes.length)];
    celebrationJokeElement.textContent = randomJoke;
    confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
  }
}

// Next Question
nextButton.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    questionElement.textContent = "Quiz Completed!";
    optionsElement.innerHTML = "";
    resultElement.textContent = `Final Score: ${score}/${quizData.length}`;
    nextButton.classList.add("hidden");
    showCelebration();
  }
});

// Fetch Joke from API
async function fetchJoke() {
  try {
    const response = await fetch("https://v2.jokeapi.dev/joke/Any?type=single");
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    jokeContainer.textContent = data.joke || "No joke available.";
  } catch (error) {
    jokeContainer.textContent = "Failed to fetch a joke. Please try again later.";
    console.error("Error fetching joke:", error);
  }
}

// Initialize
loadQuestion();
fetchJoke();