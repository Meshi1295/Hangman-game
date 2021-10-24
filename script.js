const wordElement = document.getElementById('word');
const wrongLettersElement = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-btn');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const bodyParts = document.querySelectorAll('.bodyParts');

let words = ['application', 'programming', 'amit', 'javascript', 'meshi'];

// select a random word
let selectedWord = words[Math.floor(Math.random() * words.length)];
console.log(selectedWord);

let correctLetters = [];
let wrongLetters = [];


// here we show hidden words
function wordShow (){
    wordElement.innerHTML = `${selectedWord
        .split('')
        .map(
            letter => `
            <span class="letter">
             ${correctLetters.includes(letter) ? letter : ""}
        </span>
        `).join('')}`;

// make the letter to one line
        let innerWord = wordElement.innerText.replace(/\n/g,'');
        // console.log(wordElement.innerHTML);
        

        if(innerWord === selectedWord){
            finalMessage.innerText = 'You won!!'
            popup.style.display = 'flex'
        }
}

function updateWrongLettersEl(){
    // display wrong letters
    wrongLettersElement.innerHTML = `${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}`;

    // display parts
    bodyParts.forEach((part, index) => {
        let error = wrongLetters.length;
        if (index < error){
            part.style.display = 'block'
        } else {
            part.style.display = 'none';
        }
    });

  // Check if lost
    if(wrongLetters.length === bodyParts.length){
        finalMessage.innerText = 'You lost!!';
        popup.style.display = 'flex'

    }
}



function showNotification(){
    notification.classList.add('show');

    setTimeout(() =>{
        notification.classList.remove('show');

    }, 2000)
};



// letter pres
window.addEventListener('keydown', e => {
if (e.keyCode >= 65 && e.keyCode <= 90){
let letter = e.key;

if(selectedWord.includes(letter)){
    if(!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        wordShow();
    } else {
        showNotification();
     }
    } else  {
        if(!wrongLetters.includes(letter)){
            wrongLetters.push(letter);

            updateWrongLettersEl();
       
         } else {
             showNotification();
         }
 
        }
    }
});

// start play again
 playAgainBtn.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    
    selectedWord = words[Math.floor(Math.random() * words.length)];

    wordShow()
    updateWrongLettersEl()
    popup.style.display = 'none'
})



wordShow()










