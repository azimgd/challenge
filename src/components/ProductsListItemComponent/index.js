import React, { PropTypes } from 'react';
import styles from './index.scss';

const ProductsListItemComponent = ({ toggleModal }) => (
  <div className={styles.block}>
    <div className={styles.component}>
      <div>#123</div>
      <div>USD123</div>
      <div>23 Oct</div>
      <div>Azim Gadzhiagayev</div>
      <div onClick={toggleModal}>Show details</div>
    </div>
  </div>
);

ProductsListItemComponent.propTypes = {
  toggleModal: PropTypes.func.isRequired,
}

export default ProductsListItemComponent;
