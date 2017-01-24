import React, { PropTypes } from 'react';
import styles from './index.scss';

const ProductsListHeaderComponent = () => (
  <div className={styles.block}>
    <div className={styles.component}>
      <div>Order number</div>
      <div>Subtotal</div>
      <div>Date</div>
      <div>Customer</div>
      <div></div>
    </div>
  </div>
);

ProductsListHeaderComponent.propTypes = {
}

export default ProductsListHeaderComponent;
