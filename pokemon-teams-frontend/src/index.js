const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

window.addEventListener('DOMContentLoaded', () => {

    main = document.querySelector('main');

    function makeCard(trainer) {
        const div = document.createElement('div')
        div.className = 'card'
        div.setAttribute('data-id', trainer.id)
        const p = document.createElement('p')
        p.innerText = trainer.name
        const button = document.createElement('button')
        button.setAttribute('data-trainer-id', trainer.id)
        button.innerText = 'Add Pokemon'
        button.addEventListener('click')
        const ul = document.createElement('ul')

        trainer.pokemons.forEach((pokemon) => {
            const li = document.createElement('li');
            li.innerText = pokemon.nickname + ' (' + pokemon.species + ')';
            const button = document.createElement('button');
            button.className = 'release';
            button.setAttribute('data-pokemon-id', pokemon.id);
            button.innerText = 'Release';

            li.appendChild(button);
            ul.appendChild(li);

            button.addEventListener('click', (event) => {
                // delete the thing
            })
        })

        div.appendChild(p);
        div.appendChild(button);
        div.appendChild(ul);
        main.appendChild(div);
    }

    console.log(main)
    fetch(TRAINERS_URL)
        .then(res => res.json())
        .then(data => {
            data.forEach(trainer => {
                makeCard(trainer)
            })
        })
});