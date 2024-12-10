export const fetchEpisodes = () => {
  return fetch("https://rickandmortyapi.com/api/episode")
    .then((response) => response.json())
    .then((data) => {
      return data.results;
    });
};

export const fetchCharacters = async (ids) => {
  await sleep(1000);
  return fetch(
    `https://rickandmortyapi.com/api/character/${ids.join(",")}`
  ).then((response) => response.json());
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const fetchLocations = () => {
  return fetch("https://rickandmortyapi.com/api/location")
    .then((response) => response.json())
    .then((data) => {
      return data.results;
    });
};

