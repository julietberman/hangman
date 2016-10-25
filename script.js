$(document).ready(function(){
// for general code clarity, make sure you nest all code within the document ready, and remove any console.logs from production code
console.log("hello jQuery");

// object stores all data - input word, dashes, keyboard letter values, and hangman images
var hangman = {
  storedWord: [],
  dashes: [],
  // a better name for this property maybe letters
  abc: [],
  images: ["images/gallow1.png", "images/gallow2.png", "images/gallow3.png", "images/gallow4.png", "images/gallow5.png", "images/gallow6.png", "images/gallow7.png", "images/gallow8.png"]
};

// timer function includes global variable to access number of seconds later in point bonus function
var seconds = 20;
var countDown = null;

function timer(){
// indentation!
       seconds--;
        if (seconds >= 0) {
          $("#timer").html(seconds + " seconds");
        }
        // such a cool simple feature
        if (seconds <= 15){
          $("#timer").css("color", "red");
        }
        if (seconds === 0) {
          // this looks very similar to whats happening below in the updateLife() function
          $("p#subtext").html("<span id='lose'>GAME OVER!</span>");
          $("input.letter").prop('disabled', true);
          $("div.input").html("<button id='reveal'>Reveal answer?</button><button id='playagain'>Play again!</button>");
          $("button#reveal").on("click", revealAnswer);
          $("button#playagain").on("click", playAgain);
          $("#timer").html("<span>0 seconds</span>");
          $("aside").html("<img src='"+ hangman.images[7] + "' />");
        }
};

// onclick to begin playing - references various, modular functions
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
  countDown = setInterval(timer, 1000);
  }
});

// allows "Enter" key to invoke onclick play event
// check out the submit event for a form, that way you can just use one event
$(".wordInput").keypress(function(e){
    if(e.which == 13){
      $(".wordChoice").click();
    }
});

// captures value from input box and stores in object
function captureWordValue(){
  var word = $(".wordInput").val().toUpperCase();
  hangman.storedWord = word.split("");
};

// creates number of dashes based on length of word, stores in object
function createDashes(){
  for (var i = 0; i< hangman.storedWord.length; i++) {
      if (hangman.storedWord[i] != " "){
        hangman.dashes[i] = "_";
      }
      else {
        hangman.dashes[i] = " ";
      }
    }
    console.log(hangman);
};

// creates keyboard with each key having its own click event
function keyboard(){
  // this seems like a constant in your program, define it in your object at the top of your page, also it seems like your always using uppercase letters, maybe just take that an run with it so you can limit the amount of times you need to call .toUppercase()
  // how cool would it be if the the keyboard looked like a computer keyboard too? dope
  hangman.abc = "abcdefghijklmnopqrstuvwxyz".split("");
  for (i=0; i< hangman.abc.length; i++){
    $("div.keyboard").append("<input type='button' value='" + hangman.abc[i].toUpperCase() + "' class='letter'>")
  }
  $("input.letter").on("click", checkMatch);
};

// changes textbox to show dashes, takes info from the object
function updateText(){
  var textBox = $("div.textBox>h2");
  textBox.append(hangman.dashes);
  $("p#subtext").text("(take a guess!)");
  $("div.input").html("");
};

// displays scoreboard beginning with zero points
function scoreBoard (){
  $("div.scoreBoard").css("visibility", "visible");
  $("div.scoreBoard").append("<p id='life'>Lives Remaining: 8</p><p id='points'>Points: 0 </p>");
};

// checks letter key with the word input stores in the object
function checkMatch(){
  var letter = $(this).val();
  // probably a better variable name for this
  var x = "false";

  for (var i = 0; i < hangman.storedWord.length; i++){
    // indentation
          if (hangman.storedWord[i] == letter){
              hangman.dashes[i] = letter;
              $("div.textBox>h2").html(hangman.dashes);

              $(this).prop('disabled', true);
              $(this).addClass('disabled').removeClass('letter');

              addPoint();
              checkWin();

              x = "true";
          }
        };

  if (x == "false"){
    $(this).prop('disabled', true);
    $(this).addClass('disabled').removeClass('letter');
    updateLifeScore();
    hangingMan();
  }

};

// runs through to see if there are any more dashes stores in object
function checkWin(){
  if ($.inArray("_", hangman.dashes) < 0){
    $("p#subtext").html("<span id='win'>YOU WIN!</span>");
    $("input.letter").prop('disabled', true);
    $("div.input").html("<button id='playagain'>Play again!</button>");
    $("button#playagain").on("click", playAgain);
    clearInterval(countDown);
    bonusPoints();
  }
};

// if letter match against stored word, adds 10 points per letter
function addPoint(){
  // it'd be cool if you gave varying amount of points based on a timer
    var pointsText = $("p#points").text();
    pointsText = pointsText.replace(/\D/g, '');
    var newPoints = parseFloat(pointsText) + 10;
    $("p#points").text("Points: " + newPoints);
};

// if no match of letter in stored word, deducts live value and updates scoreboard
function updateLifeScore (){
  var lives = $("p#life").text();
  // dat regex doe
  lives = lives.replace(/\D/g, '');
  var newLife = lives - 1;

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
      clearInterval(countDown);
    }
};

// runs through each hangman image, invoked by loss of life or timer runs down
var counter = 0;

function hangingMan (){
  $("aside").html("<img src='"+ hangman.images[counter] + "' />");
  counter ++;
};

// option to reveal answer, invoked by click event on button with loss
function revealAnswer (){
  $("div.textBox>h2").html(hangman.storedWord);
  $("div.input").html("<button id='playagain'>Play again!</button>");
  $("button#playagain").on("click", playAgain);
}

// adds time bonus, invoked by click event on button with win
function bonusPoints(){
  var bonus = seconds * 2;
  $("p#points").append(" + " + bonus + " time bonus")
}

// refreshes page to play again, invoked by click event on button
function playAgain (){
  // this seems hacky and doesn't give us that single page action feel, how can i reset the game without having to do a hard page refresh?
  location.reload();
}

});
