import expect from 'expect.js';
import * as ImmutabilityService from '../src/services/ImmutabilityService';

describe('Immutability service', () => {
  it('Creates an array of unique, intersecting values from provided arrays', () => {
    expect(ImmutabilityService.arrayIntersection).to.be.a('function');
    expect(ImmutabilityService.arrayIntersection([1, 2, 'asd'], [undefined, 2, 'asd', 0, null])).to.eql([2, 'asd']);
    expect(ImmutabilityService.arrayIntersection(null, [])).to.eql([]);
  });

  it('Returns index of provided element in array', () => {
    expect(ImmutabilityService.findIndex).to.be.a('function');
    expect(ImmutabilityService.findIndex([1, 2, 'asd'], 2)).to.eql(1);
    expect(ImmutabilityService.findIndex(null, [])).to.eql(false);
  });

  it('Slices contents from data according to provided pagination', () => {
    expect(ImmutabilityService.paginationSlice).to.be.a('function');
    expect(ImmutabilityService.paginationSlice({ page: 2, perPage: 2 }, [1, 2, 'asd', 3, 123, 2])).to.eql(['asd', 3]);
    expect(ImmutabilityService.paginationSlice(null, [])).to.eql([]);
  });

  it('Finds all jokes including search query', () => {
    expect(ImmutabilityService.searchByQuery).to.be.a('function');
    expect(ImmutabilityService.searchByQuery('ds', [{ joke: 'asd' }, { joke: 'dsa' }, { joke: undefined }])).to.eql([{ joke: 'dsa' }]);
    expect(ImmutabilityService.searchByQuery(null, [])).to.eql([]);
  });

  it('Finds all jokes including search query', () => {
    expect(ImmutabilityService.filterByCategories).to.be.a('function');
    expect(ImmutabilityService.filterByCategories(['dsa', 'asd'], [{ categories: ['asd'] }, { categories: ['dsa'] }, { categories: undefined }])).to.eql([{ categories: ['asd'] }, { categories: ['dsa'] }]);
    expect(ImmutabilityService.filterByCategories(null, [])).to.eql([]);
  });

  it('Add category into selected list', () => {
    expect(ImmutabilityService.addCategory).to.be.a('function');
    expect(ImmutabilityService.addCategory('dsa', ['bas', 'asd'])).to.eql(['bas', 'asd', 'dsa']);
    expect(ImmutabilityService.addCategory(null, null)).to.eql([]);
  });

  it('Removes category from selected list', () => {
    expect(ImmutabilityService.removeCategory).to.be.a('function');
    expect(ImmutabilityService.removeCategory('asd', ['bas', 'asd', 'dsa'])).to.eql(['bas', 'dsa']);
    expect(ImmutabilityService.removeCategory(null, null)).to.eql([]);
  });

  it('Scrolls page up', () => {
    expect(ImmutabilityService.nextPage).to.be.a('function');
    expect(ImmutabilityService.nextPage(1, 4)).to.eql(5);
    expect(ImmutabilityService.nextPage(null, null)).to.eql(1);
  });

  it('Scrolls page down', () => {
    expect(ImmutabilityService.prevPage).to.be.a('function');
    expect(ImmutabilityService.prevPage(1, 4)).to.eql(3);
    expect(ImmutabilityService.prevPage(null, null)).to.eql(1);
  });
});
