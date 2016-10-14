$(document).ready(function(){
  console.log("hello jQuery");

var hangman = {
  storedWord: [],
  dashes: [],
  abc: []
};

// Click event on "Let's Play" button triggers: capturing input value, splitting value string into letters, storing letters in object array, clearing value input, clearing div textbox, and appending dashes for each letter

$(".wordChoice").on("click", function(){
  var word = $(".wordInput").val().toUpperCase();
  hangman.storedWord = word.split("");
  $(".wordInput").val("");

  var textBox = $("div.textBox>h2");

  for (var i = 0; i< hangman.storedWord.length; i++) {
    hangman.dashes[i] = "_";
    }
// updating text box with dashes
  textBox.append(hangman.dashes);
  $("p").text("(take a guess!)");
  $("div.input").html("");

// populating object with alphabet letters, populate keyboard
  hangman.abc = "abcdefghijklmnopqrstuvwxyz".split("");
  keyboard();

// show scoreboard
  $("div.scoreBoard").css("visibility", "visible");
  $("div.scoreBoard").append("<p id='score'>Lives remaining: 6</p><p id='points'>Points: 0 </p>");
});

// Function is called upon capturing value and updating object - creates letter buttons with specific ids. Values are stored in object
function keyboard(){
  for (i=0; i< hangman.abc.length; i++){
    $("div.keyboard").append("<input type='button' value='" + hangman.abc[i].toUpperCase() + "' id='" + hangman.abc[i] + "' class='letter'>")
  }

  // on click of button, compare its value to value stored in array. If match, then update dashes array at that same index. Reprint to textbox and disable button. If not match, reduce score on score board and disable button
  $(".letter").on("click", function(){
    var letter = $(this).val();

    for (var i = 0; i < hangman.storedWord.length; i++)
        {
            if (hangman.storedWord[i] == letter)
            {
              hangman.dashes[i] = letter;
              $("div.textBox>h2").html(hangman.dashes);
              $(this).prop('disabled', true);
              $(this).addClass('disabled').removeClass('letter');

              // get value of paragraph id score and add points per letter
              var pointsText = $("p#points").text();
              pointsText = pointsText.replace(/\D/g, '');
              var newPoints = parseFloat(pointsText) + 10;
              $("p#points").text("Points: " + newPoints);
            }

            else {
              // score on score board and hangman drawing appears
              $(this).prop('disabled', true);
              $(this).addClass('disabled').removeClass('letter');
            }
        };

    });

};


// // To star out letters as you type, to keep word hidden for player #2
// $(".wordInput").keyup(function(event) {
// hiddenText = event.target.value;
// console.log(hiddenText);
// $('.wordInput').text(hiddenText.replace(/\+/g, ' '));
// });


});
