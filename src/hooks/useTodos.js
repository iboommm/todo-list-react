import { useState, useContext, useEffect, createContext } from 'react';
import { apiGet } from '../api/connect';

const todosContext = createContext();

export function useProvideTodos() {
  const [todos, setTodos] = useState([]);

  async function fetchList() {
    const res = await apiGet('todos');
    let { data } = res;
    data = data.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setTodos(data);
  }

  useEffect(() => {
    fetchList();
  }, []); // eslint-disable-line

  return { todos, setTodos, fetchList };
}

export const ProvideList = ({ children }) => {
  const value = useProvideTodos();
  return (
    <todosContext.Provider value={value}>{children}</todosContext.Provider>
  );
};

export const useTodos = () => {
  return useContext(todosContext);
};
