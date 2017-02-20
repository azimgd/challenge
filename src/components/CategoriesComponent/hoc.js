import React, { PropTypes } from 'react';
import update from 'services/ImmutabilityService';

const CategoriesComponentHoc = (PassedComponent) => {
  class WrappedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selected: [],
      }
      this.onSelect = this.onSelect.bind(this);
    }

    componentWillUpdate(nextProps, nextState) {
      if (JSON.stringify(nextState.selected) === JSON.stringify(this.state.selected)) {
        return;
      }
      this.props.onChange(nextState.selected);
    }

    onSelect(e) {
      e.preventDefault();
      const operation = this.state.selected.includes(e.target.getAttribute('value')) ? '$removeCategory' : '$addCategory';
      const state = update(this.state, {
        selected: { [operation]: e.target.getAttribute('value') },
      });
      this.setState(state);
    }

    render() {
      return (
        <PassedComponent
          {...this.props}
          {...this.state}
          onSelect={this.onSelect}
        />
      );
    }
  }

  WrappedComponent.propTypes = {
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
  };

  return WrappedComponent;
};

export default CategoriesComponentHoc;
