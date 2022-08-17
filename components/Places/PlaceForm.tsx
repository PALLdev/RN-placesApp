import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";

const PlaceForm = () => {
  const [enteredTitle, setEnteredTitle] = useState("");

  const changeTitleHandler = (enteredText: string) => {
    setEnteredTitle(enteredText);
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
      <ImagePicker />
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
    borderRadius: 7,
  },
});
