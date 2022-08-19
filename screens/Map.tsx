import { useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { MapEvent, Marker, Region } from "react-native-maps";
import { LocationType } from "../util/types";

const Map = () => {
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
