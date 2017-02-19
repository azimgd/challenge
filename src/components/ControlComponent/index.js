import React from 'react';
import styles from './index.scss';

const ControlComponent = ({ filter, search }) => (
  <div className={styles.block}>
    <div className={styles.component}>
      <div className={styles.component_search}>
        {search}
      </div>
      <div className={styles.component_filter}>
        {filter}
      </div>
    </div>
  </div>
);

ControlComponent.propTypes = {
}

export default ControlComponent;
