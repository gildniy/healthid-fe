import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { ApolloProvider } from 'react-apollo';
import { createMockClient } from 'mock-apollo-client';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import APPROVE_PROPOSED_EDITS from '../../../mutations/approveProposedEdits';
import { ApproveProposedEdits } from '../../../components/products/proposedEdits/ApproveProposedEdits';
import { StateContext } from '../../../providers/stateProvider';

const context = ['kitty', jest.fn()];

ApproveProposedEdits.contextTypes = [
  PropTypes.string,
  PropTypes.func
];
const props = {
  history: { push: jest.fn() },
  approveEdits: jest.fn(() => Promise.resolve({ data: { message: 'success' } })),
  handleEditApproval: jest.fn(),
  edit: {
    id: '2803',
    productName: 'paraceta test one',
    productCategory: {
      id: '545',
      name: 'MEDICATED CREAMS'
    },
    dispensingSize: null,
    skuNumber: '002803',
    description: 'first treatment people try for mild to moderate pain',
    brand: 'ventolinllke',
    manufacturer: 'Harmon Northrop',
    vatStatus: true,
    salesPrice: 1000.0,
    createdAt: '2020-02-11T11:37:50.768264+00:00',
    reorderPoint: 6,
    reorderMax: 12,
    nearestExpiryDate: '2030-02-05',
    preferredSupplier: {
      id: '21omk8wcg',
      name: "Cozesky int'l ltd"
    },
    backupSupplier: {
      id: '21omk8wcg',
      name: "Cozesky int'l ltd"
    },
    tags: [
      'painkillers',
      'panadol',
      'Best'
    ],
    isApproved: false,
    markup: 25,
    unitCost: 0,
    loyaltyWeight: 2,
    business: {
      outletSet: [
        {
          outletpreference: {
            outletCurrency: {
              symbol: '₦'
            }
          }
        }
      ]
    },
    parent: {
      id: '2680',
      batchInfo: [
        {
          id: '3lkvashho',
          batchNo: 'BN202002050549-1ldzogip6',
          supplier: {
            id: 'pp99alzdm',
            name: 'Angelic stores'
          },
          dateReceived: '2020-02-05',
          quantity: 11,
          expiryDate: '2030-02-05',
          unitCost: 100.0
        },
        {
          id: '7goeomn4j',
          batchNo: 'BN202002050548-9i0tfspdb',
          supplier: {
            id: 'pp99alzdm',
            name: 'Angelic stores'
          },
          dateReceived: '2020-02-05',
          quantity: 0,
          expiryDate: '2030-02-05',
          unitCost: 100.0
        }
      ]
    },
    quantityInStock: 0,
    image: 'https://res.cloudinary.com/dojaopytm/image/upload/v1558444184/productPlaceholder.png'
  },
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
      activeOutlet: {
        outletpreference: {
          outletTimezone: {
            name: 'Africa/Nairobi'
          }
        }
      }
    }
  }
};

describe('testing the Query component', () => {
  const generate = async (allProps, mocks, success) => {
    const mockClient = createMockClient();
    if (success) {
      mockClient.setRequestHandler(
        APPROVE_PROPOSED_EDITS,
        () => Promise.resolve(mocks)
      );
    } else {
      mockClient.setRequestHandler(
        APPROVE_PROPOSED_EDITS,
        () => Promise.reject(mocks)
      );
    }

    const wrapper = mount(
      <ApolloProvider client={mockClient}>
        <StateContext.Provider value={context}>
          <BrowserRouter>
            <ApproveProposedEdits {...allProps} />
          </BrowserRouter>
        </StateContext.Provider>
      </ApolloProvider>
    );
    return wrapper;
  };
  it('should render the component successfully', async () => {
    const mocks = {
      data: {
        message: 'success',
      }
    };
    const wrapper = await generate(props, mocks, true);
    await wait(0);
    expect(wrapper.length).toBe(1);
  });

  it('should call handleEditApproval function', async () => {
    const mocks = {
      data: {
        message: 'success',
      }
    };
    const wrapper1 = await generate(props, mocks, true);
    const { props: oldProps } = wrapper1.instance();
    wrapper1.setProps({ ...oldProps, history: { push: jest.fn() }, handleEditApproval: jest.fn() });
    const wrapper = wrapper1.find('ApproveProposedEdits');
    wrapper.instance().handleEditApproval = jest.fn();
    const approveButton = wrapper.find('button[name="approve"]');
    approveButton.simulate('click');
    await wait(0);
    wrapper.update();
    expect(wrapper.props().history.push).toHaveBeenCalledWith('/products/proposed-edits');
  });

  it('should handle error approving the edits', async () => {
    const approveEdits = jest.fn(
      () => new Promise((resolve, reject) => {
        const data = {
          error: new Error('gpl errors')
        };
        const error = { data };
        return reject(error);
      })
    );
    const mocks = {
      error: {
        message: new Error('gpl error'),
      }
    };
    const wrapper2 = await generate(
      {
        ...props,
        approveEdits,
        history: { push: jest.fn() }
      },
      mocks, false
    );
    const { props: oldProps } = wrapper2.instance();
    wrapper2.setProps({
      ...oldProps
    });
    const wrapper3 = wrapper2.find('ApproveProposedEdits');
    wrapper3.instance().handleEditApproval = jest.fn();
    const approveButton = wrapper3.find('button[name="approve"]');
    approveButton.simulate('click');
    await wait(0);
    wrapper3.update();
    expect(wrapper3.props().history.push).toHaveBeenCalledTimes(0);
  });
});
