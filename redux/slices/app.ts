import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

export interface UserState {
  firstName: string;
  lastName: string;
  email: string;
}
type AppState = {
  user: UserState | null;
  isInitialized: boolean;
};

const persistUserValue = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

const removeUserValue = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};

const getUserValue = async (key: string): Promise<string | null> => {
  return await SecureStore.getItemAsync(key);
};

export const setUser = createAsyncThunk("user/setUser", async (user: UserState) => {
  await persistUserValue("firstName", user.firstName);
  await persistUserValue("lastName", user.lastName);
  await persistUserValue("email", user.email);
});

export const removeUser = createAsyncThunk(
  "user/removeUser",
  async () => {
    await removeUserValue("firstName");
    await removeUserValue("lastName");
    await removeUserValue("email");
  }
);

export const loadUser = createAsyncThunk("user/loadUser", async (_, thunkAPI) => {
  let firstName = await getUserValue("firstName");
  let lastName = await getUserValue("lastName");
  let email = await getUserValue("email");

  if (firstName && lastName && email) {
    return {user: {firstName, lastName, email} as UserState};
  }

  return {user: null};
});

export const appSlice = createSlice({
  name: "app",
  initialState: { user: null, isInitialized: false } as AppState,
  reducers: {
    setIsInitialized(state: any, action:PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setUser.fulfilled, (state, action) => {})
      .addCase(removeUser.fulfilled, (state, action) => {})
      .addCase(loadUser.fulfilled, (state, action) => {
        if (action.payload?.user) {
          const { firstName, lastName, email } = action.payload?.user;

          state.user = { firstName, lastName, email } as UserState;
        }
        else {
          state.user = null;
        }
        state.isInitialized = true;
      });
  },
});

export const { setIsInitialized } = appSlice.actions

export default appSlice.reducer;
