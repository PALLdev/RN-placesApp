import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";

import AllPlaces from "./screens/AllPlaces";
import AddPlaces from "./screens/AddPlaces";
import PlaceDetails from "./screens/PlaceDetails";
import Map from "./screens/Map";

import IconButton from "./components/ui/IconButton";
import { Colors } from "./constants/colors";
import { RootStackParamList } from "./util/types";

const Stack = createNativeStackNavigator<RootStackParamList>();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [init, setIsinit] = useState(false);
  useEffect(() => {
    const dothis = async () => {
      setIsinit(true);
      await SplashScreen.hideAsync();
    };
    dothis();
  }, []);

  const pressAddIconHandler = (
    navigation: NativeStackNavigationProp<RootStackParamList>
  ) => {
    navigation.navigate("AddPlace");
  };

  return (
    init && (
      <>
        <StatusBar style="dark" />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="AllPlaces"
            screenOptions={{
              headerStyle: {
                backgroundColor: Colors.primary500,
              },
              headerTintColor: Colors.gray700,
              contentStyle: {
                backgroundColor: Colors.gray700,
              },
            }}
          >
            <Stack.Screen
              name="AllPlaces"
              component={AllPlaces}
              options={({ navigation }) => ({
                title: "Lugares favoritos",
                headerRight: ({ tintColor }) => (
                  <IconButton
                    icon="add-circle-outline"
                    color={tintColor}
                    size={25}
                    onPress={pressAddIconHandler.bind(null, navigation)}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="AddPlace"
              component={AddPlaces}
              options={{
                title: "Agrega un lugar",
              }}
            />
            <Stack.Screen
              name="Map"
              component={Map}
              options={{ title: "Selecciona la ubicaci??n" }}
            />
            <Stack.Screen
              name="PlaceDetails"
              component={PlaceDetails}
              options={{
                title: "Cargando detalles del lugar...",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    )
  );
}
