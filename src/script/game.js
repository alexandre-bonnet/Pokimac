const NB_POKEMONS = 10;
const MAX_HINTS = 4;

let pokemons = [];
let currentPokemonIndex = 0;
let score = 0;
let nbHints = 0;

async function getRandomPokemons() {
  const genSelectElement = document.getElementById("gen-select");

  const response = await fetch(
    `https://pokimac-api.super-sympa.fr/random?generation=${genSelectElement.value}&count=${NB_POKEMONS}`
  );
  const data = await response.json();

  setIsLoading(false);

  pokemons = data.pokemons;

  updatePage();
}

function reset() {
  pokemons = [];
  currentPokemonIndex = 0;
  score = 0;
  nbHints = 0;

  const endDialog = document.getElementById("end-dialog");
  endDialog.close();

  setIsLoading(true);

  getRandomPokemons();
}

function submitAnswer(e) {
  e.preventDefault();
  const input = document.getElementById("user-input");
  if (
    input.value.toLowerCase().trim() ===
    pokemons[currentPokemonIndex].name.toLowerCase()
  ) {
    currentPokemonIndex++;
    score += 5 - nbHints;
    nbHints = 0;
    if (currentPokemonIndex < NB_POKEMONS) {
      updatePage();
    } else {
      endGame();
    }
  } else {
    alert("Pas bon !");
  }
}

function skip() {
  currentPokemonIndex++;
  nbHints = 0;
  if (currentPokemonIndex < NB_POKEMONS) {
    updatePage();
  } else {
    endGame();
  }
}

function updatePage() {
  const helpButton = document.getElementById("help-button");
  helpButton.disabled = false;

  const input = document.getElementById("user-input");
  input.value = "";

  const imageElement = document.getElementById("image-pokemon");
  imageElement.src = pokemons[currentPokemonIndex].image;

  const scoreElement = document.getElementById("count-score");
  const countElement = document.getElementById("count-pokemons");

  scoreElement.textContent = score;
  countElement.textContent = `${currentPokemonIndex + 1}/${NB_POKEMONS}`;

  updateBlur();
}

function unblur() {
  nbHints++;
  if (nbHints === MAX_HINTS) {
    const helpButton = document.getElementById("help-button");
    helpButton.disabled = true;
  }
  updateBlur();
}

function updateBlur() {
  const imageElement = document.getElementById("image-pokemon");

  const brightness = 30 + (nbHints / MAX_HINTS) * 70;
  const contrast = 50 + (nbHints / MAX_HINTS) * 50;
  const saturate = 0 + (nbHints / MAX_HINTS) * 100;
  const blur = (MAX_HINTS - nbHints) * 10;

  imageElement.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) blur(${blur}px)`;
}

function endGame() {
  const usernameInput = document.getElementById("username");
  usernameInput.value = "";

  const resultsScoreElement = document.getElementById("results-score");
  resultsScoreElement.textContent = score;

  const endDialog = document.getElementById("end-dialog");
  endDialog.showModal();
}

function setIsLoading(isLoading) {
  if (isLoading) {
    const imageElement = document.getElementById("image-pokemon");

    const imageContainer = document.getElementById("image-container");
    const loadingText = document.createElement("p");
    loadingText.textContent = "Chargement...";
    imageContainer.replaceChild(loadingText, imageElement);
  } else {
    const imageElement = document.createElement("img");
    imageElement.alt = "pokémon";
    imageElement.id = "image-pokemon";

    const imageContainer = document.getElementById("image-container");
    const loadingText = imageContainer.querySelector("p");
    imageContainer.replaceChild(imageElement, loadingText);
  }
}

function publishScore(e) {
  e.preventDefault();

  const usernameInput = document.getElementById("username");
  const genSelectElement = document.getElementById("gen-select");

  fetch("https://pokimac-api.super-sympa.fr/score", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: usernameInput.value,
      score,
      generation: +genSelectElement.value,
    }),
  });

  reset();
}

document.addEventListener("DOMContentLoaded", () => {
  getRandomPokemons();
});
