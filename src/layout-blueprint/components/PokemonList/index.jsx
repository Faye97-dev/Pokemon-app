import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { DEFAULT_LIMIT } from "../../../utils/constants/global";
import {
  QUERY_POKEMONS,
  QUERY_TYPE_POKEMONS,
} from "../../../utils/constants/react-query";
import AsyncDataWrapper from "../../../utils/hoc/AsyncDataWrapper";
import { useListQuery } from "../../../utils/hooks/useCrudQuery";
import InputSelect from "../Ui/InputSelect";
import Pagination from "../Ui/Pagination";
import PropTypes from "prop-types";

function PokemonList({ pokemonTypeUrlParams }) {
  const [typePokemon, setTypePokemon] = useState(pokemonTypeUrlParams);
  const [pokemonItems, setPokemonItems] = useState([]);

  // query args
  const [queyUrl, setQueryUrl] = useState(
    !pokemonTypeUrlParams ? "/pokemon" : "/type/" + pokemonTypeUrlParams
  );
  const [queryKey, setQueryKey] = useState(
    !pokemonTypeUrlParams
      ? QUERY_POKEMONS
      : QUERY_TYPE_POKEMONS + " | " + pokemonTypeUrlParams
  );
  const [isPaginated, setIsPaginated] = useState(
    !pokemonTypeUrlParams ? true : false
  );

  // pagination state
  const [offset, setOffset] = useState(0);
  const [nextBtnIsEnabled, setNextBtnIsEnabled] = useState(false);
  const [prevBtnIsEnabled, setPrevBtnIsEnabled] = useState(false);

  // reset Pagination
  const resetPagination = useCallback(() => {
    setNextBtnIsEnabled(false);
    setPrevBtnIsEnabled(false);
    setOffset(0);
  }, []);
  // page number
  const page = useMemo(() => {
    return (offset + DEFAULT_LIMIT) / DEFAULT_LIMIT;
  }, [offset]);

  /* ------ fetch query ------ */
  // query fetch type pokémons
  const queryTypePokemon = useListQuery({
    url: "/type",
    key: QUERY_TYPE_POKEMONS,
    isEnabled: !pokemonTypeUrlParams, // disable this query when route is '/type/{name}'
  });
  // query fetch list pokémons
  const {
    isLoading,
    isError,
    refetch,
    data: payload,
  } = useListQuery({
    url: queyUrl,
    key: queryKey,
    paginated: isPaginated,
    paginationConfig: { offset, DEFAULT_LIMIT },
  });

  /* ------ effects  ------ */
  useEffect(() => {
    // case fetching all pokémon whith pagination
    if (payload && typePokemon === "") {
      setPokemonItems(payload.results);
      setNextBtnIsEnabled(!!payload.next);
      setPrevBtnIsEnabled(!!payload.previous);
    }
    // case fetching pokémons of specific type
    if (payload && typePokemon !== "") {
      setPokemonItems(payload.pokemon.map((item) => item.pokemon));
      resetPagination();
    }
  }, [payload]);

  useEffect(() => {
    if (typePokemon === "") {
      setIsPaginated(true);
      setQueryUrl("/pokemon");
      setQueryKey(QUERY_POKEMONS);
    } else {
      setIsPaginated(false);
      setQueryUrl("/type/" + typePokemon);
      setQueryKey(QUERY_TYPE_POKEMONS + " | " + typePokemon);
    }
  }, [typePokemon]);

  return (
    <>
      <div className="flex items-center justify-end mb-6">
        {!pokemonTypeUrlParams && (
          <AsyncDataWrapper
            loading={queryTypePokemon.isLoading}
            error={queryTypePokemon.isError}
            isEmpty={queryTypePokemon.data?.results?.length === 0}
            emptyMsg="Empty data, no pokémon types to display !"
            refetch={queryTypePokemon.refetch}
          >
            <InputSelect
              valueState={[typePokemon, setTypePokemon]}
              label={"Types"}
              name="types"
              items={queryTypePokemon.data?.results || []}
              emptyValue="All pokémons"
            />
          </AsyncDataWrapper>
        )}
      </div>

      <AsyncDataWrapper
        loading={isLoading}
        error={isError}
        isEmpty={pokemonItems.length === 0}
        emptyMsg="Empty data, no pokémons to display !"
        refetch={refetch}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {pokemonItems.map((item) => {
            return (
              <div
                key={item.url}
                className="w-full bg-white mx-auto border border-gray-200 rounded-lg shadow-md "
              >
                <div className="p-5">
                  <Link to={"/pokemon/" + item.name}>
                    <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 ">
                      {item.name}
                    </h5>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* pagination */}
        {isPaginated && (
          <Pagination
            canNext={nextBtnIsEnabled}
            nextPageAction={() => setOffset(offset + DEFAULT_LIMIT)}
            canPrev={prevBtnIsEnabled}
            prevPageAction={() => setOffset(offset - DEFAULT_LIMIT)}
            page={page}
          />
        )}
      </AsyncDataWrapper>
    </>
  );
}

PokemonList.propTypes = {
  pokemonTypeUrlParams: PropTypes.string,
};
export default PokemonList;
