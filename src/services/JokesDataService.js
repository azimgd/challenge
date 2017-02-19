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
        page: 1,
        searchQuery: null,
      };
      this.fetchData = this.fetchData.bind(this);
      this.onDataLoading = this.onDataLoading.bind(this);
      this.onDataLoaded = this.onDataLoaded.bind(this);
      this.onDataFailed = this.onDataFailed.bind(this);
      this.nextPage = this.nextPage.bind(this);
      this.prevPage = this.prevPage.bind(this);
      this.onSearch = this.onSearch.bind(this);
    }

    apiCall() {
      return axios.get(`http://api.icndb.com/jokes`, { params: { escape: 'javascript' } });
    }

    onDataLoading() {
      const loadingState = update(this.state, { isLoading: { $set: true } });
      this.setState(loadingState);
    }

    onDataLoaded(res) {
      const successState = update(this.state, {
        isLoading: { $set: false },
        data: { $set: res.data.value },
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

    filterBySearch(posts, searchQuery) {
      if (!searchQuery) { return posts; }
      return update(posts, {
        data: { $search: searchQuery },
      });
    }

    nextPage() {
      const state = update(this.state, { page: { $nextPage: 1 } });
      this.setState(state);
    }

    prevPage() {
      const state = update(this.state, { page: { $prevPage: 1 } });
      this.setState(state);
    }

    onSearch(e) {
      const state = update(this.state, { searchQuery: { $set: e.target.value } });
      this.setState(state);
    }

    render() {
      const paginatedState = isPaginationEnabled ? this.paginateResults(this.state, this.state.page) : this.state;
      const searchState = this.filterBySearch(this.state, this.state.searchQuery);
      const responseData = this.state.searchQuery ? searchState : paginatedState;
      return (
        <PassedComponent
          {...this.props}
          responseData={responseData}
          fetchData={this.fetchData}
          nextPage={this.nextPage}
          prevPage={this.prevPage}
          onSearch={this.onSearch}
        />
      );
    }
  }

  return JokesDataService;
};

export default JokesDataServiceHoc;
