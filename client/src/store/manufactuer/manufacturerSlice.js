import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    listProduct: [],
    isLoading: false,
    isFetching: true,
    msg: "",
    errorMsg: "",
}


export const loadProductAction = createAsyncThunk("/manufacturer/getAllProduct", async (thunkAPI) => {
    try {
        const resp = await axios.get("http://localhost:5000/manufacturer/getAllProduct")
        return resp.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const deleteProduct = createAsyncThunk("/manufacturer/deleteProduct", async (productID, thunkAPI) => {
    try {
        const resp = await axios.delete(`http://localhost:5000/manufacturer/deleteProduct/${productID}`)
        return resp.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const editProduct = createAsyncThunk("/manufacturer/editProduct", async (product, thunkAPI) => {
    try {
        console.log(product)
        const price = Number(product.productPrice)
        const resp = await axios.put(`http://localhost:5000/manufacturer/editProduct/${product.productID}`,
            { productName: product.productName, price: price, productPIN: product.productPIN, productImage: "http://imgs.vietnamnet.vn/Images/2016/12/22/08/20161222084359-xe-tay-ga-ban-chay-nhat-1.jpg" })
        return resp.data

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const addProduct = createAsyncThunk("/manufacturer/addProduct", async (product, thunkAPI) => {
    try {
        const resp = await axios.post(`http://localhost:5000/manufacturer/addProduct`,
            { productName: product.name, price: product.productPrice, productPIN: product.productPIN, productImage: "http://imgs.vietnamnet.vn/Images/2016/12/22/08/20161222084359-xe-tay-ga-ban-chay-nhat-1.jpg" })
        return resp.data

    } catch (error) {
        console.log(error)
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

const manufacturerSlice = createSlice({
    name: "manufacturer",
    initialState: initialState,
    reducers: {
    },
    extraReducers: {
        [loadProductAction.pending]: (state) => {
            state.isLoading = true;
            state.isFetching = true;
        },
        [loadProductAction.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.listProduct = payload.product
        },
        [loadProductAction.rejected]: (state, { payload }) => {
            state.isFetching = true;
            state.isLoading = false
            state.listProduct = []
        },
        [deleteProduct.pending]: (state) => {
            state.isLoading = true;
        },
        [deleteProduct.fulfilled]: (state, { payload }) => {
            state.isFetching = true;
            state.msg = payload.msg;
        },
        [deleteProduct.rejected]: (state, { payload }) => {
            state.errorMsg = payload.error
        },
        [addProduct.pending]: (state) => {
            state.isLoading = true;
        },
        [addProduct.fulfilled]: (state, { payload }) => {
            state.isFetching = true;
            state.msg = payload.msg;
        },
        [addProduct.rejected]: (state, { payload }) => {
            state.errorMsg = payload.error
        },
        [editProduct.pending]: (state) => {
            state.isLoading = true;
        },
        [editProduct.fulfilled]: (state, { payload }) => {
            state.isFetching = true;
            state.msg = payload.msg;
        },
        [editProduct.rejected]: (state, { payload }) => {
            state.errorMsg = payload.error
        },
    }
})


export default manufacturerSlice.reducer