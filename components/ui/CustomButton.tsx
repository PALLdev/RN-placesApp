import { PropsWithChildren } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";

type ButtonProps = {
  onPress: () => void;
};

const CustomButton = ({
  onPress,
  children,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    borderRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: Colors.gray700,
    fontWeight: "500",
  },
});
