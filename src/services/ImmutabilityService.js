import { newContext } from 'immutability-helper';
const immutability = newContext();

const paginationSlice = (pagination, original) =>
  original.slice((pagination.page - 1) * pagination.perPage, pagination.page * pagination.perPage);

immutability.extend('$paginate', paginationSlice);

export default immutability;
