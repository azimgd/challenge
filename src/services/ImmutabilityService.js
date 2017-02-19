import { newContext } from 'immutability-helper';
const immutability = newContext();

const paginationSlice = (pagination, original) =>
  original.slice((pagination.page - 1) * pagination.perPage, pagination.page * pagination.perPage);

const searchByQuery = (searchQuery, original) => original.filter(item => {
  const target = item.joke.toLowerCase();
  const query = searchQuery.toLowerCase();
  return target.includes(query);
});

const nextPage = (count, original) => original + count;
const prevPage = (count, original) => original - count;

immutability.extend('$search', searchByQuery);
immutability.extend('$paginate', paginationSlice);
immutability.extend('$nextPage', nextPage);
immutability.extend('$prevPage', prevPage);

export default immutability;
