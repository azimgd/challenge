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
        categoriesQuery: [],
      };
      this.fetchData = this.fetchData.bind(this);
      this.onDataLoading = this.onDataLoading.bind(this);
      this.onDataLoaded = this.onDataLoaded.bind(this);
      this.onDataFailed = this.onDataFailed.bind(this);
      this.nextPage = this.nextPage.bind(this);
      this.prevPage = this.prevPage.bind(this);
      this.onSearch = this.onSearch.bind(this);
      this.onfilterByCategories = this.onfilterByCategories.bind(this);
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

    onSearch(e) {
      const state = update(this.state, { searchQuery: { $set: e.target.value } });
      this.setState(state);
    }

    onfilterByCategories(categories) {
      const state = update(this.state, { categoriesQuery: { $set: categories } });
      this.setState(state);
    }

    nextPage() {
      const state = update(this.state, { page: { $nextPage: 1 } });
      this.setState(state);
    }

    prevPage() {
      const state = update(this.state, { page: { $prevPage: 1 } });
      this.setState(state);
    }

    filterByCategories(posts, categories) {
      if (!categories || !categories.length) { return posts; }
      return update(posts, {
        data: { $filterByCategories: categories },
      });
    }

    filterBySearch(posts, searchQuery) {
      if (!searchQuery) { return posts; }
      return update(posts, {
        data: { $searchByQuery: searchQuery },
      });
    }

    paginateResults(posts, page) {
      return update(posts, {
        data: { $paginate: { perPage: jokesPerPage, page } },
      });
    }

    fetchData(params) {
      if (this.state.isLoading) { return; }
      this.onDataLoading();
      this.apiCall(params)
      .then(this.onDataLoaded)
      .catch(this.onDataFailed);
    }

    apiCall(params) {
      const { firstName, lastName } = params || {};
      return axios.get('https://api.icndb.com/jokes', { params: { escape: 'javascript', firstName, lastName } });
    }

    render() {
      const paginatedState = isPaginationEnabled ? this.paginateResults(this.state, this.state.page) : this.state;
      const searchState = this.filterBySearch(this.state, this.state.searchQuery);
      const responseData = this.state.searchQuery ? searchState : paginatedState;
      const data = this.state.categoriesQuery.length ? this.filterByCategories(this.state, this.state.categoriesQuery) : responseData;
      return (
        <PassedComponent
          {...this.props}
          responseData={data}
          fetchData={this.fetchData}
          nextPage={this.nextPage}
          prevPage={this.prevPage}
          onSearch={this.onSearch}
          onfilterByCategories={this.onfilterByCategories}
        />
      );
    }
  }

  return JokesDataService;
};

export default JokesDataServiceHoc;
