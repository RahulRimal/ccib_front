import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mainUrl } from "../constants";
import axios, { AxiosError } from 'axios';

class MultiMessageError extends Error {
    messages = [];
    constructor(messages) {
        super(messages);
        this.messages = messages;
    }
}

export const loginUser = createAsyncThunk(
    "auth/login",
    async (loginInfo) => {
        const { username, password } = loginInfo;
        const loginUrl = `${mainUrl}login/`;
        try {
            const response = await axios.post(loginUrl, {
                username: username,
                password: password,
            });
            if (response.status === 200) {
                return response.data
            }
            if (response.status === 400) {
                console.log("Invalid credentials");
            }
            return response.data;
        } catch (error) {
            console.log(error);
            let data = null;
            if (error.response.data["details"] == undefined) {
                data = error.response.data["detail"]
            }
            data = error.response.data["details"]
            throw new Error(JSON.stringify(data));
        }
    }
);

const initialState = {
    loading: false,
    isLoggedIn: true,
    user: {
        idx: "djS34jkfdjfkd",
        first_name: "Rahul",
        last_name: "Rimal",
        username: "rahul01",
        email: "mail@rahul.com",
        phone: "9876767897"
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            state = initialState;
            return state;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.isLoggedIn = true
            }).addCase(loginUser.rejected, (state, action) => {
                state.loading = false
            })
    }
})

export const { logOut } = authSlice.actions

export default authSlice.reducer;