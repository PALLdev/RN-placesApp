import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Place } from "../models/place";
import PlacesList from "../components/Places/PlacesList";
import { fetchAllPlaces } from "../util/database";

const AllPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchAllPlaces();
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
