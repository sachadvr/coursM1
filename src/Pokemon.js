import { useEffect, useState } from "react";
import { useFetch } from "./useFetch";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Pokemon = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialOffset = parseInt(searchParams.get("offset")) || 0;
  const initialLimit = parseInt(searchParams.get("limit")) || 20;
  const initialSearchTerm = searchParams.get("search") || "";
  const [offset, setOffset] = useState(initialOffset);
  const [limit, setLimit] = useState(initialLimit);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const nav = useNavigate();
  const { data, isPending, error } = useFetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  const [pokemonData, setPokemonData] = useState({});

  useEffect(() => {
    if (data) {
      data.results.forEach(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const pokemonDetails = await response.json();
        setPokemonData((prevData) => ({
          ...prevData,
          [pokemon.name]: pokemonDetails.sprites.front_default,
        }));
      });
    }
  }, [data, offset, limit]);

  const handleLimitChange = (event) => {
    const newLimit = parseInt(event.target.value);
    setLimit(newLimit);
    nav(`?offset=${offset}&limit=${newLimit}&search=${searchTerm}`);
  };

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value.toLowerCase();
    setSearchTerm(newSearchTerm);
    nav(`?offset=${offset}&limit=${limit}&search=${newSearchTerm}`);
  };

  const filteredPokemon = data ? data.results.filter((pokemon) => pokemon.name.includes(searchTerm)) : [];

  return (
    <div className="flex flex-col p-5 gap-5">
      {error && <div>Une erreur est survenue : {error}</div>}
      {isPending && <div>Chargement des pokémons...</div>}
      <div>
        <label htmlFor="limit">Nombre de pokémons par page: </label>
        <select id="limit" value={limit} onChange={handleLimitChange}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="500">500</option>
        </select>
      </div>
      <div>
        <label htmlFor="search">Rechercher un Pokémon: </label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Nom du Pokémon"
        />
      </div>
      {filteredPokemon.map((pokemon) => (
        <div className="p-5 text-2xl uppercase bg-gray-200 flex flex-col items-center h-52 font-semibold" key={pokemon.name}>
          <Link to={`/pokemon/${pokemon.name}`}>
            <img src={pokemonData[pokemon.name]} alt={pokemon.name} />
          </Link>
          <p className="mt-auto">
            {pokemon.name}
          </p>
        </div>
      ))}
      {data && (<button onClick={() => { if (offset - limit >= 0) { setOffset(offset - limit); nav(`?offset=${offset - limit}&limit=${limit}&search=${searchTerm}`); } }}>Précédent</button>)}
      {data && (<button onClick={() => { setOffset(offset + limit); nav(`?offset=${offset + limit}&limit=${limit}&search=${searchTerm}`); }}>Suivant</button>)}
    </div>
  );
}

export default Pokemon;
