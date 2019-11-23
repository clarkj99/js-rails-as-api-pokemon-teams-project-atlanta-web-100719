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
        const ul = document.createElement('ul')

        trainer.pokemons.forEach((pokemon) => {
            const li = pokemonLi(pokemon)
            ul.appendChild(li);
        })

        div.appendChild(p);
        div.appendChild(button);
        div.appendChild(ul);
        main.appendChild(div);
    }

    fetch(TRAINERS_URL)
        .then(res => res.json())
        .then(data => {
            data.forEach(trainer => {
                makeCard(trainer)
            })
        })
        .then(() => {
        })

    function pokemonLi(pokemon) {
        const li = document.createElement('li');
        li.innerText = pokemon.nickname + ' (' + pokemon.species + ')';
        const button = document.createElement('button');
        button.className = 'release';
        button.setAttribute('data-pokemon-id', pokemon.id);
        button.innerText = 'Release';
        li.appendChild(button);

        return li
    }

    main.addEventListener('click', (event) => {
        if (!!event.target.dataset.pokemonId) {
            // delete pokemon
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
                    button.parentNode.parentNode.removeChild(button.parentNode)
                })

        }
        else if (!!event.target.dataset.trainerId) {
            // post new pokemon
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
                        const li = pokemonLi(data);
                        const ul = main.querySelector(`[data-id="${data.trainer_id}"] ul`)
                        ul.appendChild(li)
                    } else {
                        alert(data.message)
                    }
                })
        }
    })

});