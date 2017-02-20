import React, { PropTypes } from 'react';
import cx from 'classnames';
import styles from './index.scss';
import hoc from './hoc';

const CategoriesComponent = ({ categories, selected, onSelect }) => (
  <div className={styles.block}>
    <div className={styles.component}>
      <div className={styles.category}>Categories: </div>
      {categories && categories.length && categories.map((item, key) =>
        <div key={key} className={cx({ [styles.category]: true, [styles.category_active]: selected.includes(item) })}>
          <a href="#" value={item} onClick={onSelect}>{item}</a>
        </div>
      )}
    </div>
  </div>
);

CategoriesComponent.propTypes = {
  categories: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default hoc(CategoriesComponent);
