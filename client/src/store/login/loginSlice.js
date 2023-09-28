import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    isError: false,
    messageError: "",
    user: null,
    isLogin: false,
    token: null,
}

export const loginAction = createAsyncThunk("/auth/login", async (input, thunkAPI) => {
    try {
        const resp = await axios.post("http://localhost:5000/auth/login", { username: input.username, password: input.password })
        return resp.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: initialState,
    reducers: {
        login: (state) => {

        }
    },
    extraReducers: {
        [loginAction.pending]: (state) => {
            state.isLoading = true;
            state.isError = false;
        },
        [loginAction.fulfilled]: (state, { payload }) => {
            state.isError = false
            state.isLogin = true
            const user = payload.user;
            state.user = user
            state.isLoading = false
            console.log(payload)
        },
        [loginAction.rejected]: (state, { payload }) => {
            state.isLoading = false
            state.isError = true;
            state.messageError = payload.msg
        }
    }
})

export default loginSlice.reducer;