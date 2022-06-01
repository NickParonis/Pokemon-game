const rectColliding = ({rectangular1, rectangular2}) => {
    return (
        rectangular1.position.x  + rectangular1.width >= rectangular2.position.x &&
        rectangular1.position.x   <= rectangular2.position.x + rectangular2.width &&
        rectangular1.position.y + rectangular1.height  >= rectangular2.position.y &&
        rectangular1.position.y  <= rectangular2.position.y + rectangular2.height
    )
}

const fetchPokemon = () => {
    for ( let i = 1; i <= 701; i++){
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        fetch(url)
        .then( res => {
            return res.json();
        })
        .then( data => {
            let currentPokemon = {
                name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
                id: data.id,
                image: data.sprites['front_default'],
                imageshiny: data.sprites['front_shiny'],
                imageback: data.sprites['back_default'],
                imagebackshiny: data.sprites['back_shiny'],
                type: data.types.map( type => {
                    return type.type.name
                }),
                HP: data.stats[0].base_stat,
                ATK: data.stats[1].base_stat,
                DEF: data.stats[2].base_stat,
                SPATK: data.stats[3].base_stat,
                SPDEF: data.stats[4].base_stat,
                SPEED: data.stats[5].base_stat,
                height: data.height,
                weight: data.weight
            };
            pokemons[data.id] = currentPokemon;
        });
    };
};