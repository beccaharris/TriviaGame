$(document).ready(function() {
  // Hide the next button on page load //
  $('#next-button').hide();
  // Function for clicking the start button - should run the "startGame" function and hide the Start button //
  $("#start-button").on("click", function(){
    $(this).hide();
    startGame(); 
    displayCurrentQnA();
  });
  // when you click the next button, the next question in the triviaQuestions array should show // 
  $("#next-button").on("click", function(){
    $('li').remove();
    currentQuestion++;
    questionChoices++;
    displayCurrentQnA();
  })
  
})

// Function to start the game// 
function startGame () {
  // define timeRemaining for the timer
  var timeRemaining = 30;
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
    //show my next button
    $('#next-button').show();
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

function displayCurrentQnA() {
  $('#question').text(triviaQuestions[currentQuestion].question);
  for (var i = 0; i < triviaQuestions[currentQuestion].choices.length; i++) {
    console.log(triviaQuestions[currentQuestion].choices[i]);
    $('li').addClass('answer-item')
    $('#choices').append('<li><input type="radio">' + triviaQuestions[currentQuestion].choices[i] + '</input></li>');
    
}}

