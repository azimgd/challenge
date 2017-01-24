import React, { PropTypes } from 'react';
import ProductsListComponent from 'components/ProductsListComponent';
import ProductsListItemComponent from 'components/ProductsListItemComponent';
import ProductsPaginationComponent from 'components/ProductsPaginationComponent';
import ModalComponent from 'components/ModalComponent';
import ModalComponentHoc from 'components/ModalComponent/hoc';
import styles from './index.scss';

const HomeContainer = ({ toggleModal, isModalVisible }) => (
  <div className={styles.block}>
    <div className={styles.component}>
      <button onClick={toggleModal}>Toggle</button>
      <ProductsListComponent products={[ { a: 1 }, { a: 1 }, { a: 1 } ]}>
        <ProductsListItemComponent />
      </ProductsListComponent>
      <ProductsPaginationComponent />
      {isModalVisible ?
        <ModalComponent>
        123123
        </ModalComponent>
      : null}
    </div>
  </div>
);

HomeContainer.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default ModalComponentHoc(HomeContainer);
