import React from 'react';
import { shallow } from 'enzyme';
import { EditQuantityAndSupplier } from '../../../../containers/orders/Modal/EditQuantityAndSupplier';

const firstProps = {
  numSelected: 1,
  selectedRow: [{
    name: 'something',
    sku: 234,
    quantity: 50,
    currentSupplierId: 'someone',
    currentSupplierName: 'ACI Ltd',
    preferredSupplierId: 'anything',
    preferredSupplierName: 'someone',
    backupSupplierId: 'someone',
    backupSupplierName: 'someone',
  }],
  deselect: jest.fn(),
  updateQuantityAndSupplier: jest.fn(() => Promise.resolve())
};

const secondProps = {
  selectedRow: [],
  updateQuantityAndSupplier: jest.fn(() => Promise.reject({ error: {  message: 'Server error' } }))
};

const thirdProps = {
  selectedRow: [],
  updateQuantityAndSupplier: jest.fn(() => Promise.reject({ error: {  message: 'Server error' } }))
};

describe('Test Edit Quantity And Supplier Modal Component - Positive Case', () => {
  const wrapper = shallow(<EditQuantityAndSupplier {...firstProps} />);
  it('should render the component', () => {
    expect((wrapper).exists()).toBeTruthy();
  });

  it('should open the modal', () => {
    const editButton = wrapper.find('WithStyles(Component)').at(0);
    editButton.props().onClickHandler();
    const paper = wrapper.find('WithStyles(ForwardRef(Paper))');
    expect(paper.length).toEqual(1);
  });

  it('should close the modal', () => {
    const closeButton = wrapper.find('WithStyles(Component)').at(2);
    closeButton.props().onClickHandler();
  });

  it('should handle quantity change', () => {
    const event = {
      target: { value: '100' }
    };

    const textField = wrapper.find('WithStyles(ForwardRef(TextField))');
    textField.simulate('change', event);
  });

  it('should handle supplier change', () => {
    const event = {
      target: { value: 'sup001' }
    };

    const option = wrapper.find('WithStyles(ForwardRef(Select))');
    option.simulate('change', event);
  });

  it('should save products', () => {
    const saveButton = wrapper.find('WithStyles(Component)').at(1);
    saveButton.props().onClickHandler();
  });
});

describe('Test Orders Products Table Component - Negative Case - 1', () => {
  const wrapper = shallow(<EditQuantityAndSupplier {...secondProps} />);
  it('should render the component', () => {
    expect((wrapper).exists()).toBeTruthy();
  });

  it('should save products', () => {
    const saveButton = wrapper.find('WithStyles(Component)').at(1);
    saveButton.props().onClickHandler();
  });
});

describe('Test Orders Products Table Component - Negative Case - 3', () => {
  const wrapper = shallow(<EditQuantityAndSupplier {...thirdProps} />);
  it('should render the component', () => {
    expect((wrapper).exists()).toBeTruthy();
  });

  it('should handle supplier change', () => {
    const event = {
      target: { value: 'sup001' }
    };

    const option = wrapper.find('WithStyles(ForwardRef(Select))');
    option.simulate('change', event);
  });

  it('should save products', () => {
    const saveButton = wrapper.find('WithStyles(Component)').at(1);
    saveButton.props().onClickHandler();
  });
});
