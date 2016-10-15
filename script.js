$(document).ready(function(){

  console.log("hello jQuery");

var hangman = {
  storedWord: [],
  dashes: [],
  abc: []
};

$(".wordChoice").on("click", function(){
  captureWordValue();
  createDashes();
  keyboard();
  updateText();
  scoreBoard();
});

$(".wordInput").keypress(function(e){
    if(e.which == 13){//Enter key pressed
      $(".wordChoice").click();//Trigger 'Let's Play' button click event
    }
});

// INSERT KEYPRESS EVENT to star out letters as you type, to keep word hidden for player #2
// $(".wordInput").keyup(function(event) {
// hiddenText = event.target.value;
// console.log(hiddenText);
// $('.wordInput').text(hiddenText.replace(/\+/g, ' '));

function captureWordValue(){
  var word = $(".wordInput").val().toUpperCase();
  hangman.storedWord = word.split("");
};

function createDashes(){
  for (var i = 0; i< hangman.storedWord.length; i++) {
    hangman.dashes[i] = "_";
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
    $("div.scoreBoard").append("<p id='life'>Lives Remaining: 6</p><p id='points'>Points: 0 </p>");
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
    // INSERT FUNCTION TO UPDATE GRAPHIC hangingMan();
  }
};

function updateLifeScore (){
  var lives = $("p#life").text();
  lives = lives.replace(/\D/g, '');

  var newLife = parseInt(lives) - 1;

    if (newLife > 0){
      $("p#life").text("Lives Remaining: " + newLife);
    }
    else {
      $("div.textBox").html("GAME OVER!");
      $("p#life").text("Lives Remaining: 0");
      $("input.letter").prop('disabled', true);
      // show full hanged man
    }
};

// function hangingMan (){
//
// };

});
