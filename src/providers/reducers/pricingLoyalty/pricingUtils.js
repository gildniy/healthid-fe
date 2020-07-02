export const addSelectedRows = (pricing, selected) => {
  const { rows } = pricing;
  const selectedRows = rows.filter(element => selected.includes(element.id));

  return selectedRows;
};

export default addSelectedRows;
