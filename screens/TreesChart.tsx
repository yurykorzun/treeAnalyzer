import React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function TreesChart() {
  const isInitialized = useSelector<RootState, boolean>(
    (state) => state.app.isInitialized
  );

  const treeTypes = useSelector((state: RootState) => state.trees.treeTypes);
  const graphStyle = {
    marginVertical: 15,
    borderRadius: 10,
    backgroundColor: "#efefef",
  };

  return (
    <View style={styles.chartContainer}>
      {isInitialized ? (
        <PieChart
          data={treeTypes || []}
          width={Dimensions.get("window").width}
          height={Dimensions.get("window").width * 0.6}
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#efefef",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="count"
          style={graphStyle}
          paddingLeft="0"
          backgroundColor="white"
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
