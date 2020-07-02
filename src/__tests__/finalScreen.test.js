import React from 'react';
import { shallow } from 'enzyme';
import _ from '../../__mocks__/mockUseContext';
import { FinalScreen } from '../components/setup/finalScreen';

beforeEach(() => {
  const useEffect = jest.spyOn(React, "useEffect").mockImplementation(f => f());
})

describe('Render Final Screen component', () => {
  const props = {
    history: { push: jest.fn() },
    state: {}
  }
  const wrapper = shallow(<FinalScreen {...props} />);

  it('renders four image elements ', () => {
    const imageElements = wrapper.find('img').length;
    expect(imageElements).toBe(4);
  });

  it('renders all buttons', () => {
    expect(wrapper.find('WithStyles(ForwardRef(Button))').length).toBe(4)
  });

  it('calls history.push to set route', () => {
    wrapper.find('WithStyles(ForwardRef(Button))').at(0).simulate('click')
    expect(props.history.push).toBeCalledTimes(1);
  });
});
