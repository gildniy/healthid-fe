import moment from 'moment';

const startDate = moment().set({
  hour: 6, minute: 0, second: 0, millisecond: 0
});
const endDate = moment().set({
  hour: 23, minute: 59, second: 59, millisecond: 0
});

const saleHistory = {
  initialData: null,
  salesData: '',
  totals: '',
  openSearchPopper: false,
  searchPopperAnchorEl: null,
  currentPage: 1,
  currentPageCount: 50,
  totalNumberOfSales: 0,
  startDate,
  endDate,
  search: ''
};

export default saleHistory;
