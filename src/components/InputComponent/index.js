import React, { PropTypes } from 'react';
import styles from './index.scss';
import cx from 'classnames';
import hoc from './hoc';

const InputComponent = ({ label, onFocus, onBlur, onChange, isFocused }) => (
  <div className={styles.block}>
    <div className={styles.component}>
      <label htmlFor="" className={cx({[styles.label]: true, [styles.label_isBlur]: !isFocused })}>
        {label}
      </label>
      <input type="text" className={cx({[styles.input]: true, [styles.input_isBlur]: !isFocused })} onFocus={onFocus} onBlur={onBlur} onChange={onChange} placeholder={label} />
    </div>
  </div>
);

InputComponent.propTypes = {
  label: PropTypes.string.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  isFocused: PropTypes.bool.isRequired,
}

export default hoc(InputComponent);
