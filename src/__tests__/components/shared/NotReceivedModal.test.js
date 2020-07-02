import React from 'react';
import { shallow } from 'enzyme';
import NotReceivedModal from '../../../components/shared/batch/NotReceivedModal';

describe('NotReceivedModal', () => {
  let wrapper;
  const state = {
    supplier: '',
  };

  const singleBatch = {
    productId: '',
    productName: '',
    dateReceived: '',
    batchNumber: '',
    supplier: '',
    supplierId: '',
    expiryDate: '',
    costPerItem: '',
    quantityReceived: '',
    deliveryPromptness: '',
    serviceQuality: '',
    notes: '',
  };

  it('Render successfully ', () => {
    wrapper = shallow(
      <NotReceivedModal state={state} singleBatch={singleBatch} />
    );
    expect(wrapper).toHaveLength(1);
  });
});
