import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import SignUpScreen from "./SignUpScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import LoadingScreen from "./LoadingScreen";
import { RootStackParamList } from "../navigation/RootStackPrams";
import Details from "./Details";

const Stack = createStackNavigator<RootStackParamList>();

export default function NavigationScreen() {
  const isInitialized = useSelector<RootState, boolean>(
    (state) => state.app.isInitialized
  );
  const user = useSelector((state: RootState) => state.app.user);

  return (
    <NavigationContainer>
      {isInitialized ? (
        <Stack.Navigator
          initialRouteName={user ? "Root" : "SignUp"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Root" component={BottomTabNavigator} />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      ) : (
        <LoadingScreen />
      )}
    </NavigationContainer>
  );
}
