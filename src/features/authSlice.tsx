import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { mainUrl } from "../constants";
import axios, { AxiosError } from "axios";
import { Cookies } from "react-cookie";
import apiService from "../api_service";
import { Finance } from "../models/cooperative";

type LoginUserPayload = {
  refresh: string;
  access: string;
};
// class MultiMessageError extends Error {
//   messages = [];
//   constructor(messages) {
//     super(messages);
//     this.messages = messages;
//   }
// }

export const loginUser = createAsyncThunk(
  "auth/login",
  async (loginInfo: { username: string; password: string }) => {
    const { username, password } = loginInfo;
    const loginUrl = `${mainUrl}/auth/create-token/`;
    try {
      const response = await apiService.post(loginUrl, {
        username: username,
        password: password,
      });
      if (response.status === 200) {
        return response.data as LoginUserPayload;
      }
      if (response.status === 400) {
        console.log("Invalid credentials");
      }
      return response.data as LoginUserPayload;
    } catch (error: any) {
      let data = null;
      if (error.response !== undefined && error.response.data !== undefined) {
        if (error.response.data["details"] == undefined) {
          data = error.response.data["detail"];
          data = [data]; // Converting to array because reaised error is being catched and treated as array in signIn page
        } else {
          data = error.response.data["details"];
        }
        throw new Error(JSON.stringify(data));
      }
    }
  }
);

type Staff = {
  idx: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  finance: Finance;
};

type InitialState = {
  loading: boolean;
  isLoggedIn: boolean;
  user: Staff;
};

const initialState: InitialState = {
  loading: false,
  isLoggedIn: false,
  user: {
    idx: "",
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone: "",
    finance: {
      idx: "",
      name: "",
      parent: "",
      email: "",
      description: "",
      location: {
        name: "",
      },
      phone_number: "",
      website_url: "",
    },
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      const userCookie = new Cookies();
      userCookie.remove("access", { path: "/" });
      userCookie.remove("refresh", { path: "/" });

      return {
        ...initialState,
      };
    },
    updateAuthentication: (state, action) => {
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
      };
    },
  },
  extraReducers(builder: ActionReducerMapBuilder<InitialState>) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { refresh, access } = action.payload as LoginUserPayload;
        const userCookie = new Cookies();
        userCookie.set("access", access, { path: "/" });
        userCookie.set("refresh", refresh, { path: "/" });
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { logOut, updateAuthentication } = authSlice.actions;

export default authSlice.reducer;
