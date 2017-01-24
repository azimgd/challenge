import React from 'react';

const ModalComponentHoc = (PassedComponent) => {
  class WrappedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        products: {
          data: [{ asd: 1 }],
          isLoading: false,
        },
      }
      this.fetchProducts = this.fetchProducts.bind(this);
    }

    fetchProducts() {
    }

    render() {
      return (
        <PassedComponent
          {...this.props}
          {...this.state}
          fetchProducts={this.fetchProducts}
        />
      );
    }
  }

  return WrappedComponent;
};

export default ModalComponentHoc;
