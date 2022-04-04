import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { RootState } from "../redux/store";
import { getTreeList, Tree } from "../redux/slices/trees";
import { RootStackParamList } from "../navigation/RootStackPrams";
import { useNavigation } from "@react-navigation/native";
import { useDebounce } from "use-debounce";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

type rootScreenProp = BottomTabNavigationProp<RootStackParamList, "Root">;

export default function TreesList() {
  const navigation = useNavigation<rootScreenProp>();
  const treeList = useSelector((state: RootState) => state.trees.treeList);
  const treeListLoading = useSelector(
    (state: RootState) => state.trees.treeListLoading
  );

  const [showFilters, setShowFilters] = useState(false);
  const [nameSearch, setNameSearch] = useState("");
  const [nameSearchDebounce] = useDebounce(nameSearch, 500);
  const [addressSearch, setAddressSearch] = useState("");
  const [addressSearchDebounce] = useDebounce(addressSearch, 500);
  const dispatch = useDispatch();

  const renderItem = ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }): JSX.Element => {
    const isOdd = index % 2 === 1;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Details", item)}
        style={[
          styles.listRow,
          { backgroundColor: isOdd ? "#fff" : "#f5f5f5" },
        ]}
      >
        <View style={[styles.listRowDetails, ,]}>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text>{`Status: ${item.status}`}</Text>
          <Text>{`Health: ${item.health}`}</Text>
        </View>
        <View style={styles.rowAddress}>
          <Text>{item.address}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: Tree) => {
    return item.id;
  };

  useEffect(() => {
    dispatch(
      getTreeList({
        nameSearch: nameSearchDebounce,
        addressSearch: addressSearchDebounce,
      })
    );
  }, [nameSearchDebounce, addressSearchDebounce]);

  return (
    <View style={styles.container}>
      <View style={styles.filter}>
        <View style={styles.filterButton}>
          <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
            <Text>{showFilters ? "Hide filters" : "Show filters"}</Text>
          </TouchableOpacity>
        </View>
        {showFilters && (
          <View style={styles.filters}>
            <View style={styles.treeNameFilter}>
              <TextInput
                placeholder="Filter by tree name"
                onChangeText={(value) => setNameSearch(value)}
                style={styles.treeNameFilterText}
              />
            </View>
            <View style={styles.treeAddress}>
              <TextInput
                placeholder="Filter by address"
                onChangeText={(value) => setAddressSearch(value)}
                style={styles.treeAddressText}
              />
            </View>
          </View>
        )}
      </View>
      <FlatList
        data={treeList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
      />
      {treeListLoading && (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator size="large" color={"black"} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingIndicator: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  listSeparator: {
    height: 1,
    backgroundColor: "#D9D9D9",
  },
  treeAddressText: {
    backgroundColor: "#fff",
    flex: 0.5,
    padding: 10,
    borderRadius: 100,
  },
  treeAddress: {
    paddingBottom: 10,
    flexDirection: "row",
  },
  treeNameFilterText: {
    backgroundColor: "#fff",
    flex: 0.5,
    padding: 10,
    borderRadius: 100,
  },
  treeNameFilter: {
    paddingBottom: 5,
    flexDirection: "row",
  },
  filters: {
    height: 90,
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterButton: {
    padding: 5,
    alignItems: "center",
  },
  filter: {
    backgroundColor: "#76c893",
  },
  container: {
    flex: 1,
  },
  rowAddress: {
    padding: 5,
  },
  nameText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  listRowDetails: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listRow: {
    width: "100%",
    justifyContent: "space-between",
  },
});
