export function getApiData(setter) {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=1292")
    .then((response) => response.json())
    .then((data) => setter(data));
}

export function randomizeArray<T>(array: T[]): T[] {
  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}

export function nameCapitalize(name: string): string {
  if (!name) return name;

  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function getPokemonId(url: string) {
  const slices = url.split("/");
  const cleanId = slices[slices.length - 2];

  return cleanId;
}

export function firstLoad<T>(
  previousArray,
  loadedCards,
) {
  const cardIncrease = 30;
  let alreadyLoaded = loadedCards;
  let nextToLoad = alreadyLoaded + cardIncrease;
  const newObjectsArray = [];
  const objectsToAdd = previousArray.slice(alreadyLoaded, nextToLoad);
  newObjectsArray.push(...objectsToAdd);
  return newObjectsArray;
}
