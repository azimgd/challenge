import React, { PropTypes } from 'react';
import styles from './index.scss';

const ListItemComponent = ({ product }) => (
  <div className={styles.block}>
    <div className={styles.component}>
      <div className={styles.component_id}>#{product.id}</div>
      <div className={styles.component_joke}>{product.joke}</div>
      <div className={styles.component_category}>{product.categories.join(', ')}</div>
    </div>
  </div>
);

ListItemComponent.propTypes = {
  product: PropTypes.object,
}

export default ListItemComponent;
