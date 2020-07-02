const columns = status => [
  {
    name: 'date',
    label: status === 'closed' ? 'DATE RECEIVED' : 'CREATED ON',
    options: {
      filter: false,
      sort: true,
    }
  },
  {
    name: 'supplierOrderName',
    label: 'ORDER NAME',
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: 'supplierOrderStatus',
    label: 'STATUS',
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: 'supplier',
    label: 'SUPPLIER',
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: 'batches',
    label: 'GRAND TOTAL',
    options: {
      filter: true,
      sort: true,
    }
  },
];

export default columns;
