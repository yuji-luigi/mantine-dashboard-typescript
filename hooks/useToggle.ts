import { useState } from 'react';

export const useToggle = (initialState: boolean) => {
  const [newState, setNewState] = useState(initialState);
  const toggle = () => setNewState(!newState);
  const setFalse = () => setNewState(false);
  const setTrue = () => setNewState(true);
  return { toggle, setFalse, setTrue, newState };
};
