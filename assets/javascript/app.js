// Array of Questions // 
var triviaQuestions = [{
    question: "What is the world's largest ocean?",
    choices: ["The Pacific Ocean", "The Atlantic Ocean", "The Indian Ocean", "The Arctic Ocean"],
    correctAnswer: 0
  },{
    question: "What is the largest animal currently on Earth?",
    choices: ["Whale Shark", "Great White Shark", "Blue Whale", "Fin Whale"],
    correctAnswer: 2
  },{
    question: "What do walruses use their tusks for?",
    choices: ["Getting themselves out of the water", "Digging for snacks (clams)", "Fighting", "For getting themselves out of water AND digging for snacks"],
    correctAnswer: 3
  },{
    question: "Most scallops have eyes that are what color?",
    choices: ["Orange", "Blue", "White", "Scallops don't have eyes!"],
    correctAnswer: 1
  },{
    question: "How many hearts does a giant squid have?",
    choices: ["Two", "Three", "Four", "Five"],
    correctAnswer: 1
  },{
    question: "How many tentacles does an octopus have?",
    choices: ["Nine", "Six", "Four", "Eight"],
    correctAnswer: 3
  }, {
    question: "The whale shark is: ",
    choices: ["A mammal", "A reptile", "A fish", "A primate"],
    correctAnswer: 2
  }, {
    question: "How many pairs of legs does a crab have?",
    choices: ["12", "2", "8", "5"],
    correctAnswer: 3
  }, {
    question: "How long do seahorses usually live?",
    choices: ["100 - 150 years", "3 - 5 years", "1 month", "15 minutes"],
    correctAnswer: 1
  }, {
    question: "What are eels covered with?",
    choices: ["Mucous", "Scales", "Fins", "Mites"],
    correctAnswer: 0
  }, {
    question: "What is a great white shark's main prey?",
    choices: ["Humans", "Aquatic carnivores (like seals and sea lions)", "Whales", "Any fish"],
    correctAnswer: 1
  },{
    question: "In which ocean are most seals found?",
    choices: ["Pacific", "Indian", "Arctic", "All of the oceans!"],
    correctAnswer: 2
  },{
    question: "Which marine mammals have the thickest coat of fur?",
    choices: ["Polar bears", "Sea otters", "Fur seals", "Sea lions"],
    correctAnswer: 1
  },{
    question: "Which of these marine animals is not a jellyfish?",
    choices: ["Sea nettle", "Sea wasp", "Portuguese Man O' War", "Comb jelly"],
    correctAnswer: 3
  },{
    question: "How many species of cuttlefish are there?",
    choices: ["90", "1", "120", "12"],
    correctAnswer: 2
  }
];
var resultMessages = {
  correct: "Great job! You got the answer right!",
  incorrect: "Bummer - you guessed the wrong answer. Better luck next time.",
  timeUp: "Ruh roh...you ran out of time!",
  atGameEnd: "Whew! You're done...Let's take a look at your results:"
}
var searchGiphs = ["ocean", "blue+whale", "animals+walrus", "ocean+scallops", "ocean+giant+squid", "ocean+baby+octopus", "animal+whale+shark", "ocean+crab", "ocean+colorful+seahorse", "animal+eel", "animal+great+white+shark", "ocean+animal+seal", "animal+sea+otter", "nature-jellyfish", "animal+cuttlefish"]
var currentQuestion;
var correctAnswers;
var wrongAnswers;
var unansweredQuestions;
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

  currentQuestion = 0;
  correctAnswers = 0;
  wrongAnswers = 0;
  unansweredQuestions = 0;
  userChoice;
  answered;
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
	secondsLeft = 15;
	$('#timer').html('<h4 class="text-muted">Time Remaining: ' + secondsLeft + '</h4>');
  time = setInterval(startCount, 1000);
  answered = true;
  function startCount() {
    if (secondsLeft < 1) {
      clearInterval(time);
      answered = false;
      showAnswer();
    } else {
      secondsLeft--;
      $('#timer').html('<h4 class="text-muted">Time Remaining: ' + secondsLeft + '</h4>')
    }
  }
}

function showAnswer() {
  $('#question-display').empty();
  $('#choices').empty();
  var answerAlert = $('<div>');
  var correctAnswerIndex = triviaQuestions[currentQuestion].correctAnswer;
  var correctAnswerText = triviaQuestions[currentQuestion].choices[triviaQuestions[currentQuestion].correctAnswer];
  var giphyURL = "http://api.giphy.com/v1/gifs/search?q=" + searchGiphs[currentQuestion] + "&limit=1&rating=g&api_key=1Pcm3RD1MLLpLwru1GsRqd34UJh96MMs"
	$.ajax({
    url: giphyURL, 
    method: 'GET'
  }).done(function(giphy){
		var currentGif = giphy.data;
		$.each(currentGif, function(index,value){
		  var embedGif = value.images.original.url;
		  giphyGif = $('<img>');
		  giphyGif.attr('src', embedGif);
      giphyGif.addClass('giphy-gif');
		  $('#gif').html(giphyGif);
		});
  });
  
  if ((userChoice == triviaQuestions[currentQuestion].correctAnswer) && (answered == true)) {
    answerAlert.addClass('alert');
    answerAlert.attr('role', 'alert');
    answerAlert.text(resultMessages.correct)
    $('#result-message').append(answerAlert);
    correctAnswers++;
  } else if ((userChoice != triviaQuestions[currentQuestion].correctAnswer) && (answered == true)) {
    answerAlert.addClass('alert');
    answerAlert.attr('role', 'alert');
    answerAlert.text(resultMessages.incorrect);
    $('#corrected-answer').html("The correct answer was: " + correctAnswerText)
    $('#result-message').append(answerAlert);
    wrongAnswers++;
  } else {
    unansweredQuestions++;
    answerAlert.addClass('alert');
    answerAlert.attr('role', 'alert');
    answerAlert.text(resultMessages.timeUp);
    $('#corrected-answer').text("The correct answer was: " + correctAnswerText)
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
      $('#gif').empty();
    }, 3000)
	}
}

function endGame() {
  $('#timer').empty();
  $('#result-message').empty();
  $('#corrected-answer').empty();
  $('#gif').empty();

  $('#end-message').html('<h3>' + resultMessages.atGameEnd)
  $('#final-number-correct').html('<h3>Correct: ' + correctAnswers)
  $('#final-number-incorrect').html('<h3>Incorrect: ' + wrongAnswers)
  $('#final-number-unanswered').html('<h3>Unanswered: ' + unansweredQuestions)
  $('#play-again-button').show();
}