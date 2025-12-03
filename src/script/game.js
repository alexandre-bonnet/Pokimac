const NB_POKEMONS = 10;
const MAX_HINTS = 4;

let pokemons = [];
let currentPokemonIndex = 0;
let score = 0;
let nbHints = 0;

async function getRandomPokemons() {
  const response = await fetch(
    `https://pokimac-api.super-sympa.fr/random?generation=1&count=${NB_POKEMONS}`
  );
  const data = await response.json();

  pokemons = data.pokemons;

  updatePage();
}

function submitAnswer(e) {
  e.preventDefault();
  const input = document.getElementById("user-input");
  if (
    input.value.toLowerCase().trim() ===
    pokemons[currentPokemonIndex].name.toLowerCase()
  ) {
    input.value = "";
    currentPokemonIndex++;
    score += 5;
    nbHints = 0;
    const helpButton = document.getElementById("help-button");
    helpButton.disabled = false;
    if (currentPokemonIndex < NB_POKEMONS) {
      updatePage();
    } else {
      endGame();
    }
  } else {
    alert("Pas bon !");
  }
}

function updatePage() {
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
  alert("fini");
}

document.addEventListener("DOMContentLoaded", () => {
  getRandomPokemons();
});
