import { useMemo, useState } from "react";
import { CharacterList} from "./CharacterList";

export const LocationItem = ({ location }) => {
  const [open, setOpen] = useState(false);

  const ids = useMemo(
    () =>
        location.residents.map((resident) => {
            const id = resident.split("/").pop();
            return id;
      }),
    [location?.residents]
  );


  return (
    <div className="location" onClick={() => setOpen(true)}>
      <h3>{location.id + ":" + location.name}</h3>
      {open && <CharacterList ids={ids} />}
    </div>
  );
};
