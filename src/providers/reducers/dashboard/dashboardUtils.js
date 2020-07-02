export const setSaleData = (saleChartData, payload = []) => {
  const nodes = payload.map(value => value.node);
  const data = nodes.length && nodes.map(node => node.subtotal);
  const categories = nodes.length && nodes.map(node => (node.transactionDate));
  const series = [{ name: 'data', data }];
  const xaxis = { ...saleChartData.options.xaxis, categories };
  const options = { ...saleChartData.options, xaxis };
  return { series, options };
};

export const setProductData = (productChartData, payload = []) => {
  const nodes = payload.map(value => value.node);
  const data = nodes.length && nodes.map(node => node.quantitySold);
  const categories = nodes.length && nodes.map(node => (node.transactionDate));
  const series = [{ name: 'data', data }];
  const xaxis = { ...productChartData.options.xaxis, categories };
  const options = { ...productChartData.options, xaxis };
  return { series, options };
};
