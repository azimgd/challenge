import React, { PropTypes } from 'react';
import ProductsListComponent from 'components/ProductsListComponent';
import ProductsListHeaderComponent from 'components/ProductsListHeaderComponent';
import ProductsListItemComponent from 'components/ProductsListItemComponent';
import ProductsPaginationComponent from 'components/ProductsPaginationComponent';
import ProductDetailsComponent from 'components/ProductDetailsComponent';
import ModalComponent from 'components/ModalComponent';
import ModalComponentHoc from 'components/ModalComponent/hoc';
import styles from './index.scss';

const HomeContainer = ({ toggleModal, isModalVisible }) => (
  <div className={styles.block}>
    <div className={styles.component}>
      <ProductsListComponent
        products={[ { a: 1 }, { a: 1 }, { a: 1 } ]}
        itemComponent={<ProductsListItemComponent toggleModal={toggleModal} />}
        headerComponent={<ProductsListHeaderComponent />}
      />
      <ProductsPaginationComponent />
      {isModalVisible ?
        <ModalComponent>
          <ProductDetailsComponent toggleModal={toggleModal} />
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
