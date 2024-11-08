import { backend } from 'declarations/backend';

let currentWord = '';
let score = 0;
let totalWords = 0;

const wordDisplay = document.getElementById('word-display');
const userInput = document.getElementById('user-input');
const submitBtn = document.getElementById('submit-btn');
const nextWordBtn = document.getElementById('next-word-btn');
const result = document.getElementById('result');
const scoreDisplay = document.getElementById('score');
const loading = document.getElementById('loading');
const gameArea = document.getElementById('game-area');

async function getNewWord() {
    showLoading();
    currentWord = await backend.getRandomWord();
    wordDisplay.textContent = "Listen to the word and type it below:";
    userInput.value = '';
    userInput.disabled = false;
    submitBtn.disabled = false;
    nextWordBtn.classList.add('d-none');
    result.textContent = '';
    hideLoading();
}

async function checkSpelling() {
    showLoading();
    const userSpelling = userInput.value.trim();
    const isCorrect = await backend.checkSpelling(currentWord, userSpelling);
    
    if (isCorrect) {
        result.textContent = "Correct!";
        result.className = "text-success mt-3";
        score++;
    } else {
        result.textContent = `Incorrect. The correct spelling is: ${currentWord}`;
        result.className = "text-danger mt-3";
    }
    
    totalWords++;
    updateScore();
    
    userInput.disabled = true;
    submitBtn.disabled = true;
    nextWordBtn.classList.remove('d-none');
    hideLoading();
}

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}/${totalWords}`;
}

function showLoading() {
    loading.classList.remove('d-none');
    gameArea.classList.add('d-none');
}

function hideLoading() {
    loading.classList.add('d-none');
    gameArea.classList.remove('d-none');
}

submitBtn.addEventListener('click', checkSpelling);
nextWordBtn.addEventListener('click', getNewWord);

// Start the game
getNewWord();
