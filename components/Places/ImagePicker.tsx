import { Alert, Image, StyleSheet, Text, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constants/colors";
import OutlineButton from "../ui/OutlineButton";

type ImagePickerProps = {
  onTakeImage: (imageUrl: string) => void;
};

const ImagePicker = ({ onTakeImage }: ImagePickerProps) => {
  const [pickedImage, setPickedImage] = useState("");
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();

  const verifyPermissions = async () => {
    if (cameraPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInfo?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Permisos insuficientes",
        "No haz otorgado los permisos de camara necesarios para usar esta funcionalidad"
      );
      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) return;

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (image.cancelled) return;
    setPickedImage(image.uri);
    onTakeImage(image.uri);
  };

  let imagePreview = (
    <Text style={styles.fallbackText}>
      Toma una imagen para mostrar preview
    </Text>
  );

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePrev}>{imagePreview}</View>
      <OutlineButton onPress={takeImageHandler} icon="camera" size={18}>
        Tomar foto
      </OutlineButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePrev: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: Colors.primary100,
    marginVertical: 8,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
  fallbackText: {
    color: Colors.primary700,
  },
});
