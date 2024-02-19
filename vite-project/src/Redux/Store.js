// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Feature/cartSlice';
import userReducer from './Feature/userSlice';

export default configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer,
    },
});
