import React from 'react';
import { shallow, mount } from 'enzyme';
import ProductBatchInformation from '../../../components/shared/batch/productBatchForm';

describe('Product Batch Form', () => {
 let useEffect ;
 let wrapper;
  const state = {
    errorText: '',
    supplier: '',
    active: '',
    searching: ''
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
  beforeEach(() => {
    useEffect = jest.spyOn(React, 'useEffect').mockImplementation(f => f());
  });

  it('Render successfully ', () => {
    wrapper = shallow(
      <ProductBatchInformation state={state} singleBatch={singleBatch} />
    );
    expect(wrapper).toHaveLength(1);
  });
});
