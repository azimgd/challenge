import React, { PropTypes } from 'react';
import styles from './index.scss';

const ModalComponent = ({ children }) => (
  <div className={styles.block}>
    <div className={styles.component}>
      {children}
    </div>
  </div>
);

ModalComponent.propTypes = {
  children: PropTypes.object.isRequired,
};

export default ModalComponent;
