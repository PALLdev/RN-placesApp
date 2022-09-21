import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Place } from "../../models/place";
import PlaceItem from "./PlaceItem";

interface PlacesListProps {
  items: Place[];
}

const onSelectHandler = () => {};

const PlacesList = ({ items }: PlacesListProps) => {
  if (!items || items.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No has agregado lugares a tu lista
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={items}
      keyExtractor={(item) => item.id as string}
      renderItem={(placeItem) => (
        <PlaceItem place={placeItem} onSelect={onSelectHandler} />
      )}
    ></FlatList>
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 14,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary100,
  },
});
