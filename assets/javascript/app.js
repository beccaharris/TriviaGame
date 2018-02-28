$(document).ready(function() {
  $("#start-button").on("click", function(){
    $(this).hide();
    startGame(); 
  })
})
// *************************** // 
// Function to start the timer // 
// *************************** // 
function startGame () {
  var timeRemaining = 30;
  var timerId = setInterval(countdown, 1000);
  var timerElement = $('#timer');
  function countdown() {
    if (timeRemaining == -1) {
      clearTimeout(timerId);
    } else {
      timerElement.html('Time Remaining: ' + timeRemaining + ' seconds')
      timeRemaining--;
    }
  }
}


