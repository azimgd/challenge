import React, { PropTypes } from 'react';
import styles from './index.scss';

const ProductsPaginationComponent = () => (
  <div className={styles.block}>
    <div className={styles.component}>
      <div className={styles.button}>
        <button>← Prev</button>
      </div>

      <div className={styles.button}>
        <button>Next →</button>
      </div>
    </div>
  </div>
);

ProductsPaginationComponent.propTypes = {
};

export default ProductsPaginationComponent;
