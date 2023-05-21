import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PokemonCard from '../components/PokemonCard';
import { Container } from '@mui/material';
import { Grid } from '@mui/material'
import axios from 'axios';

const ERROR = 'Ops temos um problema:'

export const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = () => {
    const endpoints = []
    for( let i = 1; i<50; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
    }

    axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => setPokemons(res))
      .catch((err) => console.log(ERROR, err));

  }

  const pokemonFilter = (name) => {
    var filteredPokemons = [];
    if (name === "") {
      getPokemons();
    }
    for (var i in pokemons) {
      if (pokemons[i].data.name.includes(name)) {
        filteredPokemons.push(pokemons[i]);
      }
    }

    setPokemons(filteredPokemons);
  };

  return (
    <div>
      <Navbar pokemonFilter={pokemonFilter} />
      <Container maxWidth="false" sx={{ marginTop: "100px" }}>
        <Grid container spacing={1} sx={{ paddingTop: "16px" }}>
          {pokemons.map((pokemon, key) => (
            <Grid item xs={12} sm={4} md={3} key={key}>
              <PokemonCard
                name={pokemon.data.name}
                image={pokemon.data.sprites.front_default}
                types={pokemon.data.types}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
