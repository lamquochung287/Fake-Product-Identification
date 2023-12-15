import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './login/loginSlice'
import registerReducer from './register/register'
import userReducer from "./userSlice/userSlice"
import manufacturerSlice from './manufactuer/manufacturerSlice'

const initialState = {
    login: loginReducer,
    register: registerReducer,
    user: userReducer,
    manufacturer: manufacturerSlice
}

export const store = configureStore({
    reducer: {
        login: loginReducer,
        register: registerReducer,
        user: userReducer,
        manufacturer: manufacturerSlice
    },
})
