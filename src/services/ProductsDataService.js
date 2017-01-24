import React from 'react';
import axios from 'axios';
import update from 'immutability-helper';

const ModalComponentHoc = (PassedComponent) => {
  class WrappedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        pagination: {
          page: 1,
        },
        isLoading: false,
      }
      this.fetchProducts = this.fetchProducts.bind(this);
      this.onProductLoading = this.onProductLoading.bind(this);
      this.onProductLoaded = this.onProductLoaded.bind(this);
      this.onProductFailed = this.onProductFailed.bind(this);
      this.nextPage = this.nextPage.bind(this);
      this.prevPage = this.prevPage.bind(this);
    }

    /**
     *
     */
    onProductLoading() {
      const loadingState = update(this.state, { isLoading: { $set: true } });
      this.setState(loadingState);
    }

    /**
     * this containes result data from api
     */
    onProductLoaded(res) {
      const { data, ...pagination } = res.data;
      const successState = update(this.state, {
        isLoading: { $set: false },
        data: { $set: data },
        pagination: { $set: pagination },
      });
      this.setState(successState);
    }

    /**
     *
     */
    onProductFailed() {
      const loadingState = update(this.state, { isLoading: { $set: false } });
      this.setState(loadingState);
    }

    /**
     * To fetch products
     */
    fetchProducts(pageNumber) {
      if (this.state.isLoading) {
        return;
      }
      this.onProductLoading();
      const page = pageNumber || this.state.pagination.page;
      axios.get(`https://reqres.in/api/products?page=${page}`)
      .then(this.onProductLoaded)
      .catch(this.onProductFailed);
    }

    /**
     * To scroll on next page
     */
    nextPage() {
      const nextPage = parseInt(this.state.pagination.page, 10) + 1;
      this.fetchProducts(nextPage);
    }

    /**
     * To scroll on prev page
     */
    prevPage() {
      const pageNumber = parseInt(this.state.pagination.page, 10) - 1;
      const nextPage = pageNumber > 0 ? pageNumber : 0;
      this.fetchProducts(nextPage);
    }

    render() {
      return (
        <PassedComponent
          {...this.props}
          products={this.state}
          fetchProducts={this.fetchProducts}
          nextPage={this.nextPage}
          prevPage={this.prevPage}
        />
      );
    }
  }

  return WrappedComponent;
};

export default ModalComponentHoc;
