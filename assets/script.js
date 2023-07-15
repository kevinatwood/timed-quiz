var timeLeft = document.querySelector("#time-left");
var startButton = document.querySelector("#start-quiz");
var startContainerEl = document.querySelector("#start-container")
var seconds = 101
var quizContainerEl = document.querySelector("#quiz-container")
var choicesListEl = document.querySelector("#choices-list")
var questionEl = document.querySelector("#question")
var footer = document.querySelector("#feedback")
var scoreboardContainerEl = document.querySelector("#scoreboard-container")
var scoreboard = document.querySelector("#scoreboard")
var enterInitalsContainerEl = document.querySelector("#enter-initials")
var timerInterval ;
var submitBtn= document.querySelector("#submit-btn"); 
var input = document.querySelector("#initials-inpt"); 
var scores =  JSON.parse(localStorage.getItem("scoreInfo")) || [];
var playAgainBtn = document.querySelector("#play-again");
var highScores = document.querySelector("#high-scores");
const questions = [
    {
        question: "What is JavaScript?",
        answers: ["A programming language" , "A book about coffee" , "A language they write in the land of Java", "Your mother's maiden name"],
        correctAnswer: 0 
    },
    {
        question: "What is an array?",
        answers: ["A galaxy far, far away" , "A popular song from the 1980s" , "A collection of data items", "A critically acclaimed but commercially unsuccessful movie"],
        correctAnswer: 2
    },
    {
        question: "What is a JavaScript function?",
        answers: ["A party that JavaScript throws once a year" , "A block of code designed to perform a particular task" , "A way to get revenge on your enemies", "Your downfall"],
        correctAnswer: 1
    }
]
var currentQuestionNum = 0;

//Start timer 
function startTimer(){
        timerInterval = setInterval( function(){
        seconds--
        timeLeft.textContent = seconds

        if (seconds === 0){
            clearInterval(timerInterval);
            endGame()
            
        } else if (seconds < 0){
            timeLeft.textContent = 0
            clearInterval(timerInterval);
        }

    }, 1000)
}


// display questions and options
function initQuestion() {
    const currentQuestion = questions[currentQuestionNum];
     if (currentQuestionNum < questions.length){
    quizContainerEl.setAttribute("class", "visible")
    questionEl.textContent = currentQuestion.question;
    choicesListEl.textContent = ""
    startContainerEl.setAttribute("class" , "hidden");
    for (var i = 0; i < currentQuestion.answers.length; i++) {
      var li = document.createElement("li");
      li.textContent = currentQuestion.answers[i];
      li.setAttribute("data-idx", i);
      choicesListEl.appendChild(li);
    }
    } else {
        timeLeft.textContent = seconds
        clearInterval(timerInterval);
        endGame();
    }

  }
// add class to correct question
  function handleAnswerQuestion(evt) {
    const currentQuestion = questions[currentQuestionNum];
    const correctAnswer = currentQuestion.correctAnswer;
    var target = evt.target;
    var idx = target.getAttribute("data-idx");
    if (idx == correctAnswer) {
      footer.textContent = "you are correct!";
      currentQuestionNum++
      initQuestion()
    } else  {
      footer.textContent = "you are wrong!";
      seconds -= 15
      currentQuestionNum++
      initQuestion()
    } 
  }
  
//   Get and display scores from local storage on screen, sorted in descending order
function getScores(){
     var storedScores = JSON.parse(localStorage.getItem("scoreInfo")) || []
    
    if (storedScores !== null){

        scores = storedScores.sort((a,b) => {
            return b.score - a.score;
        });
        console.log(storedScores)
        console.log(scores)
    }
    scoreboardContainerEl.setAttribute("class", "visible")
    startContainerEl.setAttribute("class", "hidden")
    enterInitalsContainerEl.setAttribute("class", "hidden")
    quizContainerEl.setAttribute("class", "hidden")
    clearInterval(timerInterval)
    timeLeft.textContent = 0
    scoreboard.innerHTML = "";
    console.log(scores)
    for (var i = 0; i < scores.length; i++){
        var scoreEl = scores[i];
        var li = document.createElement("li");
        li.textContent = "Name: " + scoreEl.initials  + " Score: " + scoreEl.score;
        scoreboard.appendChild(li);
        console.log(scoreEl)
        console.log(li)

    }
}

// brings user back to start page
function playAgain (){
    currentQuestionNum = 0
    seconds = 101
    scoreboardContainerEl.setAttribute("class", "hidden")
    quizContainerEl.setAttribute("class", "hidden")
    startContainerEl.setAttribute("class", "visible")
}
// ends the game and brings up a screen where the user can enter their name to add themselves to the leaderboard
function endGame(){
    quizContainerEl.setAttribute("class", "hidden")
    enterInitalsContainerEl.setAttribute("class", "visible")
    submitBtn.textContent = "Submit"
    var scoreReport = document.querySelector("#score-report")
    scoreReport.textContent = "Score =" + seconds
    input.value = ""
    submitBtn.addEventListener("click", function(event){
        var scoreInfo = {
            initials: input.value.trim(),
            score: seconds
        }
        scores.push(scoreInfo)
        localStorage.setItem("scoreInfo", JSON.stringify(scores))
        enterInitalsContainerEl.setAttribute("class", "hidden")
        getScores()
    })
    
}

//start quiz function and adds event listeners
function startQuiz(){
    footer.textContent= ""
    startTimer()
    initQuestion();
}
    startButton.addEventListener("click" , startQuiz)
    choicesListEl.addEventListener("click", handleAnswerQuestion);
    playAgainBtn.addEventListener("click", playAgain)
    highScores.addEventListener("click", getScores)