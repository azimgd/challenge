import React, { PropTypes } from 'react';
import ProductsListComponent from 'components/ProductsListComponent';
import ProductsListHeaderComponent from 'components/ProductsListHeaderComponent';
import ProductsListItemComponent from 'components/ProductsListItemComponent';
import ProductsPaginationComponent from 'components/ProductsPaginationComponent';
import ProductDetailsComponent from 'components/ProductDetailsComponent';
import ModalComponent from 'components/ModalComponent';
import ModalComponentHoc from 'components/ModalComponent/hoc';
import ProductsDataService from 'services/ProductsDataService';
import styles from './index.scss';

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchProducts();
  }

  render() {
    return (
      <div className={styles.block}>
        <div className={styles.component}>
          <ProductsListComponent
            products={this.props.products.data}
            itemComponent={<ProductsListItemComponent toggleModal={this.props.toggleModal} />}
            headerComponent={<ProductsListHeaderComponent />}
          />
          <ProductsPaginationComponent />
          {this.props.isModalVisible ?
            <ModalComponent>
              <ProductDetailsComponent toggleModal={this.props.toggleModal} />
            </ModalComponent>
          : null}
        </div>
      </div>
    );
  }
}

HomeContainer.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  products: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    isLoading: PropTypes.bool.isRequired,
  }),
};

export default ProductsDataService(
  ModalComponentHoc(HomeContainer)
);
