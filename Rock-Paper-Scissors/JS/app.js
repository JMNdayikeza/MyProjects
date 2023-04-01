let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

function main(){
    rock_div.addEventListener("click", function(){
        game("r");
    });

    paper_div.addEventListener("click", function(){
        game("p");
    });

    scissors_div.addEventListener("click", function(){
        game("s");
    });
}

function convertToWord(letter) {
    if (letter === "r") return "Rock";
    if (letter === "p") return "Paper";
    if (letter === "s") return "Scissors";
}

function win(userChoice, computerChoice) {
    userScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    const smallUserWord = "user".fontsize(3).sub();
    const smallComputerWord = "computer".fontsize(3).sub();
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} beats ${convertToWord(computerChoice)}${smallComputerWord}. You Win !`;
    document.getElementById(userChoice).classList.add("greenGlow");
    setTimeout(function() {document.getElementById(userChoice).classList.remove("greenGlow")}, 500);
}

function lose(userChoice, computerChoice) {
    computerScore++;
    userScore_span.innerHTML = userScore;  
    computerScore_span.innerHTML = computerScore;
    const smallUserWord = "user".fontsize(3).sub();
    const smallComputerWord = "computer".fontsize(3).sub();
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} loses to ${convertToWord(computerChoice)}${smallComputerWord}. You Lose !`;
    document.getElementById(userChoice).classList.add("redGlow");  
    setTimeout(function() {document.getElementById(userChoice).classList.remove("redGlow")}, 500);
}

function draw(userChoice, computerChoice) {
    userScore_span.innerHTML = userScore;  
    computerScore_span.innerHTML = computerScore;
    const smallUserWord = "user".fontsize(3).sub();
    const smallComputerWord = "computer".fontsize(3).sub();
    result_p.innerHTML = `${convertToWord(computerChoice)}${smallComputerWord} equals ${convertToWord(userChoice)}${smallUserWord}`;
    document.getElementById(userChoice).classList.add("orangeGlow");    
    setTimeout(function() {document.getElementById(userChoice).classList.remove("orangeGlow")}, 500);
}

function game(userChoice) {
    const computerChoice = getComputerChoice();
    switch (userChoice + computerChoice) {
        case "rs":
        case "pr":
        case "sp":
            win(userChoice, computerChoice);
            break;
        case "rp":
        case "ps":
        case "sr":
            lose(userChoice, computerChoice);
            break;
        case "rr":
        case "pp":
        case "ss":
            draw(userChoice, computerChoice);
            break;
    }
    
}

function getComputerChoice() {
    const choices = ["r", "p", "s"];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}


main();