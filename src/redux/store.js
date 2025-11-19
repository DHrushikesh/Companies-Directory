import {configureStore } from '@reduxjs/toolkit'
import ThemeReducer from './Slices/themeslice.js'

const store = configureStore(
{
    reducer : {
        theme : ThemeReducer
    },
}
)

export default store;
