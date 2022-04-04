import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Tree } from "../redux/slices/trees";
import { BottomTabParams } from "../navigation/BottomTabParams";

type bottomTabNavigationProp = BottomTabNavigationProp<
  BottomTabParams,
  "TreeList"
>;

const Details = (props: { route: { params: Tree } }) => {
  const navigation = useNavigation<bottomTabNavigationProp>();

  const tree = props.route.params as Tree;

  return (
    <SafeAreaView style={styles.detailsContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("TreeList")}
        style={styles.backButton}
      >
        <Text style={styles.goBackText}>{"Go Back"}</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Text>{"Image placeholder"}</Text>
      </View>
      <View style={styles.details}>
        <View style={styles.treeName}>
          <Text style={styles.treeNameText}>{tree?.name}</Text>
        </View>
        <View style={styles.address}>
          <Text style={styles.addressLabelText}>{"Address:"}</Text>
          <Text style={styles.addressText}>{tree?.address}</Text>
        </View>
        <View style={styles.status}>
          <Text style={styles.statusLabel}>{"Status:"}</Text>
          <Text style={styles.statusText}>{tree?.status}</Text>
        </View>
        <View style={styles.health}>
          <Text style={styles.healthLabel}>{"Health:"}</Text>
          <Text style={styles.healthText}>{tree?.health}</Text>
        </View>
      </View>

      <View
        style={styles.map}
      >
        <Text>{"Map location placeholder"}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 200,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
  },
  healthText: {
    fontSize: 16,
  },
  healthLabel: {
    fontSize: 16,
    paddingRight: 5,
  },
  health: {
    flexDirection: "row",
  },
  statusText: {
    fontSize: 16,
  },
  statusLabel: {
    fontSize: 16,
    paddingRight: 5,
  },
  status: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  addressText: {
    fontSize: 16,
  },
  addressLabelText: {
    fontSize: 16,
    paddingRight: 5,
  },
  address: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  treeNameText: {
    fontSize: 20,
  },
  treeName: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  details: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    width: "100%",
    height: 150,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
  },
  goBackText: {
    fontSize: 18,
  },
  backButton: {
    width: "100%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#34a0a4",
  },
  detailsContainer: {
    flex: 1,
  },
});
