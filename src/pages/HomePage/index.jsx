import React from "react";
import PokemonList from "../../layout-blueprint/components/PokemonList";
import Wrapper from "../../layout-blueprint/components/Ui/Wrapper";

export default function HomePage() {
  return (
    <Wrapper title="Home Page">
      <PokemonList pokemonTypeUrlParams={""} />
    </Wrapper>
  );
}
