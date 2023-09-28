import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './login/loginSlice'
import registerReducer from './register/register'
export const store = configureStore({
    reducer: {
        login: loginReducer,
        register: registerReducer
    }
})