import React from 'react';
import styles from './Pagination.module.css';

type PaginationProps = {
  currentPage: number;
  total: number;
  onPageChange: (newPage: number) => void;
};

export default function Pagination({ currentPage, total, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(total / 10);
  let startPage = Math.max(currentPage - 2, 1);
  let endPage = Math.min(startPage + 4, totalPages);

  if (endPage - startPage < 4) {
    startPage = Math.max(endPage - 4, 1);
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx);

  return (
    <div className={styles.paginationContainer}>
      <button 
        className={styles.pageButton} 
        disabled={currentPage === 1} 
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lt;
      </button>
      {pages.map(page => (
        <button 
          key={page}
          className={`${styles.pageButton} ${page === currentPage ? styles.active : ''}`}
          disabled={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button 
        className={styles.pageButton} 
        disabled={currentPage === totalPages} 
        onClick={() => onPageChange(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
}
