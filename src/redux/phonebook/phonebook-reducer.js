import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import * as a from './phonebook-actions';

const contactsFromLs = localStorage.getItem('contacts');
const initialItems = contactsFromLs ? JSON.parse(contactsFromLs) : [];

const items = createReducer(initialItems, {
  [a.addContact]: (state, { payload }) => {
    const existedContact = state.find(contact => contact.name === payload.name);
    if (!existedContact) {
      return [...state, payload];
    }
    return state;
  },
  [a.deleteContact]: (state, { payload }) =>
    state.filter(contact => contact.id !== payload),
});

const filter = createReducer('', {
  [a.setFilter]: (_, { payload }) => payload,
});

export default combineReducers({
  items,
  filter,
});
