const countriesReducer = (countries, action) => {
  switch (action.type) {
  case 'SET_COUNTRIES':
    return [
      ...countries,
      ...action.payload
    ];
  default:
    return countries;
  }
};

export default countriesReducer;
