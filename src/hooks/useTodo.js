import React, { useState, useContext, createContext } from 'react';
import { apiPost, apiPut, apiDelete } from '../api/connect';

const todoContext = createContext();

export const ProvideForm = ({ children }) => {
  const auth = useProvideTodo();
  return <todoContext.Provider value={auth}>{children}</todoContext.Provider>;
};

export const useProvideTodo = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function clear() {
    setTitle('');
    setDescription('');
    setId('');
    setSubmitted(false);
  }

  function setForm(item) {
    setTitle(item.title);
    setDescription(item.description);
    setId(item._id);
    setSubmitted(false);
  }

  return {
    title,
    description,
    id,
    submitted,
    setTitle,
    setDescription,
    setId,
    clear,
    setForm,
    setSubmitted,
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

export async function RemoveTodo(url, data) {
  const res = await apiDelete(`${url}/${data.id}`);
  return res;
}
