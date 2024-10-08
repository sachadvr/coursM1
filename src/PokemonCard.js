import './App.css';
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PokemonCard = () => {
  const { name } = useParams();
  const history = useNavigate();
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon details");
        }
        const data = await response.json();
        setPokemonDetails(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [name]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Calculate image size based on height
  const imageSize = pokemonDetails.height * 30; // Adjust the multiplier as needed

  return (
    <div className='p-5 bg-black text-white h-screen justify-center items-center flex text-5xl uppercase flex-col'>
      <h1>{pokemonDetails.name}</h1>
      <img
        src={pokemonDetails.sprites.front_default}
        alt={pokemonDetails.name}
        style={{ width: `${imageSize}px`, height: `${imageSize}px` }}
      />

      {/* Display additional information */}
      <div className="mt-4 text-2xl">
        <p><strong>Base Experience:</strong> {pokemonDetails.base_experience}</p>
        <p><strong>Height:</strong> {pokemonDetails.height}</p>
        <p><strong>Abilities:</strong></p>
        <ul>
          {pokemonDetails.abilities.map((ability, index) => (
            <li key={index}>{ability.ability.name} {ability.is_hidden && "(Hidden)"}</li>
          ))}
        </ul>
        <p><strong>Held Items:</strong></p>
        {pokemonDetails.held_items.length > 0 ? (
          <ul>
            {pokemonDetails.held_items.map((item, index) => (
              <li key={index}>{item.item.name}</li>
            ))}
          </ul>
        ) : (
          <p>No items held</p>
        )}
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5"
        onClick={() => history(-1)}
      >
        Retour
      </button>
    </div>
  );
}

export default PokemonCard;
