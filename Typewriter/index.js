const sentences = [
  "Either you run the day, or the day runs you.",
  "The most common way people give up their power is by thinking they don’t have any.",
  "The only way to do great work is to love what you do.",
  "I didn’t fail the test. I just found 100 ways to do it wrong.",
  "Either write something worth reading or do something worth writing.",
  "There are no traffic jams along the extra mile.",
  "Challenges are what make life interesting and overcoming them is what makes life meaningful.",
];

const writeSpeed = 65;
const pauseWrite = 1250;
const eraseSpeed = 15;
const pauseErase = 1700;

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

  document.querySelector("#demo").innerHTML = sentence + '<span id="cursor"></span>';
}

typewriter();
