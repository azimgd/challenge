import React, { PropTypes } from 'react';
import styles from './index.scss';


const ProductsListItemComponent = ({ version = 'item' }) => (
  <div className={styles.block}>
    {version === 'header' ?
      <div className={styles.component}>
        <div>Order number</div>
        <div>Subtotal</div>
        <div>Date</div>
        <div>Customer</div>
      </div>
    : null}

    {version === 'item' ?
      <div className={styles.component}>
        <div>#123</div>
        <div>USD123</div>
        <div>23 Oct</div>
        <div>Azim Gadzhiagayev</div>
      </div>
    : null}
  </div>
);

ProductsListItemComponent.propTypes = {
  version: PropTypes.oneOf(['item', 'header']),
}

export default ProductsListItemComponent;
