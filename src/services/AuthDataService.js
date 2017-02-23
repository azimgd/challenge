import React from 'react';
import axios from 'axios';
import update from 'services/ImmutabilityService';

const AuthDataServiceHoc = (PassedComponent) => {
  class AuthDataService extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: {},
        isLoading: false,
        isAuthorised: false,
      };
      this.onDataLoading = this.onDataLoading.bind(this);
      this.onDataLoaded = this.onDataLoaded.bind(this);
      this.onDataFailed = this.onDataFailed.bind(this);
      this.fetchData = this.fetchData.bind(this);
    }

    apiCall() {
      return axios.get('/user');
    }

    onDataLoading() {
      const loadingState = update(this.state, { isLoading: { $set: true } });
      this.setState(loadingState);
    }

    onDataLoaded(res) {
      const successState = update(this.state, {
        isLoading: { $set: false },
        isAuthorised: { $set: true },
        data: { $set: res.data },
      });
      this.setState(successState);
    }

    onDataFailed() {
      const loadingState = update(this.state, { isLoading: { $set: false } });
      this.setState(loadingState);
    }

    fetchData(params) {
      if (this.state.isLoading) { return; }
      this.onDataLoading();
      this.apiCall(params)
      .then(this.onDataLoaded)
      .catch(this.onDataFailed);
    }

    render() {
      return (
        <PassedComponent
          {...this.props}
          user={this.state.data}
          isAuthorised={this.state.isAuthorised}
          fetchData={this.fetchData}
        />
      );
    }
  }

  return AuthDataService;
};

export default AuthDataServiceHoc;
