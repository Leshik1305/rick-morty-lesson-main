import { useEffect, useState } from "react";
import { fetchLocations, fetchCharacters } from "../api";
import "./Rick.css"
import { Collapse } from "./presentational/Collapse";


export const Location = () =>{
    const [locations, setLocations] = useState([]);
    const [charactersByLocations, setCharactersByLocations] = useState({});
    const [isLoadingByLocations, setIsLoadingByLocations] = useState({});


    useEffect(() => {
        fetchLocations().then((data) => {
            setLocations(data);
        })
    }, [])

    const handleLocationClick = (location) => {
        const ids = location.residents.map((resident) => {
            const id = resident.split("/").pop();
            return id
        });

        setIsLoadingByLocations({ ...isLoadingByLocations, [location.id]: true });
        fetchCharacters(ids).then((data) => {
            const characters = Array.isArray(data) ? data : [data];
            setCharactersByLocations({ ...charactersByLocations, [location.id]: characters });
            setIsLoadingByLocations({ ...isLoadingByLocations, [location.id]: false });
        });
    }

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
            <Collapse
        className="buttons"
        title = "LOCATIONS"
        content =
            {locations.map((location) => {
                return (
                    <div 
                        key={location.id} 
                        className = 'location'
                        onClick = {() => handleLocationClick(location)}
                    >
                        <h3>{location.id + ": " + location.name}</h3>
                        <div className = "characters-container">
                            {isLoadingByLocations[location.id] && (
                                <div className="loading">Загрузка...</div>
                            )}
                            {charactersByLocations[location.id]?.map((character) => {
                                return(
                                    <div 
                                        key={location.id + ":" + character.id} 
                                        className={"character " + getStatusClass(character.status)}
                                    >
                                        <div className="character-left">
                                            <img src={character.image} alt={character.name} />
                                        </div>
                                        <div className="character-right">
                                            <h2>{character.name}</h2>
                                            <div>Вид: {character.species}</div>
                                            <div>Пол: {character.gender}</div>
                                            
                                            
                                        </div>
                                    </div>
                            )

                        })}
                        </div>
                    </div>
                )
            })}
            />
        </div>
    )
}
