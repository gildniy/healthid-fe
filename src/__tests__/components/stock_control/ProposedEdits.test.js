import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';

import { ProposedEdits } from '../../../components/stock_control/ProposedEdits';
import { GET_ALL_PROPOSED_EDITS } from '../../../queries/stockProducts';

describe('ProposedEdits ', () => {
  const props = {
    classes: {}
  };
  const noProposalsMock = [
    {
      request: {
        query: GET_ALL_PROPOSED_EDITS
      },
      result: {
        data: {
          proposedQuantityEdits: []
        }
      }
    }
  ];

  const mocks = [
    {
      request: {
        query: GET_ALL_PROPOSED_EDITS
      },
      result: {
        data: {
          proposedQuantityEdits: [
            {
              proposedBy: {
                username: 'stanleyokwii'
              },
              isApproved: false,
              quantityReceived: 369,
              batch: {
                batchNo: 'BN201905301311-4vfdidwwg',
                quantity: 435,
                proposedQuantity: 43,
                dateReceived: '2019-12-03',
                id: '8rjw4dh2j',
                product: {
                  globalUpc: 1234,
                  productName: 'panadol2',
                  id: '7'
                },
              }
            },
            {
              proposedBy: {
                username: 'stanleyokwii'
              },
              isApproved: false,
              quantityReceived: 378,
              batch: {
                batchNo: 'BN201906141013-88s1ka686',
                quantity: 37,
                proposedQuantity: 453,
                dateReceived: '2019-12-03',
                id: '2rpj8yl1u',
                product: {
                  globalUpc: 1234,
                  productName: 'Pandol',
                  id: '11'
                },
              }
            }
          ]
        }
      }
    }
  ];

  it('renders without crashing', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProposedEdits {...props} />
      </MockedProvider>
    );

    expect(wrapper.find('ContentLoader').length).toEqual(1);
    await wait(0);
    wrapper.update();
  });

  it('renders no proposed products ', async () => {
    const noProposalWrapper = mount(
      <MockedProvider mocks={noProposalsMock} addTypename={false}>
        <ProposedEdits {...props} />
      </MockedProvider>
    );
    expect(noProposalWrapper.find('ContentLoader').length).toEqual(1);
    await wait(0);
    noProposalWrapper.update();
    expect(noProposalWrapper.find('div').length).toEqual(1);
    expect(noProposalWrapper.find('span').contains('No changes to approve')).toBe(true);
  });

  it('responds to onClick actions ', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProposedEdits {...props} />
      </MockedProvider>
    );
    const event = {
      target: { value: '70' }
    };

    expect(wrapper.find('ContentLoader').length).toEqual(1);
    await wait(0);
    wrapper.update();
    wrapper.find('[data-batchid="2rpj8yl1u"]').forEach((button) => {
      button.simulate('click', event);
    });
  });
});
