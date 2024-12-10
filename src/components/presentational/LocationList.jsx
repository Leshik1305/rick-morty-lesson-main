
import { Collapse } from "./Collapse";
import { CharacterListLoc } from "./CharacterListLoc";
import { useLocations } from "../hooks/useLocations";
import "../Rick.css";


export const LocationList = () => {
    const { locations } = useLocations();
    return (
        
        <div>
            <Collapse
                className="buttons"
                title="LOCATIONS"
                content = {
                    locations.map((location) =>(
                    <Collapse
                        key = {location.id}
                        className = "location"
                        title={location.id + ":" + location.name}
                        content = {
                            <CharacterListLoc
                                ids={location.residents.map((resident) => {
                                const id = resident.split("/").pop();
                                return id;
                                })}
                            />
                        }
                    />
                    )
                )
                }
            />
        </div>
    )
}