const rulesModal = document.getElementById("rules_modal");
const gameScreen = document.querySelector(".game_screen");
const resultScreen = document.querySelector(".result_screen");
const line1 = document.querySelector(".line1");
const line2 = document.querySelector(".line2");

const resultUserImg = document.querySelector(".result_user_img");
const resultPcImg = document.querySelector(".result_pc_img");

const resultWinHeading = document.querySelector(".result_win_heading");

const comScore = document.getElementById("com_score");
const userScore = document.getElementById("user_score");

const nextBtn = document.querySelector(".next_btn");
const rulesBtn = document.querySelector(".rules_btn");

const wonGame = document.querySelector(".won_game");
const scoreBoard = document.querySelector(".score_board");

const userBox1 = document.querySelector(".user_box_1");
const userBox2 = document.querySelector(".user_box_2");
const userBox3 = document.querySelector(".user_box_3");

const pcBox1 = document.querySelector(".pc_box_1");
const pcBox2 = document.querySelector(".pc_box_2");
const pcBox3 = document.querySelector(".pc_box_3");

let scores = {
  user: 0,
  pc: 0,
};
// Update scores from local storage on page load
window.onload = () => {
  if (localStorage.getItem("scores")) {
    scores = JSON.parse(localStorage.getItem("scores"));
    comScore.innerHTML = scores.pc;
    userScore.innerHTML = scores.user;
  }
};
// Display rules button
function Rules(action) {
  action === "show"
    ? (rulesModal.style.display = "block")
    : (rulesModal.style.display = "none");
}

const arr = ["rock", "paper", "scissor"]; // pc choice
// Game start
function startGame(userpicked) {
  const pcPicked = arr[Math.floor(Math.random() * 3)]; //  pc choice

  gameScreen.style.display = "none";
  line1.style.display = "none";
  line2.style.display = "none";
  resultScreen.style.display = "flex";
  resultUserImg.className = "";
  resultPcImg.className = "";

  //  User win

  if (
    (userpicked === "rock" && pcPicked === "scissor") ||
    (userpicked === "paper" && pcPicked === "rock") ||
    (userpicked === "scissor" && pcPicked === "paper")
  ) {
    resultWinHeading.innerHTML = "YOU WON!";
    resultUserImg.src = "assets/" + userpicked + ".png";
    resultPcImg.src = "assets/" + pcPicked + ".png";

    userpicked === "paper"
      ? resultUserImg.classList.add(userpicked + "_img_result")
      : resultUserImg.classList.add(userpicked + "_img");
    pcPicked === "paper"
      ? resultPcImg.classList.add(pcPicked + "_img_result")
      : resultPcImg.classList.add(pcPicked + "_img");

    focusOnUserWinner();
    userScore.innerHTML = ++scores.user;
  } else if (userpicked === pcPicked) {
    // Tie Up

    resultWinHeading.innerHTML = "TIE UP!";
    resultUserImg.src = "assets/" + userpicked + ".png";
    resultPcImg.src = "assets/" + pcPicked + ".png";

    if (userpicked === "paper") {
      resultUserImg.classList.add(userpicked + "_img_result");
      resultPcImg.classList.add(pcPicked + "_img_result");
    } else {
      resultUserImg.classList.add(userpicked + "_img");
      resultPcImg.classList.add(pcPicked + "_img");
    }

    removeFocus();
  } else {
    // PC win

    resultWinHeading.innerHTML = "YOU LOST!";
    resultUserImg.src = "assets/" + userpicked + ".png";
    resultPcImg.src = "assets/" + pcPicked + ".png";

    userpicked === "paper"
      ? resultUserImg.classList.add(userpicked + "_img_result")
      : resultUserImg.classList.add(userpicked + "_img");
    pcPicked === "paper"
      ? resultPcImg.classList.add(pcPicked + "_img_result")
      : resultPcImg.classList.add(pcPicked + "_img");

    focusOnPcWinner();
    comScore.innerHTML = ++scores.pc;
  }

  //  Display next button
  scores.user > scores.pc
    ? (nextBtn.style.display = "block")
    : (nextBtn.style.display = "none");

  // Saving scores in local storage
  localStorage.setItem("scores", JSON.stringify(scores));
  console.log(localStorage.getItem("scores"));
}

function focusOnUserWinner() {
  userBox1.classList.add("winner-box-1");
  userBox2.classList.add("winner-box-2");
  userBox3.classList.add("winner-box-3");

  pcBox1.classList.remove("winner-box-1");
  pcBox2.classList.remove("winner-box-2");
  pcBox3.classList.remove("winner-box-3");
}

function focusOnPcWinner() {
  userBox1.classList.remove("winner-box-1");
  userBox2.classList.remove("winner-box-2");
  userBox3.classList.remove("winner-box-3");

  pcBox1.classList.add("winner-box-1");
  pcBox2.classList.add("winner-box-2");
  pcBox3.classList.add("winner-box-3");
}

function removeFocus() {
  userBox1.classList.remove("winner-box-1");
  userBox2.classList.remove("winner-box-2");
  userBox3.classList.remove("winner-box-3");

  pcBox1.classList.remove("winner-box-1");
  pcBox2.classList.remove("winner-box-2");
  pcBox3.classList.remove("winner-box-3");
}

function playAgain() {
  resultScreen.style.display = "none";
  wonGame.style.display = "none";

  line1.style.display = "block";
  line2.style.display = "block";
  scoreBoard.style.display = "flex";
  rulesBtn.style.display = "block";
  gameScreen.style.display = "block";
}
// Show won Game Page
function showHurray() {
  scoreBoard.style.display = "none";
  gameScreen.style.display = "none";
  resultScreen.style.display = "none";
  line1.style.display = "none";
  line2.style.display = "none";
  nextBtn.style.display = "none";

  rulesBtn.style.display = "block";
  wonGame.style.display = "flex";
}
