import React, { useEffect } from "react";
import classes from "./Box.module.scss";
import FilterList from "../FilterList/FilterList";

import  { Category } from "../../data/types"; 

interface BoxProps {
  children: React.ReactNode;
}   

interface listItem {
  id: number;
  text: string;
  category: Category;
  completed: boolean;
}

const Box = ({
  children
}: BoxProps) => {

  const [text, setText] = React.useState("");
  const [items, setItems] = React.useState<listItem[]>([]);
  const [focused, setFocused] = React.useState(false);

  useEffect(() => {
    const itemsJSON = window.localStorage.getItem('list');
    const items = itemsJSON ? JSON.parse(itemsJSON) : [];

    if (items) {
      setItems(items.reverse());
    }
  }, []);

  const saveItems = (itemToSave: listItem) => {
    if (itemToSave.text.length === 0) return;

    if (items) {
      const newList = [...items, itemToSave];
      setItems(newList);
      window.localStorage.setItem('list', JSON.stringify(newList));
      setText('');
    }
  }

  const handleReturn = () => {
    saveItems({
      id: items.length,
      text: text,
      category: Category.Uncategorized,
      completed: false
    });
  }

  const handleChange = (id: number) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    });
    
    setItems(newItems);
    window.localStorage.setItem('list', JSON.stringify(newItems));
  }

  const handleFocus = () => {
    if (!focused) {
      setFocused(true);
    }
  }

  const onSelect = (item: string) => {
    setText(item);
    saveItems({
      id: items.length,
      text: item,
      category: Category.Uncategorized,
      completed: false
    });
    setFocused(false);
  }

  const autoCompleteList = (objects: listItem[]) => {
    return objects.filter((object1, i, arr) => 
      arr.findIndex(object2 => (object2.text === object1.text)) === i
    )
  }

  return ( 
    <div className={classes.container}>
      <div className={classes.header}>
        {children}
      </div>
      <div className={classes.content}>
        <input 
          type="text"
          className={classes.input}
          placeholder="Add an item"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={handleFocus}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === 'Return') {
              handleReturn();
            }
            if (e.key === 'Escape') {
              setFocused(false);
            }
          }}
        />
        {
          focused &&
          <FilterList 
            term={text} 
            termList={autoCompleteList(items).map((item) => item.text)} 
            onSelect={onSelect}
            />
        }
        {items.length > 0 ? 
          (<ul className={classes.autoCompleteList}>
            {items.map((item) => 
              !item.completed &&
                (<li key={item.id}>
                  <input type="checkbox" 
                    checked={item.completed} 
                    onChange={() => handleChange(item.id)}
                    />
                  {item.text}
                </li>)
            )}
        </ul>
        )
        : null}
      </div>
     </div>
  )
};


export default Box;