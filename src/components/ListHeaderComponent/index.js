import React from 'react';
import styles from './index.scss';

const ListHeaderComponent = () => (
  <div className={styles.block}>
    <div className={styles.component}>
      <div className={styles.component_id}>id</div>
      <div className={styles.component_joke}>Text</div>
      <div className={styles.component_category}>Category</div>
    </div>
  </div>
);

ListHeaderComponent.propTypes = {
}

export default ListHeaderComponent;
