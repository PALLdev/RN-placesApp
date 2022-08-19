import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import AllPlaces from "./screens/AllPlaces";
import AddPlaces from "./screens/AddPlaces";
import IconButton from "./components/ui/IconButton";
import { Colors } from "./constants/colors";
import Map from "./screens/Map";
import { RootStackParamList } from "./util/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const pressAddIconHandler = (
    navigation: NativeStackNavigationProp<RootStackParamList>
  ) => {
    navigation.navigate("AddPlace");
  };

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
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
            options={{ title: "Selecciona la ubicación" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
