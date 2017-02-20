import React, { PropTypes } from 'react';
import ListComponent from 'components/ListComponent';
import ListItemComponent from 'components/ListItemComponent';
import InputComponent from 'components/InputComponent';
import CategoriesComponent from 'components/CategoriesComponent';
import ControlComponent from 'components/ControlComponent';
import ListHeaderComponent from 'components/ListHeaderComponent';
import PaginationComponent from 'components/PaginationComponent';
import JokesDataService from 'services/JokesDataService';
import styles from './index.scss';

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  componentWillMount() {
    this.props.fetchData();
  }

  nextPage(e) {
    window.scrollTo(0, 0);
    this.props.nextPage(e);
  }

  prevPage(e) {
    window.scrollTo(0, 0);
    this.props.prevPage(e);
  }

  render() {
    return (
      <div className={styles.block}>
        <div className={styles.component}>
          <ControlComponent
            search={<InputComponent onChange={this.props.onSearch} label="Search" />}
            filter={<CategoriesComponent onChange={this.props.onfilterByCategories} categories={['explicit', 'nerdy']} />}
          />
          <ListComponent
            items={this.props.responseData.data}
            itemComponent={<ListItemComponent />}
            headerComponent={<ListHeaderComponent />}
            isLoading={this.props.responseData.isLoading}
          />
          {!this.props.responseData.searchQuery ?
            <PaginationComponent
              prevPage={this.prevPage}
              nextPage={this.nextPage}
              currentNumber={this.props.responseData.page}
              isLoading={this.props.responseData.isLoading}
            />
          : null}
        </div>
      </div>
    );
  }
}

HomeContainer.propTypes = {
  fetchData: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onfilterByCategories: PropTypes.func.isRequired,
  responseData: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    page: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    searchQuery: PropTypes.string.isRequired,
  }),
};

export default JokesDataService(HomeContainer, true, 30);
