import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { ApolloProvider } from 'react-apollo';
import { createMockClient } from 'mock-apollo-client';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import GET_PROPOSED_EDIT from '../../../queries/productsQueries/getProposedEdit';
import { ApproveProposedEditsContainer } from '../../../container/products/ApproveProposedEdits';
import { StateContext } from '../../../providers/stateProvider';

const context = ['kitty', jest.fn()];

ApproveProposedEditsContainer.contextTypes = [
  PropTypes.string,
  PropTypes.func
];
const props = {
  history: { push: jest.fn() },
  match: {
    params: {
      id: 7
    }
  },
  session: {
    me: {
      role: {
        name: 'Master Admin'
      },
    }
  }
};


describe('proposedEdit container', () => {
  const generate = async (allProps, mocks, success) => {
    const mockClient = createMockClient();
    if (success) {
      mockClient.setRequestHandler(
        GET_PROPOSED_EDIT,
        () => Promise.resolve(mocks)
      );
    } else {
      mockClient.setRequestHandler(
        GET_PROPOSED_EDIT,
        () => Promise.reject(mocks)
      );
    }

    const wrapper = mount(
      <ApolloProvider client={mockClient}>
        <StateContext.Provider value={context}>
          <BrowserRouter>
            <ApproveProposedEditsContainer {...allProps} />
          </BrowserRouter>
        </StateContext.Provider>
      </ApolloProvider>
    );
    return wrapper;
  };
  it('should render the component successfully', async () => {
    const mocks = {
      data: {
        message: 'success'
      }
    };
    const wrapper = await generate({
      session: props.session,
      history: props.history,
      match: props.match
    }, mocks, true);
    await wait(1);
    expect(wrapper.update().find('ApproveProposedEditsContainer').length).toBe(1);
  });

  it('should handle the error', async () => {
    const mocks = {
      error: {
        message: new Error('gql error')
      }
    };
    await wait(1);
    const wrapper = await generate(props, mocks, false);
    await wait(1);
    expect(wrapper.update().find('[name="error"]').length).toBe(1);
  });
});
