import { configureStore } from '@reduxjs/toolkit';
import phonebookReducer from './phonebook/phonebook-reducer';

const store = configureStore({
  reducer: { phonebook: phonebookReducer },
});

export default store;
