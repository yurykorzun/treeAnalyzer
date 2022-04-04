import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const app_token = "eUWgOK5XHiG7gB3jUkxVXvZ2p";

const treeTypeCountQuery = `https://data.cityofnewyork.us/resource/uvpi-gqnh.json?$select=spc_common,count(*)&$group=spc_common&$order=count%20DESC&$limit=10`;
const treeHealthCountQuery = `https://data.cityofnewyork.us/resource/uvpi-gqnh.json?$select=health,count(*)&$group=health`;
const treeListQuery = `https://data.cityofnewyork.us/resource/uvpi-gqnh.json?$select=tree_id,spc_common,status,health,address,latitude,longitude&$order=spc_common`;

export type Tree = {
  id: string;
  name: string;
  status: string;
  health: string;
  address: string;
  latitude: string;
  longitude: string;
};

type TreeType = {
  name: string;
  count: number;
};

type TreeHealth = {
  name: string;
  count: number;
};

type TreesState = {
  treeTypes: TreeType[] | null;
  treesHealth: TreeHealth[] | null;
  treeList: Tree[] | null;
  treeListLoading: boolean;
};

type TreeTypeCountResponse = {
  spc_common: string;
  count: string;
};

type TreeTypeHealthResponse = {
  health: string;
  count: string;
};

type TreeResponse = {
  tree_id: string;
  spc_common: string;
  status: string;
  health: string;
  address: string;
  latitude: string;
  longitude: string;
};

const generateColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
  return `#${randomColor}`;
};

export const getTreeTypeCount = createAsyncThunk(
  "trees/getTreeTypeCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(treeTypeCountQuery, {
        params: { $$app_token: process.env.API_KEY },
      });

      return response.data as TreeTypeCountResponse[];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getTreeHealthCount = createAsyncThunk(
  "trees/getTreeHealthCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(treeHealthCountQuery, {
        params: { $$app_token: process.env.API_KEY },
      });
      return response.data as TreeTypeHealthResponse[];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getTreeList = createAsyncThunk(
  "trees/getTreeList",
  async ({nameSearch, addressSearch}: { nameSearch: string, addressSearch: string }, { rejectWithValue }) => {
    try {
      let whereQuery = "";
      if (nameSearch) {
        whereQuery += `lower(spc_common)%20like%20%27%25${nameSearch.toLowerCase()}%25%27`;
      }
      if (addressSearch) {
        if (whereQuery) {
          whereQuery += "%20AND%20";
        }
        whereQuery += `lower(address)%20like%20%27%25${addressSearch.toLowerCase()}%25%27`;
      }
      if (whereQuery) {
        whereQuery = `&$where=${whereQuery}`;
      }
      const response = await axios.get(`${treeListQuery}${whereQuery}`, {
        params: { $$app_token: process.env.API_KEY },
      });
      return response.data as TreeResponse[];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const treesSlice = createSlice({
  name: "trees",
  initialState: { treeListLoading: false } as TreesState,
  reducers: {
    setIsInitialized(
      state: any,
      action: PayloadAction<{ isInitialized: boolean }>
    ) {
      state.isInitialized = action.payload.isInitialized;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTreeTypeCount.rejected, (state, { payload }) => {
        console.log(payload);
      })
      .addCase(getTreeHealthCount.rejected, (state, { payload }) => {
        console.log(payload);
      })
      .addCase(getTreeList.rejected, (state, { payload }) => {
        console.log(payload);
        state.treeListLoading = false;
      })
      .addCase(getTreeList.pending, (state, { payload }) => {
        state.treeListLoading = true;
      })
      .addCase(getTreeTypeCount.fulfilled, (state, { payload }) => {
        state.treeTypes = payload.map(
          (response) =>
            ({
              name: response.spc_common || "Unknown",
              count: parseInt(response.count, 10),
              color: generateColor(),
              legendFontColor: "#7F7F7F",
              legendFontSize: 10,
            } as TreeType)
        );
      })
      .addCase(getTreeHealthCount.fulfilled, (state, { payload }) => {
        state.treesHealth = payload.map(
          (response) =>
            ({
              name: response.health || "Unknown",
              count: parseInt(response.count, 10),
              color: generateColor(),
              legendFontColor: "#7F7F7F",
              legendFontSize: 12,
            } as TreeHealth)
        );
      })
      .addCase(getTreeList.fulfilled, (state, { payload }) => {
        state.treeList = payload.map(
          (response) =>
            ({
              id: response.tree_id,
              name: response.spc_common,
              status: response.status,
              health: response.health,
              address: response.address,
              latitude: response.latitude,
              longitude: response.longitude,
            } as Tree)
        );
        state.treeListLoading = false;
      });
  },
});

export default treesSlice.reducer;

function randomColor() {
  throw new Error("Function not implemented.");
}
