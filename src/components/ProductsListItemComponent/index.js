import React, { PropTypes } from 'react';
import styles from './index.scss';

const ProductsListItemComponent = ({ product, toggleModal }) => (
  <div className={styles.block}>
    <div className={styles.component}>
      <div>#{product.id}</div>
      <div>{product.name}</div>
      <div>{product.year}</div>
      <div>{product.pantone_value}</div>
      <div className={styles.show} onClick={toggleModal.bind(null, { productId: product.id })}>Show details</div>
    </div>
  </div>
);

ProductsListItemComponent.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  product: PropTypes.object,
}

export default ProductsListItemComponent;
