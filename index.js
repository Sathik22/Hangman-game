const hangmanImage = document.querySelector(".Hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const keyboardDiv = document.querySelector(".keyboard");
const guessesText = document.querySelector(".guesses-text b");
const gameModel = document.querySelector(".game-model");
const playAgainBtn = document.querySelector(".Play-Again");


let currentWord, correctLetters, WrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    //Resetting all game variables and UI elements..
    correctLetters = [];
    WrongGuessCount = 0;
    hangmanImage.src = `images/hangman-${WrongGuessCount}.svg`;
    guessesText.innerText = `${WrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModel.classList.remove("show");

}

const getRandomWord = () => {
    //creating the random word and hint from the wordList
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();

}
const gameOver = (isVictory) => {
    // After 600ms of game complete.. showing modal with relavant details...
    setTimeout(() => {
        const modalText = isVictory ? `You found the word: ` : `The correct word was: `;
        gameModel.querySelector('img').src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModel.querySelector('h4').innerText = `${isVictory ? 'congrats!' : 'Game Over!'}`;
        gameModel.querySelector('p').innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModel.classList.add("show");
    }, 300);
}
//checking if the clicked letter is exit on the current word 
const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        //Showing all correct letters on Display
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    }
    else {
        //If clicked letter does not match then update the worngGuess count and hangamn image
        WrongGuessCount++;
        hangmanImage.src = `images/hangman-${WrongGuessCount}.svg`;

    }
    button.disabled = true;
    guessesText.innerText = `${WrongGuessCount} / ${maxGuesses}`;


    //Calling gameOver function if any of these condition meets.....
    if (WrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
}
//creating the keyboard button and adding event listener
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}
getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
