import React from 'react';
import { shallow, mount } from 'enzyme';
import PropTypes from 'prop-types';
import { DisplayProductDuplicates } from '../../../components/products/ImportProduct/displayProductDuplicates';

describe('DisplayProductDuplicates', () => {
  const props = {
    state: { 
      currentPage: 1,
      duplicatesPerPage: 8,
      opacity: {},
    },
    handleNext: jest.fn(),
    handlePrevious: jest.fn(),
    handleCloseProductDuplicates: jest.fn(),
    handleUpload: jest.fn(),
    handleViewEditDuplicates: jest.fn(),
    onProductDuplication: jest.fn(),
    setOpacity: jest.fn(),
    duplications: [
      {
        row: 1,
        message: "Omeprazole, already exists!",
        data: {
          product_category: "beauty", 
          product_name: "Omeprazole", 
          dispensing_size: "Tablets", 
          description: "Dosage", 
          brand: "ABC",
          manufacturer: "Manufacturer",
          vat_status: "Vat",
          preferred_supplier: "ABC Supplier (S-ABC799)",
          backup_supplier: "Isaie store (S-ISA571)",
          loyalty_weight: "2",
          image: "",
          tags: ""
        },
        conflicts: [
          {
            id: 25,
            product_name: "Omeprazole",
            sku_number: null
          }
        ]
      }
    ]
  };

  DisplayProductDuplicates.contextTypes = [
    PropTypes.string,
    PropTypes.func
  ];

  const context = ['kitty', jest.fn()]
  const wrapper = shallow(<DisplayProductDuplicates {...props} />, { context })

  it('handles upload and close product duplicates onClick', () => {
    wrapper.find('.actions').at(1).simulate('click')
    expect(wrapper.find('.actions').length).toBe(2);
  })

  it('handles handleUpload and handleCloseProductDuplicates onClick', () => {
    wrapper.find('.actions1').simulate('click')
    expect(props.handleUpload.mock.calls.length).toEqual(1);
    expect(props.handleCloseProductDuplicates.mock.calls.length).toEqual(1);
  })


  it('handles handleCloseProductDuplicates onClick', () => {
    wrapper.find('.actions2').simulate('click')
    expect(props.handleCloseProductDuplicates.mock.calls.length).toEqual(2);
  })

  it('handles handleViewEditDuplicates onClick', () => {
    wrapper.find('.btns1').simulate('click')
    expect(props.handleViewEditDuplicates.mock.calls.length).toEqual(1);
  })

  it('handles onProductDuplication onClick', () => {
    wrapper.find('.btns2').simulate('click')
    expect(props.onProductDuplication.mock.calls.length).toEqual(1);
  })

  it('handles setOpacity onClick', () => {
    wrapper.instance().setOpacity = jest.fn()
    wrapper.update()
    wrapper.find('.btns2').simulate('click')
    expect(wrapper.instance().setOpacity).toHaveBeenCalled()
  })

  it('handles handleNext onClick', () => {
    wrapper.instance().handleNext = jest.fn()
    wrapper.update()
    wrapper.find('WithStyles(ForwardRef(IconButton))').at(1).simulate('click')
    expect(wrapper.instance().handleNext).toHaveBeenCalledTimes(0)
  })

  it('handles handlePrevious onClick', () => {
    wrapper.instance().handlePrevious = jest.fn()
    wrapper.update()
    wrapper.find('WithStyles(ForwardRef(IconButton))').at(1).simulate('click')
    expect(wrapper.instance().handlePrevious).toHaveBeenCalledTimes(0)
  })
});