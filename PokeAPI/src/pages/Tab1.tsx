import React, { useEffect, useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import './Tab1.css';
import { getApiData, randomizeArray, nameCapitalize, getPokemonId } from '../utils/utils';

const Tab1: React.FC = () => {

  const [ApiResponse, setApiResponse] = useState();
  const [pokeData, setPokeData] = useState();

  useEffect(() => {
    getApiData(setApiResponse);
  }, [])

  useEffect(() => {
    if (ApiResponse) {
      const randomizedPokeData = randomizeArray(ApiResponse.results)
      setPokeData(randomizedPokeData)
    }
  }, [ApiResponse])
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pocketdex</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid fixed={true}>
          <IonRow>
            {pokeData && console.log(pokeData)}
            {pokeData && pokeData.map((poke, index) =>(
              <IonCol key={index}>
                <IonCard>
                <img alt={`imagen de ${poke.name}`}  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getPokemonId(poke.url)}.png`} />
                  <IonCardHeader>
                    <IonCardTitle>{nameCapitalize(poke.name)}</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard>
                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                <IonCardHeader>
                  <IonCardTitle>Card Title</IonCardTitle>
                  <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard>
                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                <IonCardHeader>
                  <IonCardTitle>Card Title</IonCardTitle>
                  <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
