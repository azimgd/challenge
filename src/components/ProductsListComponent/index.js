import React, { PropTypes } from 'react';
import styles from './index.scss';

const ProductsListComponent = ({ itemComponent, headerComponent, products }) => (
  <div className={styles.block}>
    <div className={styles.component}>
      {products && products.length > 0 ?
        <div className={styles.header}>
          {headerComponent}
        </div>
      : null}

      {products && products.length > 0 && products.map(
        (item, key) => <div key={key} className={styles.item}>
          {React.cloneElement(itemComponent, { ...item })}
        </div>
      )}

      {!products || !products.length ?
        <div className={styles.header}>
          Empty list
        </div>
      : null}
    </div>
  </div>
);

ProductsListComponent.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  itemComponent: PropTypes.object.isRequired,
  headerComponent: PropTypes.object.isRequired,
};

export default ProductsListComponent;
