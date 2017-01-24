import React, { PropTypes } from 'react';
import styles from './index.scss';

const ProductsPaginationComponent = ({ currentNumber, nextPage, prevPage }) => (
  <div className={styles.block}>
    <div className={styles.component}>
      <div className={styles.button}>
        <button onClick={prevPage}>← Prev</button>
      </div>

      <div className={styles.number}>
        page number: {currentNumber}
      </div>

      <div className={styles.button}>
        <button onClick={nextPage}>Next →</button>
      </div>
    </div>
  </div>
);

ProductsPaginationComponent.propTypes = {
  prevPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  currentNumber: PropTypes.number.isRequired,
};

export default ProductsPaginationComponent;
