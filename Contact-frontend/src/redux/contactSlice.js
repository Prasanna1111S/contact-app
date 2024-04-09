import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  contacts: [],
};

const API_URL = 'http://localhost:8080'; 

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setContacts(state, action) {
      state.contacts = action.payload;
    },
    addContact(state, action) {
      state.contacts.push(action.payload);
    },
    updateContact(state, action) {
      const { id, updatedContact } = action.payload;
      const index = state.contacts.findIndex(contact => contact._id === id);
      if (index !== -1) {
        state.contacts[index] = updatedContact;
      }
    },
    deleteContact(state, action) {
      state.contacts = state.contacts.filter(contact => contact._id !== action.payload);
    },
  },
});

export const { setContacts, addContact, updateContact, deleteContact } = contactSlice.actions;
export default contactSlice.reducer;


export const fetchContacts = () => async dispatch => {
  try {
    const response = await axios.get(`${API_URL}/`);
    dispatch(setContacts(response.data.data));
  } catch (error) {
    console.error('Error:', error);
  }
};


export const addNewContact = (newContact) => async dispatch => {
  try {
    const response = await axios.post(`${API_URL}/create`, newContact);
    dispatch(addContact(response.data));
  } catch (error) {
    console.error('Error:', error);
  }
};


export const updateExistingContact = (id, updatedContact) => async dispatch => {
  try {
    await axios.put(`${API_URL}/update/${id}`, updatedContact);
    dispatch(updateContact({ id, updatedContact }));
  } catch (error) {
    console.error('Error:', error);
  }
};


export const deleteExistingContact = (id) => async dispatch => {
  try {
    await axios.delete(`${API_URL}/delete/${id}`);
    dispatch(deleteContact(id));
  } catch (error) {
    console.error('Error:', error);
  }
};
