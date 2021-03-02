import React, { useState, useContext, createContext } from 'react';
import { apiPost, apiPut } from '../api/connect';

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

  function setForm(item) {
    setTitle(item.title);
    setDescription(item.description);
    setId(item._id);
  }

  return {
    title,
    description,
    id,
    setTitle,
    setDescription,
    setId,
    clear,
    setForm,
  };
};

export const useTodo = () => {
  return useContext(todoContext);
};

export async function AddTodo(url, data) {
  const res = await apiPost(url, data);
  return res;
}

export async function EditTodo(url, data) {
  const res = await apiPut(`${url}/${data.id}`, {
    title: data.title,
    description: data.description,
  });
  return res;
}
