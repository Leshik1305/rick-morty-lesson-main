import { useEffect, useState } from "react";
import { fetchEpisodes, fetchCharacters } from "../api";
import "./Rick.css";

export const Rick = () => {
  const [episodes, setEpisodes] = useState([]);
  const [charactersByEpisodes, setCharactersByEpisodes] = useState({});
  const [isLoadingByEpisodes, setIsLoadingByEpisodes] = useState({});

  useEffect(() => {
    fetchEpisodes().then((data) => {
      setEpisodes(data);
    });
  }, []);

  const handleEpisodeClick = (episode) => {
    const ids = episode.characters.map((character) => {
      const id = character.split("/").pop();
      return id;
    });

    

    setIsLoadingByEpisodes({ ...isLoadingByEpisodes, [episode.id]: true });

    fetchCharacters(ids).then((data) => {
      setCharactersByEpisodes({ ...charactersByEpisodes, [episode.id]: data });
      setIsLoadingByEpisodes({ ...isLoadingByEpisodes, [episode.id]: false });
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Alive":
        return "character-alive";
      case "Dead":
        return "character-dead";
      default:
        return "character-unknown";
    }
  };

  return (
   
    <div>
      {episodes.map((episode) => {
        return (
          <div
            key={episode.id}
            className="episode"
            onClick={() => handleEpisodeClick(episode)}
          >
            <h3>{episode.episode + ":" + episode.name}</h3>
            <div className="characters-container">
              {isLoadingByEpisodes[episode.id] && (
                <div className="loading">Загрузка...</div>
              )}
              {charactersByEpisodes[episode.id]?.map((character) => {
                return (
                  <div
                    key={episode.id + ":" + character.id}
                    className={"character " + getStatusClass(character.status)}
                  >
                    <div className="character-left">
                      <img src={character.image} alt={character.name} />
                    </div>  
                    <div className="character-right">
                      <h3>{character.name}</h3>
                      <div>Вид: {character.species}</div>
                      <div>Пол: {character.gender}</div>
                      <div>Локация: {character.location.name}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
