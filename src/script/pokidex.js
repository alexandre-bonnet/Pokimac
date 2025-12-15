let pokemons = [];

async function getPokemon(){
    const response = await fetch(
        `https://pokimac-api.super-sympa.fr/generation/${1}` // on peut mettre une variable à la place du 1
    );
    const data = await response.json();

    console.log(data) // ça affiche dans la console le contenu tu peux regarder

}

document.addEventListener("DOMContentLoaded", () => { // pour lancer des trucs au lancement de la page
  getPokemon();
});