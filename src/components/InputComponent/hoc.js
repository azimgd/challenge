import React, { PropTypes } from 'react';

const InputComponentHoc = (PassedComponent) => {
  class WrappedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isFocused: false,
      };
      this.onFocus = this.onFocus.bind(this);
      this.onBlur = this.onBlur.bind(this);
      this.onChange = this.onChange.bind(this);
    }

    onFocus(e) {
      if (this.props.onFocus) { this.props.onFocus(e); }
      this.setState({ isFocused: true });
    }

    onBlur(e) {
      if (this.props.onBlur) { this.props.onBlur(e); }
      if (e.target.value.length !== 0) { return; }
      this.setState({ isFocused: false });
    }

    onChange(e) {
      if (this.props.onChange) { this.props.onChange(e); }
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

  WrappedComponent.defaultProps = {
    onFocus: () => {},
    onChange: () => {},
    onBlur: () => {},
  };

  WrappedComponent.propTypes = {
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
  };

  return WrappedComponent;
};

export default InputComponentHoc;
