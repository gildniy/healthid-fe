import React from 'react';
import { mount } from 'enzyme';
import {
    Previous, PreviousDisabled, Next, NextDisabled
} from '../../../assets/SvgIcons/productDuplicateSvgs.js';

const props = {};

describe('test Svg Icons', () => {
  let wrapper;
  it('it renders PreviousIcon component', () => {
    wrapper = mount((
      <Previous {...props} />
    ));
    const svgIcon = wrapper.find('ForwardRef(SvgIcon)').length;
    expect(svgIcon).toBe(1);
  });
  it('it renders PreviousDisabledIcon component', () => {
    wrapper = mount((
      <PreviousDisabled {...props} />
    ));
    const svgIcon = wrapper.find('ForwardRef(SvgIcon)').length;
    expect(svgIcon).toBe(1);
  });
  it('it renders NextIcon component', () => {
    wrapper = mount((
      <Next {...props} />
    ));
    const svgIcon = wrapper.find('ForwardRef(SvgIcon)').length;
    expect(svgIcon).toBe(1);
  });
  it('it renders NextDisabledIcon component', () => {
    wrapper = mount((
      <NextDisabled {...props} />
    ));
    const svgIcon = wrapper.find('ForwardRef(SvgIcon)').length;
    expect(svgIcon).toBe(1);
  });
});
