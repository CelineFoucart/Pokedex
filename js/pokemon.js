const container = document.querySelector('#pokemon');

export const maxLimit = 150;

export const getPokemon = async (id, articleClassName = "col-md-4 col-lg-3 my-3") => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    const pokemon = await response.json();
    createCard(pokemon, articleClassName);
};

export const createCard = (pokemon, articleClassName) => {
    const article = document.createElement('article');
    article.className = articleClassName;
    article.innerHTML = `<div class="card">
    <img src="${pokemon.sprites.front_default}" alt="illustration du pokemon">
    <div class="card-body">
      <h4 class="card-title text-center">${pokemon.name}</h4>
      <p class="text-center"><small class="text-muted">${pokemon.id}</small></p>
      <p class="card-text text-center"><span class="fw-bold">Taille :</span> ${pokemon.types[0].type.name}</p>
    </div>
  </div>`;
  container.appendChild(article);
};

export const fetchPokemons = async () => {
    for (let i = 1; i <= maxLimit; i++) {
        await getPokemon(i);
    }
};