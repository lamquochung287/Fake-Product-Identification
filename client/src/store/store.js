import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './login/loginSlice'
import registerReducer from './register/register'
import userReducer from "./userSlice/userSlice"
export const store = configureStore({
    reducer: {
        login: loginReducer,
        register: registerReducer,
        user: userReducer
    }
})