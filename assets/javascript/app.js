// Array of Questions // 
var triviaQuestions = [{
    question: "In what state is it illegal to catch mice?",
    choices: ["Nebraska", "California", "Ohio", "Florida"],
    correctAnswer: 2
  }//,{
  //  question: "What is the largest animal currently on Earth?",
  //  choices: ["Whale Shark", "Great White Shark", "Blue Whale", "Fin Whale"],
  //  correctAnswer: 2
  //},{
  //  question: "The oceans cover what percent of the Earth's surface?",
  //  choices: ["90", "80", "70", "50"],
  //  correctAnswer: 2
  //},{
  //  question: "What type of water is more dense?",
  //  choices: ["Equator, hot water", "Polar, cold water", "Water close to the shore", "All water has the same density"],
  //  correctAnswer: 1
  //},{
  //  question: "How many hearts does a giant squid have?",
  //  choices: ["Two", "Three", "Four", "Five"],
  //  correctAnswer: 1
  //},{
  //  question: "How many tentacles does an octopus have?",
  //  choices: ["Nine", "Six", "Four", "Eight"],
  //  correctAnswer: 3
  //}
];
var resultMessages = {
  correct: "Great job! You got the answer right!",
  incorrect: "Bummer - you guessed the wrong answer. Better luck next time.",
  timeUp: "Ruh roh...you ran out of time!",
  atGameEnd: "Whew! You're done...Let's take a look at your results:"
}
var currentQuestion = 0;
var correctAnswers = 0;
var wrongAnswers = 0;
var unansweredQuestions = 0;
var userChoice;
var answered;


$(document).ready(function() {
  $('#play-again-button').hide();
  $("#start-button").on("click", function(){
    $(this).hide();
    resetGame();
  });
  $('#play-again-button').on("click", function() {
    $(this).hide();
    resetGame();
  })
})

function resetGame() {
  $('#end-message').empty();
  $('#final-number-correct').empty();
  $('#final-number-incorrect').empty();
  $('#final-number-unanswered').empty();

  var currentQuestion = 0;
  var correctAnswers = 0;
  var wrongAnswers = 0;
  var unansweredQuestions = 0;
  var userChoice;
  var answered;
  questionCycle();
}

function questionCycle() {
  answered = true;
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
// Function to set up timer and count down from 15 seconds //
// ======================================================= //
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
  var answerAlert = $('<div>');
  var correctAnswerIndex = triviaQuestions[currentQuestion].correctAnswer;
  var correctAnswerText = triviaQuestions[currentQuestion].choices[triviaQuestions[currentQuestion].correctAnswer];
  if ((userChoice == triviaQuestions[currentQuestion].correctAnswer) && (answered == true)) {
    answerAlert.addClass('alert');
    answerAlert.attr('role', 'alert');
    answerAlert.text('You got the answer right!')
    $('#result-message').append(answerAlert);
    correctAnswers++;
  } else if ((userChoice != triviaQuestions[currentQuestion].correctAnswer) && (answered == true)) {
    answerAlert.addClass('alert');
    answerAlert.attr('role', 'alert');
    answerAlert.text('You got the answer wrong!');
    $('#corrected-answer').text("The correct answer was...." + correctAnswerText)
    $('#result-message').append(answerAlert);
    wrongAnswers++;
  } else {
    unansweredQuestions++;
    answerAlert.addClass('alert');
    answerAlert.attr('role', 'alert');
    answerAlert.text('Oh no! You ran out of time...');
    $('#corrected-answer').text("The correct answer was...." + correctAnswerText)
    $('#result-message').append(answerAlert);
  }

  if (currentQuestion == (triviaQuestions.length-1)){
		setTimeout(endGame, 5000)
	} else {
    currentQuestion++
    setTimeout(function() {
      $('#result-message').empty();
      questionCycle();
      $('#corrected-answer').empty();
    }, 3000)
	}
}

function endGame() {
  $('#timer').empty();
  $('#result-message').empty();
  $('#corrected-answer').empty();

  $('#end-message').html('<h2>' + resultMessages.atGameEnd)
  $('#final-number-correct').html('<h3>Correct: ' + correctAnswers)
  $('#final-number-incorrect').html('<h3>Incorrect: ' + wrongAnswers)
  $('#final-number-unanswered').html('<h3>Unanswered: ' + unansweredQuestions)
  $('#play-again-button').show();
}