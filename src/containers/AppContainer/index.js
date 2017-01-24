import React, { PropTypes } from 'react';
import styles from './index.scss';

const AppContainer = ({ children }) => (
  <div className={styles.block}>
    <div className={styles.component}>
      {children}
    </div>
  </div>
);

AppContainer.propTypes = {
  children: PropTypes.object.isRequired,
};

export default AppContainer;
