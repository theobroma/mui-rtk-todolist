import { useState, ChangeEvent } from 'react';

export const useInputValue = (initialValue = '') => {
  const [inputValue, setInputValue] = useState<string>(initialValue);

  return {
    inputValue,
    changeInput: (event: ChangeEvent<HTMLInputElement>) =>
      setInputValue(event.target.value),
    clearInput: () => setInputValue(''),
    keyInput: (
      event: KeyboardEvent,
      callback: (inputValue: string) => void,
    ) => {
      if (event.which === 13 || event.keyCode === 13) {
        callback(inputValue);
        return true;
      }

      return false;
    },
  };
};
