import React from 'react';
import {memo} from "react";
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import './style.css';

const Navigation = () => {
  const { totalPages, currentPage } = useSelector(state => state.navigation);
  const store = useStore();

  const handleClick = (page) => {
    if (page !== '...') {
      store.actions.navigation.setCurrentPage(page);
    }console.log(handleClick)
  };

  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i);
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      pages.push('...');
    }
  }

  return (
    <div className="Navigation">
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => handleClick(page)}
          className={page === currentPage ? 'Navigation-button active' : 'Navigation-button'}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default memo(Navigation);