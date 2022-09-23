import { FlatList, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Colors } from "../../constants/colors";
import { Place } from "../../models/place";
import { RootStackParamList } from "../../util/types";
import PlaceItem from "./PlaceItem";

interface PlacesListProps {
  items: Place[];
}

const PlacesList = ({ items }: PlacesListProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "AllPlaces">>();

  const onSelectHandler = (id: string) => {
    navigation.navigate("PlaceDetails", {
      placeId: id,
    });
  };

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
    marginVertical: 14,
    paddingHorizontal: 14,
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
