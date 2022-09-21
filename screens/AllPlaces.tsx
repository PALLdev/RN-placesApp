import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { Place } from "../models/place";
import { RootStackParamList } from "../util/types";

const AllPlaces = ({
  route,
}: NativeStackScreenProps<RootStackParamList, "AllPlaces">) => {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlaces((currPlaces) => [...currPlaces, route.params!.place]);
    }
  }, [isFocused, route]);

  //display list of places or some text if no places
  return <PlacesList items={loadedPlaces} />;
};

export default AllPlaces;
