import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { Colors } from "../../constants/colors";
import CustomButton from "../ui/CustomButton";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

const PlaceForm = () => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [pickedLocation, setPickedLocation] = useState<{
    address: string;
    lat: number;
    lng: number;
  }>();

  const changeTitleHandler = (enteredText: string) => {
    setEnteredTitle(enteredText);
  };

  const takeImageHandler = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
  };

  const pickLocationHandler = useCallback(
    (location: { address: string; lat: number; lng: number }) => {
      setPickedLocation(location);
    },
    []
  );

  const submitPlaceHandler = () => {
    console.log({ enteredTitle, selectedImageUrl, pickedLocation });
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Nombre del lugar</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <View style={styles.action}>
        <CustomButton onPress={submitPlaceHandler}>Guardar</CustomButton>
      </View>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    color: Colors.primary200,
    marginBottom: 2,
  },
  input: {
    marginVertical: 8,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 6,
    fontSize: 16,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  action: {
    paddingBottom: 24,
    marginBottom: 12,
    marginTop: 8,
  },
});
