import {
  ListRenderItemInfo,
  Pressable,
  View,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import { Place } from "../../models/place";

interface PlaceItemProps {
  place: ListRenderItemInfo<Place>;
  onSelect: () => void;
}

const PlaceItem = ({ place, onSelect }: PlaceItemProps) => {
  return (
    <Pressable onPress={onSelect}>
      <Image source={{ uri: place.item.imageUri }} />
      <View>
        <Text>{place.item.title}</Text>
        <Text>{place.item.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({});
