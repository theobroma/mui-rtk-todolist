import React, { useState, useEffect } from 'react';
import { App } from './App';

export const AppContainer: React.FC = () => {
  const [hasError, setErrors] = useState(false);
  const [planets, setPlanets] = useState({});

  async function fetchData() {
    const res = await fetch('/api/todos');
    res
      .json()
      .then((response: any) => setPlanets(response))
      .catch((err) => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return <App />;
};
