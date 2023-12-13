import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCol,
  IonGrid,
  IonRow,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from "@ionic/react";
import "./Tab1.css";
import {
  getApiData,
  randomizeArray,
  nameCapitalize,
  getPokemonId,
  firstLoad,
} from "../utils/utils";

const Tab1: React.FC = () => {
  const [ApiResponse, setApiResponse] = useState();
  const [pokeData, setPokeData] = useState();
  const [loadedCards, setLoadedCards] = useState();
  const [currentLoaded, setCurrentLoaded] = useState(0);
  const [finalMessage, setFinalMessage] = useState();

  useEffect(() => {
    getApiData(setApiResponse);
  }, []);

  useEffect(() => {
    if (ApiResponse) {
      const randomizedPokeData = randomizeArray(ApiResponse.results);
      setPokeData(randomizedPokeData);
    }
  }, [ApiResponse]);

  useEffect(() => {
    if (pokeData) {
      setLoadedCards(firstLoad(pokeData, currentLoaded));
      setCurrentLoaded(30);
    }
  }, [pokeData]);

  const loadCards = () => {
    const cardLimit = 1200;
    const cardIncrease = 30;
    let alreadyLoaded = loadedCards.length;
    let nextToLoad = alreadyLoaded + cardIncrease;
    const newObjectsArray = [];
    const objectsToAdd = pokeData.slice(alreadyLoaded, nextToLoad);
    newObjectsArray.push(...objectsToAdd);
    setCurrentLoaded(nextToLoad);
    setLoadedCards([...loadedCards, ...newObjectsArray]);
    if (loadedCards.length >= cardLimit){
      setFinalMessage("Enough pokemon for today...")
    }
  };

  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      window.location.reload();
      event.detail.complete();
    }, 2000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pocketdex</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid fixed={true}>
          <IonRow>
            {loadedCards &&
              loadedCards.map((poke, index) => (
                <IonCol key={index} size="4">
                  <IonCard>
                    <img
                      className="pokemon-img"
                      alt={`imagen de ${poke.name}`}
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getPokemonId(
                        poke.url
                      )}.png`}
                    />
                    <IonCardHeader>
                      <IonCardTitle>{nameCapitalize(poke.name)}</IonCardTitle>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
              ))}
          </IonRow>
        </IonGrid>
        {finalMessage && <h2 className="final-message">{finalMessage}</h2>}
        <IonInfiniteScroll
          onIonInfinite={(ev) => {
            loadCards();
            setTimeout(() => ev.target.complete(), 500);
          }}
        >
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;