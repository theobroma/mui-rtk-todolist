import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { App } from './App';
import { getFirstRender } from '../@store/todos/slice';

export const AppContainer: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFirstRender());
  });

  return <App />;
};
