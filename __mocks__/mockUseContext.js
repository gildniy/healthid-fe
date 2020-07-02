import * as StateContext from '../src/providers/stateProvider';

const contextValues = { state: { isActive: 'grid1' }, dispatch: jest.fn() };
const contextMock = jest
  .spyOn(StateContext, 'useStateValue')
  .mockImplementation(() => contextValues);
export default contextMock;
