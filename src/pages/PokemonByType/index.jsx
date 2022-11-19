import React from "react";
import { useParams } from "react-router-dom";
import PokemonList from "../../layout-blueprint/components/PokemonList";
import Wrapper from "../../layout-blueprint/components/Ui/Wrapper";

export default function PokemonByType() {
  const { name } = useParams();
  return (
    <Wrapper title={"Pokémon type : " + name}>
      <PokemonList pokemonTypeUrlParams={name} />
    </Wrapper>
  );
}
