import appSlice from './redux/reducers/appSlice';
import slideBaReducer from './redux/reducers/slideBaReducer';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit'

const Store = configureStore({
    reducer: {
        app :appSlice ,
        slide : slideBaReducer ,

    } ,
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware({
    //   serializableCheck: false,
    // })
})
export default Store;