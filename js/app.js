import { karaoke } from './karoke.js';
import {fetchPokemons, getPokemon} from './pokemon.js';

const url = window.location.href;
const action = url.split(window.location.origin)[1];
if(action === "/index.html") {
    fetchPokemons();
} else {   
    karaoke();
 
    getPokemon(1, "card-poke");
    setInterval(() => {
        let random = Math.floor(Math.random() * (150 - 1) + 1);
        const card = document.querySelector('.card-poke');
        if(card !== null) {
            card.remove();
        }
        getPokemon(random, "card-poke");
    }, 5000);
}
