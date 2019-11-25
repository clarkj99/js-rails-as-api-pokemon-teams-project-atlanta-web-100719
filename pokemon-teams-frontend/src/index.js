const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

window.addEventListener('DOMContentLoaded', () => {

    const main = document.querySelector('main');

    function fetchTrainers() {
        fetch(TRAINERS_URL)
            .then(res => res.json())
            .then(showTrainers)
    }

    function showTrainers(trainers) {
        trainers.forEach(addCard)
    }

    function addCard(trainer) {
        const div = document.createElement('div');
        div.className = 'card';
        div.setAttribute('data-id', trainer.id);
        const p = document.createElement('p');
        p.innerText = trainer.name;
        const button = document.createElement('button');
        button.setAttribute('data-trainer-id', trainer.id);
        button.innerText = 'Add Pokemon';
        button.addEventListener('click', addPokemon);

        const ul = document.createElement('ul');

        trainer.pokemons.forEach((pokemon) => {
            ul.appendChild(pokemonLi(pokemon));
        })

        div.appendChild(p);
        div.appendChild(button);
        div.appendChild(ul);
        main.appendChild(div);
    }

    function pokemonLi(pokemon) {
        const li = document.createElement('li');
        li.innerText = pokemon.nickname + ' (' + pokemon.species + ')';
        const button = document.createElement('button');
        button.className = 'release';
        button.setAttribute('data-pokemon-id', pokemon.id);
        button.innerText = 'Release';
        button.addEventListener('click', releasePokemon);
        li.appendChild(button);
        return li
    }

    function addPokemon(event) {
        fetch(POKEMONS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                trainer_id: event.target.dataset.trainerId
            })
        })
            .then(res => res.json())
            .then(data => {
                if (!data.status) {
                    const ul = main.querySelector(`[data-id="${data.trainer_id}"] ul`);
                    const li = pokemonLi(data);
                    ul.appendChild(li);
                } else {
                    alert(data.message);
                }
            })
    }

    function releasePokemon(event) {
        fetch(POKEMONS_URL + '/' + event.target.dataset.pokemonId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: event.target.dataset.pokemonId
            })
        })
            .then(res => res.json())
            .then(data => {
                const button = main.querySelector(`[data-pokemon-id="${data.id}"]`)
                button.parentNode.remove();
            })
    }

    fetchTrainers();

});