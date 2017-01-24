import React, { PropTypes } from 'react';
import styles from './index.scss';

const ProductDetailsComponent = ({ selectedProduct, toggleModal }) => (
  <div className={styles.block}>
    <div className={styles.component}>
      <div className={styles.title}>
        {selectedProduct.name}
      </div>
      <div className={styles.image}>
        <img src={`http://placehold.it/300?text=${selectedProduct.pantone_value}`} alt=""/>
      </div>
      <div className={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </div>
      <button onClick={toggleModal}>Toggle modal</button>
    </div>
  </div>
);

ProductDetailsComponent.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  selectedProduct: PropTypes.object.isRequired,
};

export default ProductDetailsComponent;
