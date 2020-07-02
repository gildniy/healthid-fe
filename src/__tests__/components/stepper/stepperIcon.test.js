import React from 'react';
import { shallow, mount } from 'enzyme';
import StepperIcon from '../../../components/setup/stepperIcon';

const props = {
  active: true,
  completed: false,
  classes: { class: {} }
}

describe('StepperIcon', () => {
  const wrapper = mount(<StepperIcon {...props} />);

  it('renders without crashing', () => {
    expect(wrapper.find('WithStyles(ForwardRef(Grid))').length).toBe(2)
  })

  it('renders "CheckCircle" icon on step complete', () => {
    wrapper.setProps({ completed: true, active: false })
    expect(wrapper.find('CheckCircleIcon').length).toBe(1)
  })
})


