import { CharacterItemLoc } from "./CharacterItemLoc";
import { useCharacters } from "../hooks/useCharacters";

export const CharacterListLoc = ({ids}) => {
    const { characters, isLoading } = useCharacters(ids);

  if (isLoading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="characters-container">
      {characters.map((character) => (
        <CharacterItemLoc key={character.id} character={character} />
      ))}
    </div>
  );

}