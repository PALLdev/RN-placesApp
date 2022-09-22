import { NativeStackScreenProps } from "@react-navigation/native-stack";
import PlaceForm from "../components/Places/PlaceForm";
import { Place } from "../models/place";
import { insertPlace } from "../util/database";
import { RootStackParamList } from "../util/types";

const AddPlaces = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "AddPlace">) => {
  const createPlaceHandler = async (place: Place) => {
    await insertPlace(place);

    navigation.navigate("AllPlaces", { place });
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlaces;
