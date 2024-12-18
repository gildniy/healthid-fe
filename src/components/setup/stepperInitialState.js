const initialState = {
  activeStep: 0,
  checked: false,
  isAcknowledged: false,
  isLoading: false,
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  secondaryEmail: '',
  mobileNumber: '',
  secondaryPhoneNumber: '',
  legalName: '',
  tradingName: '',
  businessEmail: '',
  addressLine1: '',
  addressLine2: '',
  phoneNumber: '',
  city: '',
  country: 'Nigeria',
  localGovernmentArea: '',
  website: '',
  twitter: '',
  instagram: '',
  logo: '',
  facebook: '',
  serverError: '',
  formError: false,
  isError: false,
  src: '',
  crop: {
    x: 50,
    y: 50,
    width: 50,
    height: 50,
  },
  fileName: '',
  originalImageFile: '',
  croppedImage: '',
  open: false,
  businessId: '',
  cities: [],
  countries: [],
  dateLaunched: '2019-01-01',
  outletName: '',
  outletTaxNumber: '',
  outletType: 'warehouse',
  kindId: 1,
  outletsActive: false,
  outletIsLoading: false,
  unhideMainButtons: true,
  receiptOpen: false,
  amountToPay: true,
  barcode: true,
  cashier: true,
  changeDue: true,
  discountTotal: true,
  loyalty: true,
  loyaltyBalance: true,
  loyaltyEarned: true,
  outletId: NaN,
  receiptId: NaN,
  registerId: NaN,
  registerName: '',
  numberOfRegisters: 0,
  registerHidden: true,
  clickedOutlet: 0,
  purchaseTotal: true,
  receipt: true,
  receiptNo: true,
  subtotal: true,
  totalTax: true,
  outletSet: [],
  edittingOutlet: false,
  // step 4: Add User(s)
  jobTitle: '',
  startingDate: '2019-01-01',
  target: '',
  fName: '',
  lName: '',
  userEmail: '',
  userUsername: '',
  phone: '',
  roleId: '',
  outlet: '',
  userId: '',
  roles: [],
  outlets: [],
  editMode: false,
  users: [],
  showUsers: true,
  phoneError: false,
  usernameError: false,
  emailError: false,
  boxChecked: false,
};

export default initialState;
