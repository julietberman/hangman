$(document).ready(function(){

  console.log("hello jQuery");

var hangman = {
  storedWord: [],
  dashes: [],
  abc: [],
  images: ["images/gallow1.png", "images/gallow2.png", "images/gallow3.png", "images/gallow4.png", "images/gallow5.png", "images/gallow6.png", "images/gallow7.png", "images/gallow8.png"]
};

$(".wordChoice").on("click", function(){
  captureWordValue();
  createDashes();
  keyboard();
  updateText();
  scoreBoard();
  // timer();
});

console.log(hangman);

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

    }
};

var counter = 0;

function hangingMan (){
  $("aside").html("<img src='"+ hangman.images[counter] + "' />");
  counter ++;
};

// function timer (){
//
// };

});
