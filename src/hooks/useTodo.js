import React, { useState, useContext, createContext } from 'react';
import { apiPost } from '../api/connect';

const todoContext = createContext();

export const ProvideForm = ({ children }) => {
  const auth = useProvideTodo();
  return <todoContext.Provider value={auth}>{children}</todoContext.Provider>;
};

export const useProvideTodo = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  function clear() {
    setTitle('');
    setDescription('');
    setId('');
  }

  return { title, setTitle, description, setDescription, id, setId, clear };
};

export const useTodo = () => {
  return useContext(todoContext);
};

export async function AddTodo(url, data) {
  const res = await apiPost(url, data);
  return res;
}
