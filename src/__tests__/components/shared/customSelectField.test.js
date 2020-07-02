import React from 'react';
import { mount } from 'enzyme';
import {
  CustomSelectField, NoOptionsMessage, Control, Option, Menu
} from '../../../components/shared/customSelectField';

describe('CustomSelectField', () => {
  describe('CustomSelectField', () => {
    const props = {
      onOptionChange: jest.fn(),
      classes: {},
      options: {},
      value: '',
      specificStyles: {},
      defaultValue: '',
      isLoading: false,
      disableUnderline: {},
      placeholder: '',
      label: ''
    }

    const wrapper = mount(<CustomSelectField {...props} />)
    it('renders Select', () => {
      expect(wrapper.find('Select').length).toEqual(1)
    })
  })

  describe('NoOptionsMessage', () => {
    const props = {
      selectProps: { classes: { noOptionsMessage: '' } },
      innerProps: {},
      children: []
    }

    const wrapper = mount(<NoOptionsMessage {...props} />)
    it('renders Typography', () => {
      expect(wrapper.find('ForwardRef(Typography)').length).toEqual(1)
    })
  })

  describe('Control', () => {
    const props = {
      children: [],
      innerProps: {},
      innerRef: {},
      selectProps: {
        classes: { input: '' },
        TextFieldProps: {},
        specificStyles: {},
        disableUnderline: {},
        label: [],
        value:{ label: 'one' }
      },
    }

    const wrapper = mount(<Control {...props} />)
    it('renders TextField', () => {
      expect(wrapper.find('ForwardRef(TextField)').length).toEqual(1)
    })
  })

  describe('Option', () => {
    const props = {
      isFocused: {},
      isSelected: {},
      innerProps: {},
      children: []
    }

    const wrapper = mount(<Option {...props} />)
    it('renders MenuItem at fontWeight 500', () => {
      expect(wrapper.find('ForwardRef(MenuItem)').length).toEqual(1)
    })

    it('renders MenuItem at fontWeight 400', () => {
      wrapper.setProps({ isSelected: null })
      expect(wrapper.find('ForwardRef(MenuItem)').length).toEqual(1)
    })
  })

  describe('Menu', () => {
    const props = {
      selectProps: { classes: { paper: '' } },
      innerProps: {},
      children: []
    }

    const wrapper = mount(<Menu {...props} />)
    it('renders Paper', () => {
      expect(wrapper.find('ForwardRef(Paper)').length).toEqual(1)
    })
  })

})
