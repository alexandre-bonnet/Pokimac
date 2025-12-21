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
