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
  const [isDone, setIsDone] = useState(false);
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
    setIsDone(item.isDone);
    setSubmitted(false);
  }

  return {
    title,
    description,
    id,
    submitted,
    isDone,
    setTitle,
    setDescription,
    setId,
    clear,
    setForm,
    setSubmitted,
    setIsDone,
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
  setDoneItem(data);
  return res;
}

export async function RemoveTodo(url, data) {
  const res = await apiDelete(`${url}/${data.id}`);
  return res;
}

function setDoneItem(data) {
  const { id, isDone } = data;
  const itemDone = localStorage.getItem('itemDone') || '[]';
  let transformItems = JSON.parse(itemDone).filter((x) => x !== id);
  if (isDone) {
    transformItems.push(data.id);
  }
  localStorage.setItem('itemDone', JSON.stringify(transformItems));
}
