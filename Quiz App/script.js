const questionElement = document.getElementById('question');
const options = document.querySelectorAll('.option');
const nextBtn = document.getElementById('next-btn');
const previousBtn = document.getElementById('previous-btn');
const resultContainer = document.getElementById('result');
const scoreElement = document.getElementById('score');
const retryBtn = document.getElementById('retry-btn');
const correctAnswersContainer = document.getElementById('correct-answers');

const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        answer: "Mars"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "J.K. Rowling", "George Orwell", "Mark Twain"],
        answer: "Harper Lee"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    },
    {
        question: "How many continents are there?",
        options: ["5", "6", "7", "8"],
        answer: "7"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
        answer: "Leonardo da Vinci"
    },
    {
        question: "What is the speed of light?",
        options: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "200,000 km/s"],
        answer: "300,000 km/s"
    },
    {
        question: "What is the smallest country in the world?",
        options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
        answer: "Vatican City"
    },
    {
        question: "Who was the first President of the United States?",
        options: ["George Washington", "Abraham Lincoln", "Thomas Jefferson", "John Adams"],
        answer: "George Washington"
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["O2", "H2O", "CO2", "O3"],
        answer: "H2O"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let answers = [];

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    options.forEach((option, index) => {
        option.textContent = currentQuestion.options[index];
        option.disabled = false;
        option.classList.remove('correct', 'incorrect');
    });
    
    nextBtn.style.display = 'none';
    previousBtn.style.display = currentQuestionIndex === 0 ? 'none' : 'inline-block';
}

function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedOption.textContent === correctAnswer) {
        selectedOption.classList.add('correct');
        score++;
    } else {
        selectedOption.classList.add('incorrect');
    }
}

function handleOptionClick(event) {
    checkAnswer(event.target);
    nextBtn.style.display = 'block';
    options.forEach(option => option.disabled = true);
}

function handleNextClick() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function handlePreviousClick() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function showResult() {
    document.getElementById('quiz').style.display = 'none';
    resultContainer.style.display = 'block';
    scoreElement.textContent = score;

    correctAnswersContainer.innerHTML = questions.map((q, index) => {
        return `<p>Question ${index + 1}: ${q.answer}</p>`;
    }).join('');
}

function retryQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    answers = [];
    resultContainer.style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    loadQuestion();
}

options.forEach(option => option.addEventListener('click', handleOptionClick));
nextBtn.addEventListener('click', handleNextClick);
previousBtn.addEventListener('click', handlePreviousClick);
retryBtn.addEventListener('click', retryQuiz);

loadQuestion();
