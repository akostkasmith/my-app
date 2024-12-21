import React from "react";
import { Category } from "../../data/types";

interface listItem {
  id: string;
  text: string;
  category: Category;
  completed: boolean;
}

const useStorageState = (key: string, initialValue: listItem[]) => {
  const [state, setState] = React.useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: listItem[]) => {
    try {
      const valueToStore =
        value instanceof Function ? value(state) : value;
      setState(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [state, setValue];
};

export default useStorageState;