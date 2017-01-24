import React, { PropTypes } from 'react';
import styles from './index.scss';

const ProductDetailsComponent = ({ toggleModal }) => (
  <div className={styles.block}>
    <div className={styles.component}>
      <button onClick={toggleModal}>Toggle modal</button>
    </div>
  </div>
);

ProductDetailsComponent.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

export default ProductDetailsComponent;
