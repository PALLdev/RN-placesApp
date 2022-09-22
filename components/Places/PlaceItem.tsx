import {
  ListRenderItemInfo,
  Pressable,
  View,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import { Colors } from "../../constants/colors";
import { Place } from "../../models/place";

interface PlaceItemProps {
  place: ListRenderItemInfo<Place>;
  onSelect: (id: string) => void;
}

const PlaceItem = ({ place, onSelect }: PlaceItemProps) => {
  return (
    <Pressable
      onPress={onSelect.bind(this, place.item.id as string)}
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
    >
      <Image source={{ uri: place.item.imageUri }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.item.title}</Text>
        <Text style={styles.address}>{place.item.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    marginVertical: 10,
    backgroundColor: Colors.primary400,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    height: 110,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.gray700,
  },
  address: {
    fontSize: 13,
    color: Colors.gray700,
    fontStyle: "italic",
  },
});
