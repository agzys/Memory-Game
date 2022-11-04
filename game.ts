const btns = document.querySelectorAll(".btn");
const btnEasy = document.querySelector(".easyBtn");
const btnMedium = document.querySelector(".mediumBtn");
const btnHard = document.querySelector(".hardBtn");
const startContainer = document.querySelector(".startContainer");
const easyGame = document.querySelector(".easyGame");
const btnStart = document.querySelectorAll(".startBtn");
const mediumGame = document.querySelector(".mediumGame");
const hardGame = document.querySelector(".hardGame");

let gameLvlStatus: string = "";

const hide = function (e: Event) {
  startContainer.style.display = "none";
  if (e.target?.textContent === "Easy") {
    easyGame.style.display = "block";
    console.log(e.target);
    gameLvlStatus = "easy";
    console.log(gameLvlStatus);
  } else if (e.target.textContent === "Medium") {
    mediumGame.style.display = "block";
    gameLvlStatus = "medium";
  } else if (e.target.textContent === "Hard") {
    hardGame.style.display = "block";
    gameLvlStatus = "hard";
  }
};

btnEasy.addEventListener("click", hide);
btnMedium.addEventListener("click", hide);
btnHard.addEventListener("click", hide);

const easyCards = [
  "bat",
  "bat",
  "boat",
  "boat",
  "butterfly",
  "butterfly",
  "crane",
  "crane",
  "dog",
  "dog",
  "giraffe",
  "giraffe",
];

const MEDIUM_CARDS = [
  "bat",
  "bat",
  "boat",
  "boat",
  "butterfly",
  "butterfly",
  "crane",
  "crane",
  "dog",
  "dog",
  "giraffe",
  "giraffe",
  "penguin",
  "penguin",
  "dolphin",
  "dolphin",
];

const hardCards = [
  "bat",
  "bat",
  "boat",
  "boat",
  "butterfly",
  "butterfly",
  "crane",
  "crane",
  "dog",
  "dog",
  "giraffe",
  "giraffe",
  "penguin",
  "penguin",
  "dolphin",
  "dolphin",
  "plane",
  "plane",
  "pinwheel",
  "pinwheel",
];

let cards = document.querySelectorAll(`.card`);
cards = [...cards];

let cardsM = document.querySelectorAll(".cardM");
cardsM = [...cardsM];

let cardsH = document.querySelectorAll(".cardH");
cardsH = [...cardsH];

let activeCard = "";
const activeCards = [];

let lvlCards;
const checkLvlCards = function () {
  if (gameLvlStatus === "easy") {
    lvlCards = cards;
  } else if (gameLvlStatus === "medium") {
    lvlCards = cardsM;
  } else if (gameLvlStatus === "hard") {
    lvlCards = cardsH;
  }
};
let gameResult = 0;
const clickCard = function () {
  activeCard = this;
  activeCard.classList.remove("hidden");
  activeCard.style.backgroundSize = "cover";

  checkLvlCards();
  const gamePairs = lvlCards.length / 2;

  if (activeCards.length === 0) {
    activeCards[0] = activeCard;
    return;
  } else {
    lvlCards.forEach(card => {
      card.removeEventListener("click", clickCard);
    });
    activeCards[1] = activeCard;
    setTimeout(function () {
      if (activeCards[0].className === activeCards[1].className) {
        console.log("win");
        activeCards.forEach(card => {
          card.classList.add("off");
          card.style.backgroundSize = 0;
        });
        gameResult = gameResult + 1;
        console.log(gameResult);
        console.log(gamePairs);
        if (gameResult == gamePairs) {
          console.log("koniec gry");
          gameResult = 0;
          lvlCards.forEach(card => {
            card.removeAttribute("class");
            card.classList.add("cards");
            easyCars = [
              "bat",
              "bat",
              "boat",
              "boat",
              "butterfly",
              "butterfly",
              "crane",
              "crane",
              "dog",
              "dog",
              "giraffe",
              "giraffe",
            ];
          });
        }
      } else {
        console.log("loose");
        activeCards.forEach(card => {
          card.classList.add("hidden");
          card.style.backgroundSize = 0;
        });
      }
      activeCard = "";
      activeCards.length = 0;
      lvlCards.forEach(card => {
        card.addEventListener("click", clickCard);
      });
    }, 1000);
  }
};
const init = () => {
  let cardSelection;
  if (gameLvlStatus === "easy") {
    cardSelection = [...easyCards];
  } else if (gameLvlStatus === "medium") {
    cardSelection = [...mediumCards];
  } else if (gameLvlStatus === "hard") {
    cardSelection = [...hardCards];
  }
  checkLvlCards();
  lvlCards.forEach(card => {
    const position = Math.floor(Math.random() * cardSelection.length);
    card.classList.add(cardSelection[position]);
    cardSelection.splice(position, 1);
  });
  setTimeout(() => {
    lvlCards.forEach(card => {
      card.classList.add("hidden");
      card.style.backgroundSize = 0;
      card.addEventListener("click", clickCard);
    });
  }, 2000);
};
btnStart.forEach(btn => {
  btn.addEventListener("click", init);
});
