import React, { useState, useEffect, useRef } from "react";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
} from "@ionic/react";
import { nameCapitalize } from "../utils/utils";
import "./PokemonCardModal.css";

function PokemonCardModal({ isOpen, toggleOpen, pokemonId }) {
  const [pokemonData, setPokemonData] = useState();

  useEffect(() => {
    if (pokemonId) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then((response) => response.json())
        .then((data) => setPokemonData(data));
    }
  }, [pokemonId]);


  return (
    <IonModal isOpen={isOpen} className="fullscreen-modal">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={toggleOpen}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      {pokemonData && pokemonId && (
        <IonContent className="ion-padding card-container">
          <h2>{pokemonData && nameCapitalize(pokemonData.forms[0].name)}</h2>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
          ></img>
          <ul lines="none" className="stats-ul">
            <li className="stats-li">
              Base Experience:{" "}
              {pokemonData.base_experience
                ? pokemonData.base_experience + " XP"
                : "0xp"}
            </li>
            <li className="stats-li">Height: {pokemonData.height}</li>
            <li className="stats-li">Weight: {pokemonData.weight}</li>
            <li className="stats-li">
              <div className="abilities-container">
                Abilities:
                <ul className="abilities-ul">
                  {pokemonData.abilities.map((ability, index) => (
                    <li className="abilities-li" key={index}>
                      {nameCapitalize(ability.ability.name)}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </IonContent>
      )}
    </IonModal>
  );
}

export default PokemonCardModal;
