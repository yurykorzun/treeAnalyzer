import React from "react";
import { StyleSheet } from "react-native";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import NavigationScreen from "./screens/NavigationScreen";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <Provider store={store}>
       <SafeAreaProvider>
        <NavigationScreen />
       </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
