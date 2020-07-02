import React from 'react';
import { mount } from 'enzyme';
import {
    StockCount, LowQuantityNotification, Export, ApproveStockIcon, VeryUnsatisfied,
    Unsatisfied, Neutral, Satisfied, VerySatisfied
} from '../../../assets/images/stock/StockIcons';

const props = {};

describe('test Svg Icons', () => {
  let wrapper;
  it('it renders StockCountIcon component', () => {
    wrapper = mount((
      <StockCount {...props} />
    ));
    const svgIcon = wrapper.find('ForwardRef(SvgIcon)').length;
    expect(svgIcon).toBe(1);
  });
  it('it renders LowQuantityNotificationIcon component', () => {
    wrapper = mount((
      <LowQuantityNotification {...props} />
    ));
    const svgIcon = wrapper.find('ForwardRef(SvgIcon)').length;
    expect(svgIcon).toBe(1);
  });
  it('it renders ExportIcon component', () => {
    wrapper = mount((
      <Export {...props} />
    ));
    const svgIcon = wrapper.find('ForwardRef(SvgIcon)').length;
    expect(svgIcon).toBe(1);
  });
  it('it renders ApproveStockIcon component', () => {
    wrapper = mount((
      <ApproveStockIcon {...props} />
    ));
    const svgIcon = wrapper.find('ForwardRef(SvgIcon)').length;
    expect(svgIcon).toBe(1);
  });
  it('it renders VeryUnsatisfiedIcon component', () => {
    wrapper = mount((
      <VeryUnsatisfied {...props} />
    ));
    const svgIcon = wrapper.find('ForwardRef(SvgIcon)').length;
    expect(svgIcon).toBe(1);
  });
  it('it renders UnsatisfiedIcon component', () => {
    wrapper = mount((
      <Unsatisfied {...props} />
    ));
    const svgIcon = wrapper.find('ForwardRef(SvgIcon)').length;
    expect(svgIcon).toBe(1);
  });
  it('it renders NeutralIcon component', () => {
    wrapper = mount((
      <Neutral {...props} />
    ));
    const svgIcon = wrapper.find('ForwardRef(SvgIcon)').length;
    expect(svgIcon).toBe(1);
  });
  it('it renders SatisfiedIcon component', () => {
    wrapper = mount((
      <Satisfied {...props} />
    ));
    const svgIcon = wrapper.find('ForwardRef(SvgIcon)').length;
    expect(svgIcon).toBe(1);
  });
  it('it renders VerySatisfiedIcon component', () => {
    wrapper = mount((
      <VerySatisfied {...props} />
    ));
    const svgIcon = wrapper.find('ForwardRef(SvgIcon)').length;
    expect(svgIcon).toBe(1);
  });
});
