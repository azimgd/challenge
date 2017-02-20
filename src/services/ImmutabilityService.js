import { newContext } from 'immutability-helper';
const immutability = newContext();

const arrayIntersection = (first, second) => {
  if (!Array.isArray(first) || !Array.isArray(second)) {
    return [];
  }
  return first.filter((item) => second.includes(item));
};
const findIndex = (array, query) => array.findIndex((item) => item === query);

const paginationSlice = (pagination, original) =>
  original.slice((pagination.page - 1) * pagination.perPage, pagination.page * pagination.perPage);

const searchByQuery = (searchQuery, original) => original.filter(item => {
  const target = item.joke.toLowerCase();
  const query = searchQuery.toLowerCase();
  return target.includes(query);
});

const filterByCategories = (categoriesQuery, original) => original.filter(item =>
  arrayIntersection(item.categories, categoriesQuery).length
);

const addCategory = (category, original) => !arrayIntersection(original, [category]).length ?
  [...original, category] : original;

const removeCategory = (category, original) => {
  if (!arrayIntersection(original, [category]).length) {
    return original;
  }
  const index = findIndex(original, category);
  return immutability(original, { $splice: [[index, 1]] });
}

const nextPage = (count, original) => original + count;
const prevPage = (count, original) => original - count;

immutability.extend('$searchByQuery', searchByQuery);
immutability.extend('$filterByCategories', filterByCategories);
immutability.extend('$addCategory', addCategory);
immutability.extend('$removeCategory', removeCategory);
immutability.extend('$paginate', paginationSlice);
immutability.extend('$nextPage', nextPage);
immutability.extend('$prevPage', prevPage);

export default immutability;
