import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    resultVerifyProduct: null,
    messageError: "",
    isFetchHistory: true,
    listHistory: [],
}

const readerImage = async (input) => {
    try {
        const response = await fetch(input);
        const blob = await response.blob();

        const arrayBuffer = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsArrayBuffer(blob);
        });

        // Convert the ArrayBuffer to a Uint8Array
        const uint8Array = new Uint8Array(arrayBuffer);

        console.log("Image file ", uint8Array);
        return uint8Array;
    } catch (error) {
        console.log(error);
        return;
    }
}

export const getAllHistory = createAsyncThunk("/user/getAllHistory", async (thunkAPI) => {
    try {
        const resp = await axios.get('http://localhost:5000/user/getAllHistory')
        return resp.data
    } catch (error) {
        console.log(error.response.data)
        return thunkAPI.rejectWithValue(error.response.data)

    }
})

export const verifyProduct = createAsyncThunk("/user/verifyProduct", async (input, thunkAPI) => {
    try {
        const image = await readerImage(input)
        const formData = new FormData();
        // formData.append('file', {
        //     uri: image,
        //     type: 'image/jpeg',  // Adjust the MIME type based on your requirements
        //     name: 'image.jpg',
        // });
        const blob = new Blob([image], { type: 'image/jpeg' }); // Adjust the MIME type based on your image type
        formData.append("file", blob, "image.jpg");
        const resp = await axios.post('http://localhost:5000/user/verifyProduct', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return resp.data
    } catch (error) {
        console.log(error.response.data)
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

const userSlice = createSlice({
    name: "userSLice",
    initialState: initialState,
    reducers: {
        resetStateUser: (state) => {
            state.isLoading = false,
                state.isError = false,
                state.isSuccess = false,
                state.resultVerifyProduct = null,
                state.messageError = "",
                state.isFetchHistory = true,
                state.listHistory = []

        }
    },
    extraReducers: {
        [verifyProduct.pending]: (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        },
        [verifyProduct.fulfilled]: (state, { payload }) => {
            state.isFetchHistory = true;
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.resultVerifyProduct = payload.resultVerifyProduct
        },
        [verifyProduct.rejected]: (state, { payload }) => {
            state.isLoading = false
            state.isError = true;
            state.isSuccess = false
            // state.messageError = payload.msg
        },
        [getAllHistory.pending]: (state) => {
            state.isFetchHistory = true
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        },
        [getAllHistory.fulfilled]: (state, { payload }) => {
            state.isFetchHistory = false
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.listHistory = payload.histories
        },
        [getAllHistory.rejected]: (state, { payload }) => {
            state.isFetchHistory = false
            state.isLoading = false
            state.isError = true;
            state.isSuccess = false
            state.listHistory = []
            // state.messageError = payload.msg
        },
    }
})
export const { resetStateUser } = userSlice.actions
export default userSlice.reducer;