let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true;
let count = 0;

let playerONameInput = document.querySelector("#playerOName");
let playerXNameInput = document.querySelector("#playerXName");
let startBtn = document.querySelector("#start-btn");
let nameContainer = document.querySelector(".name-container");
let gameContainer = document.querySelector(".container");

let playerOName = "Player O";
let playerXName = "Player X";

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
      box.style.background = "#daa520";
    } else {
      box.innerText = "X";
      turnO = true;
      box.style.background = "#9e998bff";
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.style.background = "#ffffc7";
  }
};

const showWinner = (winner) => {
  let winnerName = (winner === "O") ? playerOName : playerXName;
  msg.innerText = `Congratulations, Winner is ${winnerName}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

startBtn.addEventListener("click", () => {
  if (playerONameInput.value.trim() !== "" && playerXNameInput.value.trim() !== "") {
    playerOName = playerONameInput.value.trim();
    playerXName = playerXNameInput.value.trim();

    nameContainer.classList.add("hide");
    gameContainer.classList.remove("hide");
    resetBtn.classList.remove("hide");
  } else {
    alert("Please enter both player names.");
  }
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
