import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { resetStateUser } from "../userSlice/userSlice";

const initialState = {
    isLoading: false,
    isError: false,
    messageError: "",
    userRole: null,
    isLogin: false,
    token: null,
}

export const loginAction = createAsyncThunk("/auth/login", async (input, thunkAPI) => {
    try {
        const resp = await axios.post("http://localhost:5000/auth/login", { username: input.username, password: input.password })
        const token = resp.data.token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return resp.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const logoutAction = createAsyncThunk("/auth/logout", async (thunkAPI) => {
    try {
        const resp = await axios.post("http://localhost:5000/auth/logout")
        delete axios.defaults.headers.common['Authorization'];
        return resp.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})


const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: initialState,
    reducers: {
        logoutFunction: (state, action) => {
            action.dispatch(resetStateUser());
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
            const userRole = payload.userRole;
            state.userRole = userRole.trim()
            state.isLoading = false
        },
        [loginAction.rejected]: (state, { payload }) => {
            state.isLoading = false
            state.isError = true;
            state.messageError = payload.msg
        },
        [logoutAction.pending]: (state) => {
            state.isLoading = true;
            state.isError = false;
        },
        [logoutAction.fulfilled]: (state, { payload }) => {
            state.isError = false
            state.isLogin = false
            state.userRole = null
            state.token = null
            state.isLoading = false
        },
        [logoutAction.rejected]: (state, { payload }) => {
            state.isLoading = false
            state.isError = true;
            state.messageError = payload.msg
        }
    }
})


export const { logoutFunction } = loginSlice.actions
export default loginSlice.reducer;