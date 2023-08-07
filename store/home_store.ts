import { createStore } from '@reduxjs/toolkit';
import homeReducer from './home/home_reducer';
const store = createStore(homeReducer);
export default store;
