import React from "react";
import { useParams } from "react-router-dom";
import { QUERY_POKEMONS_ID } from "../../utils/constants/react-query";
import { useGetQuery } from "../../utils/hooks/useCrudQuery";
import { Link } from "react-router-dom";
import AsyncDataWrapper from "../../utils/hoc/AsyncDataWrapper";
import Wrapper from "../../layout-blueprint/components/Ui/Wrapper";

export default function PokemonView() {
  const { name } = useParams();
  const {
    isLoading,
    isError,
    refetch,
    data: payload,
  } = useGetQuery({
    url: "/pokemon/" + name,
    key: QUERY_POKEMONS_ID,
    id: name,
  });

  return (
    <Wrapper title="Pokémon Details">
      <AsyncDataWrapper
        loading={isLoading}
        error={isError}
        isEmpty={false}
        refetch={refetch}
      >
        <div className="flex items-center justify-center">
          <div
            href="#"
            className="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row hover:bg-gray-100"
          >
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
              src={payload?.sprites?.front_default}
              alt="front_default"
            />
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
              src={payload?.sprites?.back_default}
              alt="back_default"
            />

            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-blue-700">
                {payload?.name}
              </h5>
              <div className="flex flex-wrap mb-2">
                <span className="font-bold mr-3">Height :</span>
                <span>{payload?.height}</span>
              </div>
              <div className="flex  flex-wrap mb-2">
                <span className="font-bold mr-3">Weight :</span>
                <span>{payload?.weight}</span>
              </div>
              <div className="flex flex-wrap mb-2">
                <span className="font-bold mr-3">Base Experience :</span>
                <span>{payload?.base_experience}</span>
              </div>

              {/* Pokémon Stats */}
              <div className="flex flex-wrap mb-2">
                <span className="font-bold mr-3">Stats :</span>
                {payload?.stats?.map((item, idx) => {
                  return (
                    <div className="flex mr-2" key={item.stat.name}>
                      <span className="font-semibold">{item.base_stat}</span>
                      <span className="ml-1">
                        {item.stat.name}{" "}
                        {idx !== payload.stats.length - 1 && "|"}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Pokémon Abilities */}
              <div className="flex flex-wrap mb-2">
                <span className="font-bold mr-3">Abilities :</span>
                {payload?.abilities?.map((item) => {
                  return (
                    <div key={item.ability.name}>
                      <span className="bg-green-500 text-white text-xs font-semibold mr-2 px-2.5 py-1 rounded">
                        {item.ability.name}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Pokémon Types */}
              <div className="flex flex-wrap mb-2">
                <span className="font-bold mr-3">Types :</span>
                {payload?.types?.map((item) => {
                  return (
                    <div key={item.type.name}>
                      <Link
                        to={"/type/" + item.type.name}
                        className="bg-purple-500 text-white text-xs font-semibold mr-2 px-2.5 py-1 rounded"
                      >
                        {item.type.name}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </AsyncDataWrapper>
    </Wrapper>
  );
}
