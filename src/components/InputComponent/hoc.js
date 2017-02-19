import React from 'react';

const InputComponentHoc = (PassedComponent) => {
  class WrappedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isFocused: false,
      }
      this.onFocus = this.onFocus.bind(this);
      this.onBlur = this.onBlur.bind(this);
      this.onChange = this.onChange.bind(this);
    }

    onFocus() {
      this.setState({ isFocused: true });
    }

    onBlur(e) {
      if (e.target.value.length !== 0) { return; }
      this.setState({ isFocused: false });
    }

    onChange(e) {
      this.setState({ isFocused: true });
    }

    render() {
      return (
        <PassedComponent
          {...this.props}
          {...this.state}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
        />
      );
    }
  }

  return WrappedComponent;
};

export default InputComponentHoc;
