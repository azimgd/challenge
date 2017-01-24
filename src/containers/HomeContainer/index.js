import React, { PropTypes } from 'react';
import ProductsListComponent from 'components/ProductsListComponent';
import ProductsListHeaderComponent from 'components/ProductsListHeaderComponent';
import ProductsListItemComponent from 'components/ProductsListItemComponent';
import ProductsPaginationComponent from 'components/ProductsPaginationComponent';
import ProductDetailsComponent from 'components/ProductDetailsComponent';
import ModalComponent from 'components/ModalComponent';
import ModalComponentHoc from 'components/ModalComponent/hoc';
import ProductsDataService from 'services/ProductsDataService';
import { findProductById } from 'utils/ProductsUtils';
import styles from './index.scss';

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: {},
    };
    this.selectProduct = this.selectProduct.bind(this);
  }

  componentWillMount() {
    this.props.fetchProducts();
  }

  selectProduct({ productId }) {
    const selectedProduct = findProductById(this.props.products.data, productId);
    if (selectedProduct) {
      this.setState({ selectedProduct });
      this.props.toggleModal();
    }
  }

  render() {
    return (
      <div className={styles.block}>
        <div className={styles.component}>
          <ProductsListComponent
            products={this.props.products.data}
            itemComponent={<ProductsListItemComponent toggleModal={this.selectProduct} />}
            headerComponent={<ProductsListHeaderComponent />}
          />
          <ProductsPaginationComponent
            prevPage={this.props.prevPage}
            nextPage={this.props.nextPage}
            currentNumber={this.props.products.pagination.page}
          />
          {this.props.isModalVisible ?
            <ModalComponent>
              <ProductDetailsComponent
                selectedProduct={this.state.selectedProduct}
                toggleModal={this.props.toggleModal}
              />
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
  prevPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  products: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    isLoading: PropTypes.bool.isRequired,
  }),
};

export default ProductsDataService(
  ModalComponentHoc(HomeContainer)
);
