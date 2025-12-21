async function getScores() {
  const generation = document.getElementById("gen-select");

  const response = await fetch(
    `https://pokimac-api.super-sympa.fr/scores?generation=${generation.value}`
  );
  const data = await response.json();

  const listScores = document.getElementById("scores-list");
  listScores.innerHTML = "";

  if (data.scores.length === 0) {
    const emptyText = document.createElement("p");
    emptyText.innerText = "Aucun score dans cette génération pour le moment.";
    listScores.appendChild(emptyText);
    return;
  }

  const sortedScores = data.scores.sort((a, b) => a.score - b.score < 0);

  for (let scoreIdx in sortedScores) {
    const row = document.createElement("tr");
    const rankTd = document.createElement("td");
    rankTd.innerText = +scoreIdx + 1;
    const nameTd = document.createElement("td");
    nameTd.innerText = sortedScores[scoreIdx].username;
    const scoreTd = document.createElement("td");
    scoreTd.innerText = sortedScores[scoreIdx].score;
    row.append(rankTd, nameTd, scoreTd);
    listScores.appendChild(row);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getScores();
});

//audio de la nav bar
const audio = document.getElementById("bg-music");
const imgs = document.querySelectorAll(".nav-buttons img");
let x = null;

function changeState(newState) {
  imgs.forEach(img => img.classList.remove("active"));
  x = newState;
  imgs[x].classList.add("active");

  if (x == 1) {
    audio.play();
  } else if (x == 2) {
    audio.pause();
  }
}

document.getElementById("play-btn").addEventListener("click", () => changeState(1));
document.getElementById("pause-btn").addEventListener("click", () => changeState(2));
