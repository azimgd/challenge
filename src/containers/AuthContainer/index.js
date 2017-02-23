import React, { PropTypes } from 'react';
import AuthDataService from 'services/AuthDataService';

class AuthContainer extends React.Component {
  componentWillMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <div>
        {this.props.isAuthorised ?
          React.cloneElement(this.props.children, { user: this.props.user })
        : null}

        {!this.props.isAuthorised ?
          <a href="http://localhost:8080/auth/google">Sign in with google</a>
        : null}
      </div>
    );
  }
}

AuthContainer.propTypes = {
  user: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
  isAuthorised: PropTypes.bool.isRequired,
};

export default AuthDataService(AuthContainer);
