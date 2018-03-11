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
var correctAnswers = 0;
var wrongAnswers = 0;
var unansweredQuestions = 0;
var answerAlert = $('<div>');
var userChoice;
var answered;

$(document).ready(function() {
  $("#start-button").on("click", function(){
    $(this).hide();
    questionCycle();
  });
})

function questionCycle() {
  // Set up questions & answers // 
  $('#question-display').html('<h3>' + triviaQuestions[currentQuestion].question + '</h3>');
  for (var i = 0; i < triviaQuestions[currentQuestion].choices.length; i++) {
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
    clearInterval(time);
    answered = true;
    showAnswer();
  })
}
// ********************************************** //
// Function to set up timer and count down from 15 seconds //
// ********************************************** //
function countdown(){
	secondsLeft = 2;
	$('#timer').html('<h4>Time Remaining: ' + secondsLeft + '</h4>');
  time = setInterval(startCount, 1000);
  answered = true;
  function startCount() {
    if (secondsLeft < 1) {
      clearInterval(time);
      answered = false;
      showAnswer();
    } else {
      secondsLeft--;
      $('#timer').html('<h4>Time Remaining: ' + secondsLeft + '</h4>')
    }
  }
}

function showAnswer() {
  $('#question-display').empty();
  $('#choices').empty();
  var correctAnswerIndex = triviaQuestions[currentQuestion].correctAnswer;
  var correctAnswerText = triviaQuestions[currentQuestion].choices[triviaQuestions[currentQuestion].correctAnswer];
  if (userChoice == triviaQuestions[currentQuestion].correctAnswer) {
    answerAlert.addClass('alert alert-success');
    answerAlert.attr('role', 'alert');
    answerAlert.text('You got the answer right!')
    $('#result-message').append(answerAlert);
    correctAnswers++;
  } else if ((userChoice != triviaQuestions[currentQuestion].correctAnswer) && (answered == true)) {
    answerAlert.addClass('alert alert-danger');
    answerAlert.attr('role', 'alert');
    answerAlert.text('You got the answer wrong!')
    $('#result-message').append(answerAlert);
    wrongAnswers++;
  } else {
    unansweredQuestions++;
    answerAlert.addClass('alert alert-primary');
    answerAlert.attr('role', 'alert');
    answerAlert.text('Oh no! You ran out of time...');
    $('#correct-answer').text("The correct answer was...." + correctAnswerText)
    $('#result-message').append(answerAlert);
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

