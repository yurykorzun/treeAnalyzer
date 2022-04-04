import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, StyleSheet } from "react-native";
import { getHeaderTitle } from "@react-navigation/elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

import { removeUser } from "../redux/slices/app";
import TreesChart from "./TreesChart";
import TreeHealthChart from "./TreeHealthChart";
import TreesList from "./TreesList";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const dispatch = useDispatch();

  return (
    <BottomTab.Navigator
      initialRouteName="TreesChart"
      sceneContainerStyle={{
        backgroundColor: "#fff",
      }}
      screenOptions={{
        tabBarActiveBackgroundColor: "#34a0a4",
        tabBarInactiveBackgroundColor: "#52b69a",
        tabBarStyle: {
          height: 55,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          color: "#fff",
          margin: 0,
        },
        header: ({ navigation, route, options }) => {
          const title = getHeaderTitle(options, route.name);

          return (
            <View style={[options.headerStyle, styles.headerContainer]}>
              <View style={styles.headerSection}></View>
              <View>
                <Text style={styles.titleText}>{title}</Text>
              </View>
              <View style={styles.headerSection}>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(removeUser());
                    navigation.navigate("SignUp");
                  }}
                >
                  <Text style={styles.logoutText}>
                    {"Logout"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        },
      }}
    >
      <BottomTab.Screen
        name="TreesChart"
        component={TreesChart}
        options={{
          title: "Tree types chart",
          tabBarLabel: "Tree types",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-pie-chart" size={25} color="#fff" />
          ),
          headerStyle: {
            backgroundColor: "#34a0a4",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <BottomTab.Screen
        name="TreeHealthChart"
        component={TreeHealthChart}
        options={{
          title: "Tree health chart",
          headerStyle: {
            backgroundColor: "#34a0a4",
          },
          tabBarLabel: "Tree health",
          tabBarIcon: () => (
            <Ionicons name="md-pie-chart" size={25} color="#fff" />
          ),
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <BottomTab.Screen
        name="TreeList"
        component={TreesList}
        options={{
          title: "Tree list",
          headerStyle: {
            backgroundColor: "#34a0a4",
          },
          tabBarLabel: "List",
          tabBarIcon: () => (
            <Ionicons name="md-list" size={25} color="#fff" />
          ),
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  logoutText: {
    fontSize: 15,
    color: "#fff",
  },
  titleText: {
    fontSize: 20,
    color: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    height: 55,
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingBottom: 10,
  },
  headerSection: { width: 50 },
});
