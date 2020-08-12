const sentences = ["Interior Designer", "Lifestyle Strategist", "Transformer"];
const writeSpeed = 50;
const pauseWrite = 200;
const eraseSpeed = 10;
const pauseErase = 700;

let sentence = "";
let index = 0;
let stringIndex = 0;
let erase = false;

function typewriter() {
  if (!erase) {
    const computedSentence = sentences[index];

    if (stringIndex === computedSentence.length) {
      erase = true;
      stringIndex = 0;

      setTimeout(typewriter, pauseErase);
    } else {
      sentence += computedSentence.charAt(stringIndex);
      stringIndex += 1;

      setTimeout(typewriter, writeSpeed);
    }
  } else {
    let sentenceLength = sentence.length;

    if (sentenceLength === 0) {
      erase = false;
      index = index === sentences.length - 1 ? 0 : index + 1;

      setTimeout(typewriter, pauseWrite);
    } else {
      sentence = sentence.substring(0, sentenceLength - 1);
      sentenceLength -= 1;

      setTimeout(typewriter, eraseSpeed);
    }
  }

  document.querySelector("#demo").innerHTML = sentence;
};

typewriter();
