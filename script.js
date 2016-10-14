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
  $("p.subtext").text("(take a guess!)");
  $("div.input").html("");

// populating object with alphabet letters, populate keyboard
  hangman.abc = "abcdefghijklmnopqrstuvwxyz".split("");
  keyboard();

// show scoreboard
  $("div.scoreBoard").css("visibility", "visible");
});

// Function is called upon capturing value and updating object - creates letter buttons with specific ids. Values are stored in object
function keyboard(){
  for (i=0; i< hangman.abc.length; i++){
    $("div.keyboard").append("<input type='button' value='" + hangman.abc[i].toUpperCase() + "' id='" + hangman.abc[i] + "' class='letter'>")
  }
  $(".letter").on("click", function(){
    var letter = $(this).val();
    console.log(letter);
    for (var i = 0; i < hangman.storedWord.length; i++)
        {
            if (hangman.storedWord[i] == letter)
            {
              hangman.dashes[i] = letter;
              $("div.textBox>h2").html(hangman.dashes);
            }
        };
        console.log(hangman);

      //when click letter button loop through storedword to compare value. If match, dashes = storedWord[i]. Reprint
    });

};



// // To star out letters as you type, to keep word hidden for player #2
// $(".wordInput").keyup(function(event) {
// hiddenText = event.target.value;
// console.log(hiddenText);
// $('.wordInput').text(hiddenText.replace(/\+/g, ' '));
// });


});
