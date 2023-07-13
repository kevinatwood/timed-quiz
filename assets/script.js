var timeLeft = document.querySelector("#time-left");
var startButton = document.querySelector("#start-quiz");
var seconds = 101
var choicesContainerEl = document.querySelector("#choices-container")
var quizContainerEl = document.querySelector("#quiz-container")
var choicesListEl = document.querySelector("#choices-list")
var questionEl = document.querySelector("#question")
var questionText = document.querySelector("#question-text")
var optionOne = document.querySelector("#option-one")
var optionTwo = document.querySelector("#option-two")
var optionThree = document.querySelector("#option-three")
var optionFour = document.querySelector("#option-four")
var footer = document.querySelector("#feedback")
var scoreboard = document.querySelector("#scoreboard")
var timerInterval ;
var submitBtn ; 
var input ; 
var scores = [];

//Start timer 
function startTimer(){
        timerInterval = setInterval( function(){
        seconds--
        timeLeft.textContent = seconds

        if (seconds === 0){
            clearInterval(timerInterval);
            
            //add function to end game
        } else if (seconds < 0){
            timeLeft.textContent = 0
            clearInterval(timerInterval);
        }

    }, 1000)
}
//Display first question and choices

function questionOne(){
    questionEl.textContent = "Question One"
    startButton.setAttribute("class" , "hidden")
    questionText.setAttribute("class", "visible")
    questionText.textContent = "What is JavaScript?"
    choicesListEl.setAttribute("class", "visible")
    choicesContainerEl.setAttribute("class", "visible")
    optionOne.textContent = "one"
    optionOne.setAttribute("class", "correct")
    optionTwo.textContent = "two"
    optionTwo.setAttribute("class", "incorrect")
    optionThree.textContent = "three"
    optionThree.setAttribute("class", "incorrect")
    optionFour.textContent = "four"
    optionFour.setAttribute("class", "incorrect")

    choicesContainerEl.addEventListener("click", function (event){
        var element = event.target;
    if (element.matches(".correct") === true){
        footer.textContent = "Correct!"
        return questionTwo()
    } else if (element.matches(".incorrect")){
        footer.textContent = "Incorrect"
        seconds-=15
        return questionTwo()
    }
    })
}

function questionTwo(){
    questionEl.textContent = "Question Two"
    questionText.textContent = "Who is JavaScript?"
    optionOne.textContent = "one"
    optionOne.setAttribute("class", "incorrect")
    optionTwo.textContent = "two"
    optionThree.textContent = "three"
    optionThree.classList.remove("incorrect")
    optionThree.setAttribute("class", "correct")
    optionFour.textContent = "four"

    choicesContainerEl.addEventListener("click", function (event){
        var element = event.target;
    if (element.matches(".correct") === true){
        footer.textContent = "Correct!"
        return questionThree()
    } else if (element.matches(".incorrect")){
        footer.textContent = "Incorrect"
        return questionThree()
    }
    })
}

function questionThree(){
    questionEl.textContent = "Question Three"
    questionText.textContent = "Who is JavaScript made for?"
    optionOne.textContent = "one"
    optionOne.setAttribute("class", "incorrect")
    optionTwo.textContent = "two"
    optionTwo.setAttribute("class", "incorrect")
    optionThree.textContent = "three"
    optionThree.setAttribute("class", "incorrect")
    optionFour.textContent = "four"
    optionFour.setAttribute("class", "correct")

    choicesContainerEl.addEventListener("click", function (event){
        var element = event.target;
    if (element.matches(".correct") === true){
        footer.textContent = "Correct!"
        clearInterval(timerInterval);
        return endGame()
    } else if (element.matches(".incorrect")){
        footer.textContent = "Incorrect"
        clearInterval(timerInterval);
        timeLeft.textContent = seconds
        return endGame()
    }
    })
  
}
function getScores(){
    var storedScores = JSON.parse(localStorage.getItem("scoreInfo"))

    if (storedScores !== null){
        scores = storedScores;
        console.log(storedScores)
        console.log(scores)
    }

    showScores()
}
function showScores(){
    questionEl.textContent = "Scoreboard";
    submitBtn.setAttribute("class" , "hidden")
    choicesContainerEl.setAttribute("class", "visible")
    footer.setAttribute("class", "hidden")
    input.setAttribute("class", "hidden")
    scoreboard.setAttribute("class", "visible")
    questionText.textContent = ""

    scoreboard.innerHTML = "";

    for (var i = 0; i < scores.length; i++){
        var score = scores[i];
        var li =document.createElement("li");
        li.textContent = scores 
        scoreboard.appendChild(li);
        console.log(li)

    }

}
//once time runs out or questions are over, player can enter initals in a score screen. Score is time remaining time
function endGame(){
    footer.setAttribute("class", "visible")
    questionEl.textContent = "Game Over!"
    questionText.textContent = "Enter your initals to save your score!"
    footer.textContent = "Score =" + seconds
     input = document.createElement("input");
    choicesContainerEl.setAttribute("class", "hidden");
    choicesListEl.setAttribute("class", "hidden");
    quizContainerEl.appendChild(input);
    submitBtn = document.createElement("button");
    quizContainerEl.appendChild(submitBtn);
    submitBtn.textContent= "Submit"
    submitBtn.addEventListener("click", function(event){
        var scoreInfo = {
            initials: input.value.trim(),
            score: seconds
        }
        scores.push(scoreInfo)
        localStorage.setItem("scoreInfo", JSON.stringify(scores))
        getScores()
    })
    
}
//add event listener to start game on button press
function startQuiz(){
    startTimer()
    questionOne()
}
startButton.addEventListener("click" , startQuiz)