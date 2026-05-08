export const filterByQuery = (items, query) => items
  .filter((item) => {
    const values = Object.values(item).slice(1);
    return values.find(value => `${value}`.toLowerCase().includes(`${query}`.toLowerCase()));
  });
