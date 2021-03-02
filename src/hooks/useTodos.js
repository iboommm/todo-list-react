import { useState, useContext, useEffect, createContext } from 'react';
import { apiGet } from '../api/connect';
import { useHistory } from 'react-router-dom';

const todosContext = createContext();

export function useProvideTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  let history = useHistory();

  async function fetchList(isDone) {
    setLoading(true);
    const res = apiGet('todos')
      .then((res) => {
        let { data } = res;
        data = data.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        data = mergeTodoDone(data);
        if (isDone) {
          data = data.filter((x) => x.isDone);
        }

        setTodos(data);
        setLoading(false);
        setIsDone(isDone);
      })
      .catch((error) => {
        if (error.toString().includes('401')) {
          localStorage.clear();
          history.push('/login');
        }
      });
  }

  useEffect(() => {
    fetchList();
  }, []); // eslint-disable-line

  return { todos, loading, isDone, setLoading, setTodos, setIsDone, fetchList };
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
