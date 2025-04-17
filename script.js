const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correct: "Paris"
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correct: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: ["Central Style Sheets", "Cascading Style Sheets", "Coded Style System", "Cool Style Syntax"],
    correct: "Cascading Style Sheets"
  }
];

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next');
const quizContainer = document.getElementById('quiz-container');

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null; // Track selected answer

function loadQuestion() {
  const currentQuiz = quizData[currentQuestion];
  questionEl.textContent = currentQuiz.question;
  optionsEl.innerHTML = '';
  selectedAnswer = null;
  nextBtn.disabled = true;

  currentQuiz.options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.classList.add('option-btn');
    btn.addEventListener('click', () => {
      selectAnswer(btn);
    });
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(btn) {
  // Deselect previous buttons
  document.querySelectorAll('.option-btn').forEach(button => {
    button.classList.remove('selected');
  });

  // Mark current button as selected
  btn.classList.add('selected');
  selectedAnswer = btn.textContent;
  nextBtn.disabled = false;
}

nextBtn.addEventListener('click', () => {
  if (!selectedAnswer) return;

  const correctAnswer = quizData[currentQuestion].correct;
  const allButtons = document.querySelectorAll('.option-btn');

  // Highlight correct/incorrect
  allButtons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.style.backgroundColor = 'lightgreen';
    } else if (btn.textContent === selectedAnswer) {
      btn.style.backgroundColor = 'salmon';
    }
  });

  if (selectedAnswer === correctAnswer) {
    score++;
  }

  nextBtn.disabled = true;

  setTimeout(() => {
    if (currentQuestion === quizData.length - 1) {
      showScore();
    } else {
      currentQuestion++;
      loadQuestion();
    }
  }, 1000);
});

function showScore() {
  quizContainer.innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>Your Score: ${score} / ${quizData.length}</p>
    <button onclick="location.reload()">Restart Quiz</button>
  `;
}

// Start quiz
loadQuestion();





