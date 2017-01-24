export const findProductById = (products, id) => {
  if (!products || !products.length) {
    return;
  }

  return products.find(item => item.id === id);
};
