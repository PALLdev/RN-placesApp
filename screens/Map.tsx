import { StyleSheet } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";

const Map = () => {
  const region: Region = {
    latitude: -35.33321,
    longitude: -72.41156,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return <MapView initialRegion={region} style={styles.map}></MapView>;
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
