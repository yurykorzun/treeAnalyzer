import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { loadUser } from "../redux/slices/app";
import { getTreeHealthCount, getTreeList, getTreeTypeCount } from "../redux/slices/trees";

export default function LoadingScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    await dispatch(getTreeTypeCount());
    await dispatch(getTreeHealthCount());
    await dispatch(getTreeList({nameSearch: "", addressSearch: ""}));
    
    await dispatch(loadUser());
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});