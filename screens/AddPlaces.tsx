import { NativeStackScreenProps } from "@react-navigation/native-stack";
import PlaceForm from "../components/Places/PlaceForm";
import { Place } from "../models/place";
import { RootStackParamList } from "../util/types";

const AddPlaces = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "AddPlace">) => {
  const createPlaceHandler = (place: Place) => {
    navigation.navigate("AllPlaces", { place });
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlaces;
