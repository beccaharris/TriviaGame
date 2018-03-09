// Array of Questions // 
var triviaQuestions = [{
    question: "What is the world's largest ocean?",
    choices: ["The Pacific", "The Atlantic", "The Indian", "The Arctic"],
    correctAnswer: 0
  },{
    question: "What is the largest animal currently on Earth?",
    choices: ["Whale Shark", "Great White Shark", "Blue Whale", "Fin Whale"],
    correctAnswer: 2
  },{
    question: "The oceans cover what percent of the Earth's surface?",
    choices: ["90", "80", "70", "50"],
    correctAnswer: 2
  },{
    question: "What type of water is more dense?",
    choices: ["Equator, hot water", "Polar, cold water", "Water close to the shore", "All water has the same density"],
    correctAnswer: 1
  },{
    question: "How many hearts does a giant squid have?",
    choices: ["Two", "Three", "Four", "Five"],
    correctAnswer: 1
  },{
    question: "How many tentacles does an octopus have?",
    choices: ["Nine", "Six", "Four", "Eight"],
    correctAnswer: 3
  }
];
var currentQuestion = 0;
var questionChoices = 0;
var correctAnswers = 0;
var wrongAnswers = 0;

var callCurrentChoices = triviaQuestions[currentQuestion].choices;
var callCorrectAns = triviaQuestions[currentQuestion].correctAnswer;

$(document).ready(function() {
  $("#start-button").on("click", function(){
    $(this).hide();
    questionCycle();
    console.log(triviaQuestions[currentQuestion].correctAnswer)

  });
})

function questionCycle() {
  // Set up questions & answers // 
  $('#question-display').html('<h3>' + triviaQuestions[currentQuestion].question + '</h3>');
  for (var i = 0; i < callCurrentChoices.length; i++) {
    var choices = $('<div>');
    choices.attr('data-index', i);
    choices.addClass('answer-choice');
    choices.text(triviaQuestions[currentQuestion].choices[i]);
    $('#choices').append(choices);
  }
  // Start timer//
  countdown();
  // Pause the timer when an answer is chosen && give variable userChoice a value //
  $('.answer-choice').on('click', function() {
    userChoice = $(this).data('index');
    clearInterval(other);
    console.log(userChoice);
    showAnswer();
  })
}
// ********************************************** //
// Function to set up timer and count down from 15 seconds //
// ********************************************** //
function countdown(){
	time = 15;
	$('#timer').html('<h3>Time Remaining: ' + time + '</h3>');
  other = setInterval(startCount, 1000);
  function startCount() {
    if (time < 1) {
      clearInterval(other);
    } else {
      time--;
      $('#timer').html('<h3>Time Remaining: ' + time + '</h3>')
    }
  }
}

function showAnswer() {
  $('#question-display').empty();
  $('#choices').empty();
  var answerAlert = $('<div>')
  if ( userChoice == triviaQuestions[currentQuestion].correctAnswer) {
    answerAlert.addClass('alert alert-success');
    answerAlert.attr('role', 'alert');
    answerAlert.text('You got the answer right!')
    $('#result').append(answerAlert);
    correctAnswers++;
    console.log(correctAnswers)
  } else {
    answerAlert.addClass('alert alert-danger');
    answerAlert.attr('role', 'alert');
    answerAlert.text('You got the answer wrong!')
    $('#result').append(answerAlert);
    wrongAnswers++;
    console.log(wrongAnswers)
  }

  if (currentQuestion == (triviaQuestions.length-1)){
		setTimeout(endGame, 5000)
	} else {
    currentQuestion++
    setTimeout(questionCycle, 3000);
    setTimeout(function() {
      $('.alert').remove();
    }, 3000)
	}
}

function endGame() {
  alert("Game is over!")
}

