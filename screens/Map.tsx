import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { MapEvent, Marker, Region } from "react-native-maps";
import IconButton from "../components/ui/IconButton";
import { LocationType, RootStackParamList } from "../util/types";

const Map = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationType>();

  const region: Region = {
    latitude: -35.33321,
    longitude: -72.41156,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = ({ nativeEvent }: MapEvent) => {
    const latitude = nativeEvent.coordinate.latitude;
    const longitude = nativeEvent.coordinate.longitude;

    // reevaluates the component after selecting a location
    setSelectedLocation({ lat: latitude, lng: longitude });
  };

  // usecallbacks prevents infinite loops or unnecesary effect re-execution bc this func in an effect dependency
  const saveSelectedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "Error al guardar ubicación",
        "Debes seleccionar una ubicación en el mapa antes de guardar"
      );
      return;
    }
    navigation.navigate("AddPlace", {
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
    });
  }, [selectedLocation, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save-outline"
          color={tintColor}
          onPress={saveSelectedLocationHandler}
          size={20}
        />
      ),
    });
  }, [navigation, saveSelectedLocationHandler]);

  return (
    <MapView
      initialRegion={region}
      onPress={selectLocationHandler}
      style={styles.map}
    >
      {selectedLocation && (
        <Marker
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
          title="Ubicación elegida"
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
