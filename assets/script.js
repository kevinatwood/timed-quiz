var timeLeft = document.querySelector("#time-left");
var startButton = document.querySelector("#start-quiz");
var seconds = 101
var choicesContainerEl = document.querySelector("#choices-container")
var choicesListEl = document.querySelector("#choices-list")
var questionEl = document.querySelector("#question")
var questionText = document.querySelector("#question-text")



//Start timer 
function startTimer(){
    var timerInterval = setInterval( function(){
        seconds--
        timeLeft.textContent = seconds

        if (seconds === 0){
            clearInterval(timerInterval);
            //add function to end game
        }

    }, 1000)
}
//Display first question and choices

function questionOne(){
    questionEl.textContent = "Question One"
    startButton.setAttribute("class" , "hidden")
    questionText.setAttribute("class", "visible")
    questionText.textContent = "What is JavaScript?"

    
}

//Get choice clicked on, determine if correct or not. If correct, continue to next question. If incorrect, deduct time from timer. 

//once time runs out or questions are over, player can enter initals in a score screen. Score is time remaining time

//add event listener to start game on button press
function startQuiz(){
    startTimer()
    questionOne()
}
startButton.addEventListener("click" , startQuiz)