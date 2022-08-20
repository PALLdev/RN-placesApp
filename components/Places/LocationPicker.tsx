import { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import {
  RouteProp,
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Colors } from "../../constants/colors";
import OutlineButton from "../ui/OutlineButton";
import { LocationType, RootStackParamList } from "../../util/types";
import { getMapPreview } from "../../util/location";

const LocationPicker = () => {
  const [pickedLocation, setPickedLocation] = useState<LocationType>();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "AddPlace">>();
  const route = useRoute<RouteProp<RootStackParamList, "AddPlace">>();
  //false when we enter to map screen, true when we come back from map screen (returns true if this screen is the main screen of the stack)
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation: LocationType = {
        lat: route.params.lat,
        lng: route.params.lng,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  const verifyPermissions = async () => {
    let { status } = await requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permisos insuficientes",
        "No haz otorgado los permisos necesarios para buscar tu ubicación."
      );
      return false;
    }

    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };

  let locationPreview = (
    <Text style={styles.fallbackText}>
      Elige una ubicación para mostrar preview
    </Text>
  );

  if (pickedLocation) {
    locationPreview = (
      <Image
        source={{ uri: getMapPreview(pickedLocation) }}
        style={styles.locationPrevImage}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPrev}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlineButton onPress={getLocationHandler} icon={"location"} size={18}>
          Ubicación actual
        </OutlineButton>
        <OutlineButton onPress={pickOnMapHandler} icon={"map"} size={18}>
          Abrir mapa
        </OutlineButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPrev: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: Colors.primary100,
    marginVertical: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  fallbackText: {
    color: Colors.primary700,
  },
  locationPrevImage: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});
