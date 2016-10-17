$(document).ready(function(){

console.log("hello jQuery");

var hangman = {
  storedWord: [],
  dashes: [],
  abc: [],
  images: ["images/gallow1.png", "images/gallow2.png", "images/gallow3.png", "images/gallow4.png", "images/gallow5.png", "images/gallow6.png", "images/gallow7.png", "images/gallow8.png"]
};

$(".wordChoice").on("click", function(){

  if ($(".wordInput").val() ==""){
    alert("Please enter a word or phrase");
  }
  else {
  captureWordValue();
  createDashes();
  keyboard();
  updateText();
  scoreBoard();
  timer();
  }
});

$(".wordInput").keypress(function(e){
    if(e.which == 13){
      $(".wordChoice").click();
    }
});

function captureWordValue(){
  var word = $(".wordInput").val().toUpperCase();
  hangman.storedWord = word.split("");
};

function createDashes(){
  for (var i = 0; i< hangman.storedWord.length; i++) {
      if (hangman.storedWord[i] != " "){
        hangman.dashes[i] = "_";
      }
      else {
        hangman.dashes[i] = " ";
      }
    }
};

function keyboard(){
  hangman.abc = "abcdefghijklmnopqrstuvwxyz".split("");
  for (i=0; i< hangman.abc.length; i++){
    $("div.keyboard").append("<input type='button' value='" + hangman.abc[i].toUpperCase() + "' class='letter'>")
  }
  $("input.letter").on("click", checkMatch);
};

function updateText(){
  var textBox = $("div.textBox>h2");
  textBox.append(hangman.dashes);
  $("p#subtext").text("(take a guess!)");
  $("div.input").html("");
};

function scoreBoard (){
  $("div.scoreBoard").css("visibility", "visible");
  $("div.scoreBoard").append("<p id='life'>Lives Remaining: 8</p><p id='points'>Points: 0 </p>");
};

function checkMatch(){
  var letter = $(this).val();
  var x = "false";

  for (var i = 0; i < hangman.storedWord.length; i++){
          if (hangman.storedWord[i] == letter){
              hangman.dashes[i] = letter;
              $("div.textBox>h2").html(hangman.dashes);

              $(this).prop('disabled', true);
              $(this).addClass('disabled').removeClass('letter');

              var pointsText = $("p#points").text();
              pointsText = pointsText.replace(/\D/g, '');
              var newPoints = parseFloat(pointsText) + 10;
              $("p#points").text("Points: " + newPoints);

              x = "true";
          }
          else {
              $(this).prop('disabled', true);
              $(this).addClass('disabled').removeClass('letter');
          }
        };

  if (x == "false"){
    updateLifeScore();
    hangingMan();
  }
  checkWin();
  console.log(hangman);
};

function updateLifeScore (){
  var lives = $("p#life").text();
  lives = lives.replace(/\D/g, '');

  var newLife = parseInt(lives) - 1;

    if (newLife > 0){
      $("p#life").text("Lives Remaining: " + newLife);
    }
    else {
      $("p#subtext").html("<span id='lose'>GAME OVER!</span>");
      $("p#life").text("Lives Remaining: 0");
      $("input.letter").prop('disabled', true);
      $("div.input").html("<button id='reveal'>Reveal answer?</button><button id='playagain'>Play again!</button>");
      $("button#reveal").on("click", revealAnswer);
      $("button#playagain").on("click", playAgain);

    }
};

var counter = 0;

function hangingMan (){
  $("aside").html("<img src='"+ hangman.images[counter] + "' />");
  counter ++;
};

function checkWin(){
  if ($.inArray("_", hangman.dashes) < 0){
    $("p#subtext").html("<span id='win'>YOU WIN!</span>");
    $("input.letter").prop('disabled', true);
    $("div.input").html("<button id='playagain'>Play again!</button>");
    $("button#playagain").on("click", playAgain);
    clearInterval(timer);
  }
};


function timer(){

  var seconds = 90;

  setInterval(function() {
       seconds--;
        if (seconds >= 0) {
          $("#timer").html(seconds + " seconds");
        }
        if (seconds <= 15){
          $("#timer").css("color", "red");
        }
        if (seconds === 0) {
          $("p#subtext").html("<span id='lose'>GAME OVER!</span>");
          $("input.letter").prop('disabled', true);
          $("div.input").html("<button id='reveal'>Reveal answer?</button><button id='playagain'>Play again!</button>");
          $("button#reveal").on("click", revealAnswer);
          $("button#playagain").on("click", playAgain);
          $("#timer").html("<span>0 seconds</span>");
          $("aside").html("<img src='"+ hangman.images[7] + "' />");

         }
       }, 1000);
};


function revealAnswer (){
  $("div.textBox>h2").html(hangman.storedWord);
  $("div.input").html("<button id='playagain'>Play again!</button>");
  $("button#playagain").on("click", playAgain);
}

function playAgain (){
  location.reload();
}

});
