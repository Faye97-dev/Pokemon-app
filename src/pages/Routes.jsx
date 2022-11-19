import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Layout from "../layout-blueprint/Layout";
import HomePage from "./HomePage";
import PokemonByType from "./PokemonByType";
import PokemonView from "./PokemonView";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="pokemon/:name" element={<PokemonView />} />
          <Route path="type/:name" element={<PokemonByType />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </div>
  );
}

function About() {
  return (
    <div className="flex justify-center">
      <div>
        <h2 className="text-center">Pokémon App </h2>
      </div>
    </div>
  );
}

function Page404() {
  return (
    <div className="flex justify-center">
      <div>
        <h2 className="text-center">Page not found !</h2>
        <div className="my-4">
          <Link
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
            to="/"
          >
            Go to the home page
          </Link>
        </div>
      </div>
    </div>
  );
}
