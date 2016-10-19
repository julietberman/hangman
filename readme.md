#Juliet Berman - Hangman

##Overview
Hangman is a multi-player game that allows Player One to input a word or phrase, of which Player Two will guess. There are 8 chances for an incorrect guess and the user has a limited amount of time. Points are distributed based on the number of letters and a time bonus.

##Approach Taken
I used an object to store data that would be referenced, evaluated, and updated by concise and clean functions. The functions were modular and used throughout various click events and as callbacks.

##Bonus to Do
- Store past scores
- Create mobile responsive design

##User Story
- Views dashes for hidden word [mvp]
- Select letter of alphabet (buttons) to guess if letter is in word [mvp]
- If correct guess: display letter and disable the letter button [mvp]
- If incorrect guess: pop up alert to "try again" & disable the letter button [mvp], and portion of hangman graphic is added [silver]
- Play button to run against timer [silver]
- Keeps track of incorrect guesses/score value [bronze]
- Can choose topic/theme option which will change word and give a whole new game [gold]
