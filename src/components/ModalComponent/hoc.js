import React from 'react';

const ModalComponentHoc = (PassedComponent) => {
  class WrappedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isModalVisible: false,
      }
      this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
      this.setState({ isModalVisible: !this.state.toggleModal });
    }

    render() {
      return (
        <PassedComponent
          {...this.props}
          {...this.state}
          toggleModal={this.toggleModal}
        />
      );
    }
  }

  return WrappedComponent;
};

export default ModalComponentHoc;
