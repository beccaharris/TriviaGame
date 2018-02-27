$(document).ready(function() {
  var timeRemaining = 30;
  var timerElement = $('#timer');
  var timerId = setInterval(countdown, 1000);

  function countdown() {
    if (timeRemaining == -1) {
      clearTimeout(timerId);
    } else {
      timerElement.html(timeRemaining + ' seconds remaining!')
      timeRemaining--;
    }
  }










})