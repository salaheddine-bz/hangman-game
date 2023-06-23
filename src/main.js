// make keyboard letters :
let keyboardLetters = "qwertyuiopasdfghjklzxcvbnm";
let keyboard = document.querySelector(".keyboard");

Array.from(keyboardLetters).forEach(letter => {
    let spanLetter = document.createElement("span");
    let spanText = document.createTextNode(letter);
    spanLetter.appendChild(spanText);
    keyboard.appendChild(spanLetter);
})


let score = localStorage.getItem("score");

// Get word from JSON File :
let url = '/words2.json';

fetch(url)
    .then(result => {
        return result.json();
    })
    .then(
        data => {
            // random Categories :
            let categoriesArray = Object.keys(data);
            let randomCategory = categoriesArray[Math.floor(Math.random() * categoriesArray.length)];
            let randomCategoryArray = data[`${randomCategory}`];
            // random Words :
            let randomWord = randomCategoryArray[Math.floor(Math.random() * randomCategoryArray.length)];

            // add category name to div category :
            let divCategory = document.querySelector(".category span");
            divCategory.innerHTML = randomCategory;


            // convert word to array :
            let wordArray = Array.from(randomWord.toLowerCase());


            // make guess letters :
            let word = document.querySelector(".word");
            wordArray.forEach((letter) => {
                let letterSpan = document.createElement("span");
                word.appendChild(letterSpan);

                // class for space letter span :
                if (letter === " ") {
                    letterSpan.classList = "space-letter";
                }
            });

            let myRog = document.querySelector(".figure-container");

            let livesArray = Array.from("💟💟💟💟💟💟💟💟");
            let lettersCorrect = 0;

            // add lives hearts to lives div :
            let livesDiv = document.querySelector(".lives span");
            livesDiv.innerHTML = livesArray.join("");

            let letterSpans = document.querySelectorAll(".word span");

            // remove spaces from word :
            let wordWithoutSpace = randomWord.replaceAll(/\s/g, "");

            // keyboard
            let keyboardSpans = document.querySelectorAll(".keyboard span");
            keyboardSpans.forEach(span => {
                span.addEventListener("click", (e) => {
                    let mistakes = true;
                    wordArray.forEach((letter, indexWordLetter) => {

                        // make the clicked element unclickable
                        e.target.classList = "clicked";

                        // if a letter in the wordArray equal to clicked element value :
                        if (letter === e.target.innerHTML) {
                            // if we dont make a mistake the value of mistakes variable will be false :
                            mistakes = false;

                            // play sound of win
                            document.getElementById("win").play();

                            letterSpans.forEach((letterSpan, indexLetterSpan) => {
                                if (indexLetterSpan === indexWordLetter) {
                                    // set the correct letter in the match span :
                                    letterSpan.innerHTML = letter;
                                    letterSpan.className = "correct";

                                    // count how much letter we find :
                                    lettersCorrect++;
                                }
                            });
                        };
                    });

                    // if we made a mistake :
                    if (mistakes === true) {
                        // remove one heart :
                        livesArray.length--;
                        myRog.classList.add(`mistake${livesArray.length}`);

                        // play sound of mistake :
                        document.getElementById("loose").play();
                    };

                    // append hearts to lives div :
                    livesDiv.innerHTML = livesArray.join("");

                    // if you find the word :
                    if (lettersCorrect === wordWithoutSpace.length) {
                        livesDiv.innerHTML = `the word is ${randomWord}`;
                        livesDiv.classList.add("winner");
                        keyboard.classList.add("win");
                        score++;
                        localStorage.setItem("score",score);
                        endGame("You win","green");
                    };

                    // if your make 8 mistakes :
                    if (livesArray.length === 0) {
                        livesDiv.innerHTML = `the word is ${randomWord}`;
                        livesDiv.classList.add("loser");
                        keyboard.classList.add("loose");
                        score--
                        localStorage.setItem("score",score);
                        endGame("Game Over : you loose","red");
                    };

                });
            });
        }

    );

// pop up end game
function endGame(result,myColor) {
    let popUp = document.querySelector(".pop-up");
    setTimeout(() => {
        popUp.style.display = "flex";
    }, 2000);
    popUp.children[0].innerHTML = result;
    popUp.children[0].style.color = myColor;
    popUp.children[1].addEventListener("click", () => {
        window.location.reload();
    });
};
if (score !== null) {
    document.querySelector(".score").innerHTML = `${localStorage.getItem("score")}`
}