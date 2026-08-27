// Selecting HTML elements
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time-left');
const startBtn = document.getElementById('start-btn');

// Game variables
let score = 0;
let timeLeft = 30;
let lastHole = null;
let gameTimer = null;
let moleTimer = null;

// Function to get a random hole
function getRandomHole() {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];
    if (hole === lastHole) {
        return getRandomHole();
    }
    lastHole = hole;
    return hole;
}

// Function to show mole randomly
function popMole() {
    const time = Math.floor(Math.random() * 400) + 600;
    const hole = getRandomHole();
    hole.classList.add('up');

    moleTimer = setTimeout(function() {
        hole.classList.remove('up');
        if (timeLeft > 0) {
            popMole();
        }
    }, time);
}

// Function to start game
function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft + "s";
    startBtn.disabled = true;

    holes.forEach(function(hole) {
        hole.classList.remove('up');
    });

    popMole();

    gameTimer = setInterval(function() {
        timeLeft--;
        timeDisplay.textContent = timeLeft + "s";

        if (timeLeft <= 0) {
            clearInterval(gameTimer);
            clearTimeout(moleTimer);
            holes.forEach(function(hole) {
                hole.classList.remove('up');
            });
            startBtn.disabled = false;
            alert("Game Over! Your final score is: " + score);
        }
    }, 1000);
}

// Click event for hitting moles
moles.forEach(function(mole) {
    mole.addEventListener('click', function(e) {
        const parentHole = e.target.parentElement;
        if (parentHole.classList.contains('up')) {
            score++;
            scoreDisplay.textContent = score;
            parentHole.classList.remove('up');
        }
    });
});

// Start button click listener
startBtn.addEventListener('click', startGame);