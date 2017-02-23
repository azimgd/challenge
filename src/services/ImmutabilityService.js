import { newContext } from 'immutability-helper';

const immutability = newContext();

const isArray = input => Array.isArray(input);
const isObject = input => input !== null && typeof input === 'object';
const isInteger = input => parseInt(input, 10) === input;

/**
 * Creates an array of unique, intersecting values from provided arrays
 */
export const arrayIntersection = (first, second) => {
  if (!isArray(first) || !isArray(second)) { return []; }
  return first.filter(item => second.includes(item));
};

/**
 * Returns index of provided element in array
 */
export const findIndex = (array, query) => {
  if (!isArray(array)) { return false; }
  return array.findIndex(item => item === query);
};

/**
 * Slices contents from data according to provided pagination
 */
export const paginationSlice = (pagination, original) => {
  if (!isObject(pagination) || !isArray(original)) { return []; }
  return original.slice(
    (pagination.page - 1) * pagination.perPage, pagination.page * pagination.perPage,
  );
};

/**
 * Finds all jokes including search query
 */
export const searchByQuery = (searchQuery, original) => {
  if (!isArray(original)) { return []; }
  return original.filter((item) => {
    const target = String(item.joke).toLowerCase();
    const query = String(searchQuery).toLowerCase();
    return target.includes(query);
  });
};

/**
 * Gets jokes by category
 */
export const filterByCategories = (categories, original) => {
  if (!isArray(categories) || !isArray(original)) { return []; }
  return original.filter(item => arrayIntersection(item.categories, categories).length);
};

/**
 * Add category into selected list
 */
export const addCategory = (category, original) => {
  if (!isArray(original)) { return []; }
  return !arrayIntersection(original, [category]).length ? [...original, category] : original;
};

/**
 * Removes category from selected list
 */
export const removeCategory = (category, original) => {
  if (!isArray(original)) { return []; }
  if (!arrayIntersection(original, [category]).length) { return original; }
  const index = findIndex(original, category);
  return immutability(original, { $splice: [[index, 1]] });
};

/**
 * Scrolls pages
 */
export const nextPage = (count, original) => {
  if (!isInteger(count) || !isInteger(original)) { return 1; }
  return original + count;
};
export const prevPage = (count, original) => {
  if (!isInteger(count) || !isInteger(original)) { return 1; }
  const next = original - count;
  if (next < 1) { return 1; }
  return next;
};

immutability.extend('$searchByQuery', searchByQuery);
immutability.extend('$filterByCategories', filterByCategories);
immutability.extend('$addCategory', addCategory);
immutability.extend('$removeCategory', removeCategory);
immutability.extend('$paginate', paginationSlice);
immutability.extend('$nextPage', nextPage);
immutability.extend('$prevPage', prevPage);

export default immutability;
