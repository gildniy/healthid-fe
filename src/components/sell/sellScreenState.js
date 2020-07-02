
const initialState = {
  fetchInitialData: true,
  buyingForValue: 'self',
  discount: 0,
  firstName: '',
  mainCartNote: '',
  cities: [],
  countries: [],
  products: [],
  customers: [],
  filteredCustomers: [],
  selectedCustomer: '',
  cartItems: [],
  customerAnchorEl: null,
  discountAnchorEl: null,
  openCustomerPopper: false,
  openCustomerDialog: false,
  openCustomerDetailsDialog: false,
  placement: null,
  id: '',
  lastName: '',
  email: '',
  primaryMobileNumber: '',
  secondaryMobileNumber: '',
  loyaltyMember: false,
  nameHelper: '',
  emailHelper: '',
  phoneHelper: '',
  mobileHelper: '',
  nameError: false,
  emailError: false,
  phoneError: false,
  mobileError: false,
  address: '',
  region: '',
  city: 'Abuja',
  cityId: 6,
  country: '',
  countryId: 0,
  emergencyContactName: '',
  emergencyContactEmail: '',
  emergencyContactNumber: '',
  formError: false,
  serverError: false,
  isLoading: false,
  isSelected: '',
  openPaymentDialog: false,
  totalToPay: 0,
  isOffline: false,
};

export default initialState;