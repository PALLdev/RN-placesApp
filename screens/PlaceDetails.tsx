import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlineButton from "../components/ui/OutlineButton";
import { Colors } from "../constants/colors";
import { Place } from "../models/place";
import { getPlaceFromDb } from "../util/http";
import { RootStackParamList } from "../util/types";

const PlaceDetails = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "PlaceDetails">) => {
  const selectedPlaceId = route.params.placeId;
  const [loadedPlace, setLoadedPlace] = useState<Place>();

  // fetch data for single place with selected id
  useEffect(() => {
    const loadPlaceData = async () => {
      const place = await getPlaceFromDb(selectedPlaceId);
      setLoadedPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    };

    loadPlaceData();
  }, [selectedPlaceId]);

  const showOnMapHandler = () => {
    if (!loadedPlace) return;
    navigation.navigate("Map", {
      lat: loadedPlace.location.lat,
      lng: loadedPlace.location.lng,
    });
  };

  if (!loadedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image source={{ uri: loadedPlace.imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{loadedPlace.address}</Text>
        </View>
        <OutlineButton onPress={showOnMapHandler} icon={"map"} size={24}>
          Ver en mapa
        </OutlineButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "35%",
    minHeight: 300,
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
