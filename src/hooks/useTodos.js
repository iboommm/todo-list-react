import { useState, useContext, useEffect, createContext } from 'react';
import { apiGet } from '../api/connect';

const todosContext = createContext();

export function useProvideTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchList() {
    setLoading(true);
    const res = await apiGet('todos');
    let { data } = res;
    data = data.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    data = mergeTodoDone(data);
    setTodos(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchList();
  }, []); // eslint-disable-line

  return { todos, loading, setLoading, setTodos, fetchList };
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

function mergeTodoDone(data) {
  const itemDone = localStorage.getItem('itemDone') || '[]';
  let transformItems = JSON.parse(itemDone);
  return data.map((x) => {
    x.isDone = transformItems.includes(x._id) ? true : false;
    return x;
  });
}
