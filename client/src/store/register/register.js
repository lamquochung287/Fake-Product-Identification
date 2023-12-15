import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    isError: false,
    messageError: "",
    inputSend: null,
    isSuccess: false,
    messageSuccess: "",
}

export const registerAction = createAsyncThunk("/auth/register", async (input, thunkAPI) => {
    try {
        const resp = await axios.post("http://localhost:5000/auth/register", {
            username: input.username,
            password: input.password,
            passwordConfirm: input.passwordConfirm,
            email: input.email,
            role: input.role
        })
        console.log(resp.data)
        return resp.data
    } catch (error) {
        console.log(error.response.data)
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

const registerSlice = createSlice({
    name: "registerSlice",
    initialState: initialState,
    reducers: {


    },
    extraReducers: {
        [registerAction.pending]: (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        },
        [registerAction.fulfilled]: (state, { payload }) => {
            state.isSuccess = true;
            state.messageSuccess = payload.msg
        },
        [registerAction.rejected]: (state, { payload }) => {
            state.isLoading = false
            state.isError = true;
            state.messageError = payload.msg
        }
    }
})


export default registerSlice.reducer