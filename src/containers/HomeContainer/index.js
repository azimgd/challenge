import React from 'react';
import ProductsListComponent from 'components/ProductsListComponent';
import ProductsListItemComponent from 'components/ProductsListItemComponent';
import styles from './index.scss';

const HomeContainer = () => (
  <div className={styles.block}>
    <div className={styles.component}>
      <ProductsListComponent products={[ { a: 1 }, { a: 1 }, { a: 1 } ]}>
        <ProductsListItemComponent />
      </ProductsListComponent>
    </div>
  </div>
);

export default HomeContainer;
