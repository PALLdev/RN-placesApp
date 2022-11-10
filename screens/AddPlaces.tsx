import { NativeStackScreenProps } from "@react-navigation/native-stack";
import PlaceForm from "../components/Places/PlaceForm";
import { Place } from "../models/place";
import { storePlaceOnDb } from "../util/http";
import { RootStackParamList } from "../util/types";

const AddPlaces = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "AddPlace">) => {
  const createPlaceHandler = (place: Place) => {
    storePlaceOnDb({
      title: place.title,
      address: place.address,
      imageUri: place.imageUri,
      lat: place.location.lat,
      lng: place.location.lng,
    });

    navigation.navigate("AllPlaces");
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlaces;
