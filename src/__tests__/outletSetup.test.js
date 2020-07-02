import React from 'react';
import { shallow } from 'enzyme';
import { OutletSetUp } from '../components/setup/outletSetup';

const state = {
  localGovernmentArea: '',
  city: '',
  country: 'Nigeria',
  checked: true,
  countries: [{ id: 'id', name: 'name' }],
  outletType: 'storefront',
  outletName: 'outletName',
  addressLine1: 'addressLine1',
  addressLine2: '',
  phoneNumber: 123,
  dateLaunched: '2019-12-13',
  registerName: 'registerName',
  formError: true,
  outletsActive: false,
  outletIsLoading: false,
  edittingOutlet: false,
}
const props = {
  state,
  handleInPutChange: jest.fn(),
  errorHandler: jest.fn(),
  serverErrorHandler: jest.fn(),
  handleReceiptTemplateOpen: jest.fn(),
  handleReceiptTemplateClose: jest.fn(),
  handleTemplateOnChange: jest.fn(),
  handleAddOutletButton: jest.fn(),
  handleAddNewOutletButton: jest.fn(),
  toggleRegisterDisplay: jest.fn(),
  handleOutletEdit: jest.fn(),
  handleOutletDelete: jest.fn(),
  handleCheckboxChange: jest.fn(),
  classes: {},
};

describe('Render outletSetup component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<OutletSetUp {...props} />);
  })
  it('renders all text fields', () => {
    const textFields = wrapper.find('WithStyles(ForwardRef(TextField))').length;
    expect(textFields).toBe(9);
  });

  it('renders error with no OutletName', () => {
    wrapper.setProps({
      ...props,
      state: { ...state, outletName: '' }
    });
    expect(wrapper.find('WithStyles(ForwardRef(TextField))').at(0).props()["error"]).toBe(true);
  });

  it('renders error with no addressLine1', () => {
    wrapper.setProps({
      ...props,
      state: { ...state, addressLine1: '' }
    });
    expect(wrapper.find('WithStyles(ForwardRef(TextField))').at(1).props()["error"]).toBe(true);
  });

  it('renders error with no phoneNumber', () => {
    wrapper.setProps({
      ...props,
      state: { ...state, phoneNumber: null }
    });
    expect(wrapper.find('WithStyles(ForwardRef(TextField))').at(6).props()["error"]).toBe(true);
  });

  it('renders error with no dateLaunched', () => {
    wrapper.setProps({
      ...props,
      state: { ...state, dateLaunched: '' }
    });
    expect(wrapper.find('WithStyles(ForwardRef(TextField))').at(7).props()["error"]).toBe(true);
  });

  it('renders error with no registerName', () => {
    wrapper.setProps({
      ...props,
      state: { ...state, registerName: '' }
    });
    expect(wrapper.find('WithStyles(ForwardRef(TextField))').at(8).props()["error"]).toBe(true);
  });

  it('renders Loader on outlet Loading', () => {
    wrapper.setProps({
      ...props,
      state: { ...state, outletIsLoading: true }
    });
    expect(wrapper.find('WithStyles(Loader)').length).toBe(1);
  });

  it('changes Button text on edittingOutlet true', () => {
    wrapper.setProps({
      ...props,
      state: {
        ...state, edittingOutlet: true
      }
    });
    expect(wrapper.find('WithStyles(ForwardRef(Button))').prop("children")).toEqual('done');
  });

  it('renders OutletList component', () => {
    wrapper.setProps({ state: { outletsActive: true } })
    expect(wrapper.find('OutletList').length).toBe(1);
  });

  it('should have default handleInPutChange', () => {
    expect(OutletSetUp.defaultProps.handleInPutChange).toBeDefined();
  });
});
