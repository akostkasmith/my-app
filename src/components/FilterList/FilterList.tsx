import React from "react";
import styles from "./FilterList.module.scss";

interface FilterListProps {
  term: string;
  termList: string[];
  onSelect: (item: string) => void
}

const FilterList = ({
  term,
  termList,
  onSelect,
}: FilterListProps) => {

  const highlight = (term: string, textToMatch: string) => {
    const start = textToMatch.toLowerCase().indexOf(term.toLowerCase());
    if (start === -1) return false;

    const before = textToMatch.slice(0, start);
    const highlighted = textToMatch.slice(start, start + term.length);
    const after = textToMatch.slice(start + term.length);

    return (
      <span>
        {before}
        <span className={styles.highlight}>{highlighted}</span>
        {after}
      </span>
    );
  };

  const filteredList = termList.map((item) => {
    return highlight(term, item);
  });

  const handleClick = (item: string) => {
    onSelect(item);
  }

  return (
    <div className={styles.container}>
      <ul className={styles.autoCompleteList}>
        {filteredList.map((item, index) => 
          item && (
            <li 
              key={index} 
              className={styles.autoCompleteListItem}
              onClick={() => handleClick(termList[index])}
              >
              {item}
            </li>
          )
        )}
      </ul>      
    </div>
  );
};

export default FilterList;