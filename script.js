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

// INSERT CLICK EVENT FOR KEYPRESS

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
    $("p").text("(take a guess!)");
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
              // update dashes array with letter value and update div text
              hangman.dashes[i] = letter;
              $("div.textBox>h2").html(hangman.dashes);

              // remove clicked button
              $(this).prop('disabled', true);
              $(this).addClass('disabled').removeClass('letter');

              // get value of paragraph id score and add points per letter
              var pointsText = $("p#points").text();
              pointsText = pointsText.replace(/\D/g, '');
              var newPoints = parseFloat(pointsText) + 10;
              $("p#points").text("Points: " + newPoints);

              x = "true";
            }
            else {
              // remove clicked button
              $(this).prop('disabled', true);
              $(this).addClass('disabled').removeClass('letter');
            }
        };

  if (x == "false"){
    updateLifeScore();
  }
};

function updateLifeScore (){
  var lives = $("p#life").text();
  lives = lives.replace(/\D/g, '');
  var newLife = (parseFloat(lives) - 1);
  $("p#life").text("Lives Remaining: " + newLife);
};

});

// function draw (){
//
// };

// // To star out letters as you type, to keep word hidden for player #2
// $(".wordInput").keyup(function(event) {
// hiddenText = event.target.value;
// console.log(hiddenText);
// $('.wordInput').text(hiddenText.replace(/\+/g, ' '));
