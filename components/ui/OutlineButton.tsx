import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PropsWithChildren } from "react";
import { Colors } from "../../constants/colors";

interface OutlineButtonProps {
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  size: number;
}

const OutlineButton = ({
  onPress,
  icon,
  size,
  children,
}: PropsWithChildren<OutlineButtonProps>) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Ionicons
        name={icon}
        size={size}
        color={Colors.primary500}
        style={styles.icon}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default OutlineButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary500,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: Colors.primary500,
  },
});
