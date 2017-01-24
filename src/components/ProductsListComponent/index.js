import React, { PropTypes } from 'react';
import styles from './index.scss';

const ProductsListComponent = ({ itemComponent, headerComponent, products }) => (
  <div className={styles.block}>
    <div className={styles.component}>
      {products && products.length ?
        <div className={styles.header}>
          {React.cloneElement(headerComponent, { version: 'header' })}
        </div>
      : null}

      {products && products.length && products.map(
        (item, key) => <div key={key} className={styles.item}>
          {React.cloneElement(itemComponent, { ...item, version: 'item' })}
        </div>
      )}
    </div>
  </div>
);

ProductsListComponent.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  itemComponent: PropTypes.object.isRequired,
  headerComponent: PropTypes.object.isRequired,
};

export default ProductsListComponent;
