import React, { useEffect } from "react";
import classes from "./Box.module.scss";

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

  useEffect(() => {
    const itemsJSON = window.localStorage.getItem('list');
    const items = itemsJSON ? JSON.parse(itemsJSON) : [];

    if (items) {
      setItems(items);
    }
  }, []);

  const handleReturn = () => {
    if (items) {
      const newItem = {
        id: items.length,
        text: text,
        category: Category.Uncategorized,
        completed: false
      } as listItem;

      const newList = [...items, newItem];
      setItems(newList);
      window.localStorage.setItem('list', JSON.stringify(newList));
      setText('');
    }
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
    console.log("Focus");
  }
  // const filteredCategories = categories.filter((item) => {
  //   return item.toLowerCase().includes(text.toLowerCase());
  // });

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
          }}
        />
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