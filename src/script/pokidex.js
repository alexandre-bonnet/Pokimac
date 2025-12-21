let pokemons = [];

async function getPokemon() {
  const generation = document.getElementById("gen-select");

  const response = await fetch(
    `https://pokimac-api.super-sympa.fr/generation/${generation.value}`
  );
  const data = await response.json();

  const listPokemons = document.getElementById("pokemons-list");

  listPokemons.innerHTML = "";

  for (let pokemon of data.pokemons) {
    const row = document.createElement("tr");
    const imageTd = document.createElement("td");
    const img = document.createElement("img");
    img.classList.add("img-pokemon");
    img.src = pokemon.image;
    imageTd.appendChild(img);
    const nameTd = document.createElement("td");
    nameTd.innerText = pokemon.name;
    const typeTd = document.createElement("td");
    typeTd.classList.add("type-container");
    for (let type of pokemon.types) {
      const imgType = document.createElement("img");
      imgType.classList.add("img-type");
      imgType.src = type.image;
      typeTd.appendChild(imgType);
    }
    row.append(imageTd, nameTd, typeTd);
    listPokemons.appendChild(row);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getPokemon();
});
