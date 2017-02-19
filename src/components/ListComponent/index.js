import React, { PropTypes } from 'react';
import styles from './index.scss';

const ListComponent = ({ itemComponent, headerComponent, isLoading, items }) => (
  <div className={styles.block}>
    <div className={styles.component}>
      {items && items.length > 0 ?
        <div className={styles.header}>
          {headerComponent}
        </div>
      : null}

      {items && items.length > 0 && items.map(
        (item, key) => <div key={key} className={styles.item}>
          {React.cloneElement(itemComponent, { product: item })}
        </div>
      )}

      {!isLoading && (!items || !items.length) ?
        <div className={styles.empty}>
          No data is available for your request...
        </div>
      : null}
    </div>
  </div>
);

ListComponent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  itemComponent: PropTypes.object.isRequired,
  headerComponent: PropTypes.object.isRequired,
};

export default ListComponent;
