import React from 'react';
import { mount } from 'enzyme';
import {
  NotesIcon, UserIcon, TrashIcon, ArchieveIcon, PauseIcon, RetrieveIcon,
  CautionIcon, CaretUpIcon, CaretDownIcon, Previous, PreviousDisabled, Next, NextDisabled
} from '../../../assets/SvgIcons/sellScreenSvgs';

const props = {};

describe('test Svg Icons', () => {
  let wrapper;
  it('it renders NotesIcon component', () => {
    wrapper = mount((
      <NotesIcon {...props} />
    ));
    const svgIcon = wrapper.find('ForwardRef(SvgIcon)').length;
    expect(svgIcon).toBe(1);
  });
  it('it renders UserIcon component', () => {
    wrapper = mount((
      <UserIcon {...props} />
    ));
    const svgIcon = wrapper.find('ForwardRef(SvgIcon)').length;
    expect(svgIcon).toBe(1);
  });
  it('it renders TrashIcon component', () => {
    wrapper = mount((
      <TrashIcon {...props} />
    ));
    const svgIcon = wrapper.find('ForwardRef(SvgIcon)').length;
    expect(svgIcon).toBe(1);
  });
  it('it renders ArchieveIcon component', () => {
    wrapper = mount((
      <ArchieveIcon {...props} />
    ));
    const svgIcon = wrapper.find('ForwardRef(SvgIcon)').length;
    expect(svgIcon).toBe(1);
  });
  it('it renders PauseIcon component', () => {
    wrapper = mount((
      <PauseIcon {...props} />
    ));
    const svgIcon = wrapper.find('ForwardRef(SvgIcon)').length;
    expect(svgIcon).toBe(1);
  });
  it('it renders RetrieveIcon component', () => {
    wrapper = mount((
      <RetrieveIcon {...props} />
    ));
    const svgIcon = wrapper.find('ForwardRef(SvgIcon)').length;
    expect(svgIcon).toBe(1);
  });
  it('it renders CautionIcon component', () => {
    wrapper = mount((
      <CautionIcon {...props} />
    ));
    const svgIcon = wrapper.find('ForwardRef(SvgIcon)').length;
    expect(svgIcon).toBe(1);
  });
  it('it renders CaretUpIcon component', () => {
    wrapper = mount((
      <CaretUpIcon {...props} />
    ));
    const svgIcon = wrapper.find('ForwardRef(SvgIcon)').length;
    expect(svgIcon).toBe(1);
  });
  it('it renders CaretDownIcon component', () => {
    wrapper = mount((
      <CaretDownIcon {...props} />
    ));
    const svgIcon = wrapper.find('ForwardRef(SvgIcon)').length;
    expect(svgIcon).toBe(1);
  });
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
