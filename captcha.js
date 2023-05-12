// Getting all the required elements
const canvas = document.getElementById("generatedCaptcha");
const reloadBtn = document.getElementById("reload-btn");
const userInput = document.getElementById("input-captcha");
const submitBtn = document.getElementById("submit-btn");
let text = "";

// here generating random number between the given range
const randomNumber = (max, min) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// Functionality/Function for random text and number generator
const textGenerator = () => {
  let generatedText = "";

  for (i = 0; i < 3; i++) {
    generatedText += String.fromCharCode(randomNumber(65, 90));
    generatedText += String.fromCharCode(randomNumber(97, 122));
    generatedText += String.fromCharCode(randomNumber(48, 57));
  }
  // console.log(generatedText);
  return generatedText;
};

// A function that draws the generated text to canvas
function drawOnCanvas(string) {
  // Getting the context in the form of 2d so that every element to be drawn on canvas will be based on the argument give on canvas context
  let ctx = canvas.getContext("2d");

  //clear any kind of text drawn before on canvas before drawing the other
  // ctx.clearRect(0, 0, ctx.width, ctx.height);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  //Setting random text color
  const rNum1 = Math.floor(Math.random() * 250);
  const rNum2 = Math.floor(Math.random() * 250);
  const rNum3 = Math.floor(Math.random() * 250);
  const textColor = [
    `rgb(${rNum1}, ${rNum2}, ${rNum3}`,
    `rgb(${rNum2}, ${rNum3}, ${rNum1}`,
    `rgb(${rNum3}, ${rNum1}, ${rNum2}`,
    "rgb(0, 0, 0)",
    "rgb(130, 130, 130)",
  ];
  // console.log(textColor);

  const letterSpace = 260 / string.length;

  // looping through each string
  for (i = 0; i < string.length; i++) {
    const xInitialSpace = 20;

    ctx.font = "50px sans-serif";
    ctx.fillStyle = textColor[randomNumber(0, 4)];

    ctx.fillText(
      string[i],
      xInitialSpace + i * letterSpace,
      randomNumber(35, 100)
    );
  }
}

// A function executed whenever the reload button is clicked
const reloadFunc = () => {
  userInput.value = "";
  text = textGenerator();

  // Making randomize the text we got so that the pattern will be different for every reload action
  text = [...text].sort(() => Math.random() - 0.5).join("");
  console.log(text);
  // calling the drawing function on Canvas
  drawOnCanvas(text);
};
reloadBtn.addEventListener("click", reloadFunc);

// A functionality executed when the window loads at first instance
window.onload = () => reloadFunc();

// A functionality that checks text match of user input and the captcha

submitBtn.addEventListener("click", () => {
  if (userInput.value === text) {
    alert("Good to go!");
  } else {
    alert("Incorrect");
    reloadFunc();
  }
});
