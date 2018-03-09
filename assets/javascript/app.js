$(document).ready(function() {

  // Function for clicking the start button - should run the "startGame" function and hide the Start button //
  $("#start-button").on("click", function(){
    $(this).hide();
    startGame(); 
    questionCycle();
    console.log(triviaQuestions[currentQuestion].correctAnswer)
  });
  // when you click an answer, the next question in the triviaQuestions array should show // 
  //$("#choices").on("click", function(){
  //  currentQuestion++;
  //  questionChoices++;
  //  $('#choices').empty();
  //  displayQnA();
  //})
  
})

// Function to start the game// 
function startGame () {
  // define timeRemaining for the timer
  var timeRemaining = 15;
  // makes the timer count down by 1000 milliseconds (1 second) // 
  var timerId = setInterval(countdown, 1000);
  // grabs the timer html element and gives it a var
  var timerElement = $('#timer');
  
  function countdown() {
    //once the timer hits 0, stop it (or it'll keep counting to negative) //
    if (timeRemaining == -1) {
      clearTimeout(timerId);
      // if the timer isn't at 0, keep counting down. 
    } else {
      timerElement.html('Time Remaining: ' + timeRemaining + ' seconds')
      timeRemaining--;
    };
  }
}
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
// default index of the current question
var currentQuestion = 0;
// default index of the current answer choices
var questionChoices = 0;
// Basically start with a score of 0
var correctAnswers = 0;

var callCurrentQ = triviaQuestions[currentQuestion].question;
var callCurrentChoices = triviaQuestions[currentQuestion].choices;

//***********************************//
// Function to set up questions & answers // 
//**********************************//
function questionCycle() {
  $('#question-display').html('<h3>' + callCurrentQ + '</h3>');
  for (var i = 0; i < callCurrentChoices.length; i++) {
    var choices = $('<div>');
    choices.attr('data-index', i);
    choices.addClass('answer-choice');
    choices.text(triviaQuestions[currentQuestion].choices[i]);
    $('#choices').append(choices);
  }

  //***********************************//
  // Pause the timer when an answer is chosen
  //***********************************//
  $('.answer-choice').on('click', function() {
    userChoice = $(this).data('index')
  })
}

