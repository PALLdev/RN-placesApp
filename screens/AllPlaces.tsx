import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Place } from "../models/place";
import PlacesList from "../components/Places/PlacesList";
import { getPlacesFromDb } from "../util/http";

const AllPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      const places = await getPlacesFromDb();
      setLoadedPlaces(places);
    }

    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  //display list of places or some text if no places
  return <PlacesList items={loadedPlaces} />;
};

export default AllPlaces;
