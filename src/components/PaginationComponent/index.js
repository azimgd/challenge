import React, { PropTypes } from 'react';
import styles from './index.scss';

const PaginationComponent = ({ isLoading, currentNumber, nextPage, prevPage }) => (
  <div className={styles.block}>
    <div className={styles.component}>
      <div className={styles.button}>
        <button onClick={prevPage} disabled={isLoading}>← Prev</button>
      </div>

      {isLoading ?
        <div className={styles.number}>
          is loading ...
        </div>
      : null}

      {!isLoading ?
        <div className={styles.number}>
          page number: {currentNumber}
        </div>
      : null}

      <div className={styles.button}>
        <button onClick={nextPage} disabled={isLoading}>Next →</button>
      </div>
    </div>
  </div>
);

PaginationComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  prevPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  currentNumber: PropTypes.number.isRequired,
};

export default PaginationComponent;
