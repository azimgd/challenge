import React from 'react';
import axios from 'axios';
import update from 'services/ImmutabilityService';

const JokesDataServiceHoc = (PassedComponent, isPaginationEnabled, jokesPerPage) => {
  class JokesDataService extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        isLoading: false,
        page: 1
      };
      this.fetchData = this.fetchData.bind(this);
      this.onDataLoading = this.onDataLoading.bind(this);
      this.onDataLoaded = this.onDataLoaded.bind(this);
      this.onDataFailed = this.onDataFailed.bind(this);
      this.nextPage = this.nextPage.bind(this);
      this.prevPage = this.prevPage.bind(this);
    }

    apiCall() {
      return axios.get(`http://api.icndb.com/jokes`, { params: { escape: 'javascript' } });
    }

    onDataLoading() {
      const loadingState = update(this.state, { isLoading: { $set: true } });
      this.setState(loadingState);
    }

    onDataLoaded(res) {
      const { value } = res.data;
      const successState = update(this.state, {
        isLoading: { $set: false },
        data: { $set: value },
      });
      this.setState(successState);
    }

    onDataFailed() {
      const loadingState = update(this.state, { isLoading: { $set: false } });
      this.setState(loadingState);
    }

    fetchData() {
      if (this.state.isLoading) { return; }
      this.onDataLoading();
      this.apiCall()
      .then(this.onDataLoaded)
      .catch(this.onDataFailed);
    }

    paginateResults(posts, page) {
      return update(posts, {
        data: { $paginate: { perPage: jokesPerPage, page } },
      });
    }

    nextPage() {
      const state = update(this.state, { page: { $set: this.state.page + 1 } });
      this.setState(state);
    }

    prevPage() {
      const state = update(this.state, { page: { $set: this.state.page - 1 } });
      this.setState(state);
    }

    render() {
      const state = isPaginationEnabled ? this.paginateResults(this.state, this.state.page) : this.state;
      return (
        <PassedComponent
          {...this.props}
          responseData={state}
          fetchData={this.fetchData}
          nextPage={this.nextPage}
          prevPage={this.prevPage}
        />
      );
    }
  }

  return JokesDataService;
};

export default JokesDataServiceHoc;
