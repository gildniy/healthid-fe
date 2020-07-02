import React from 'react';
import { mount } from 'enzyme';
import { SalesBatchDialog } from '../../../components/sell/salesBatchDialog';
import { StateContext } from '../../../providers/stateProvider';

describe('SalesBatchDialog', () => {
  const props = {
    renderQuantity: jest.fn(),
    renderBatchQuantity: jest.fn()
  };

  const sell = {
    openSalesBatchDialog: true,
    openOutOfStockPopper: false,
    selectedProduct: {
      productName: 'Aboniki',
      productCategory: 'Beauty',
      batchInfo: [{
        id: 1,
        batchNo: 'OUT OF STOCK',
        batchQuantities: [{ quantityRemaining: 0 }]
      }],
      productbatchSet: [
        {
          id: '63fi3e31b',
          batchRef: 'BN20200430',
          unitCost: 2000,
          dateReceived: '2020-04-30',
          quantity: 20,
          expiryDate: '2020-04-30',
          status: 'IN_STOCK',
          supplier: { id: '7uun1s25v', name: 'Kipharma', __typename: 'SupplierType' },
          __typename: 'ProductBatchType'
        },
        {
          id: '149hjq3a9',
          batchRef: 'OUT OF STOCK',
          unitCost: 0,
          dateReceived: '2020-04-30',
          quantity: 99,
          expiryDate: '2099-01-01',
          status: 'IN_STOCK',
          supplier: { id: '7uun1s25v', name: 'Kipharma', __typename: 'SupplierType' },
          __typename: 'ProductBatchType'
        }
      ],
      sellingOutOfStock: false
    },
    batchesForCart: [{
      batchId: 1
    }]
  };

  const context = [{ sell }, jest.fn()];
  const outOfStockContext = [{ sell: {
    ...sell,
    sellingOutOfStock: true,
  }}, jest.fn()]

  const evnt = {
    currentTarget: <body />
  }

  const wrapper = mount(
    <StateContext.Provider value={context}>
      <SalesBatchDialog {...props} />
    </StateContext.Provider>
  );

  const outOfStockWrapper = mount(
    <StateContext.Provider value={outOfStockContext}>
      <SalesBatchDialog {...props} />
    </StateContext.Provider>
  );

  it('renders Dialog', () => {
    expect(wrapper.find('ForwardRef(Dialog)').length).toBe(1);
  });

  it('renders "SaleBatchHeader"', () => {
    const header = wrapper.find('SaleBatchHeader');
    expect(header.length).toBe(1);
  });

  it('renders "SaleBatchList"', () => {
    const paper = wrapper.find('SaleBatchList');
    expect(paper.length).toBe(1);
  });
  it('handles SelectedCheckBox', () => {
    wrapper.find('SaleBatchList').props().handleSelectedCheckBox();
    expect(context[1]).toHaveBeenCalled;
  });
  it('handles isBatchSelected', () => {
    wrapper.find('SaleBatchList').props().handleBatchInputChange();
    expect(context[1]).toHaveBeenCalled;
  });
  it('handles ClickToAddProduct', () => {
    wrapper.find('SaleBatchHeader').props().handleClickToAddProduct();
    expect(context[1]).toHaveBeenCalled;
  });
  it('handles BatchDialogClose', () => {
    wrapper.find('SaleBatchHeader').props().handleBatchDialogClose();
    expect(context[1]).toHaveBeenCalled;
  });
  it('handles adding out of stock batch', () => {
    wrapper.find('SaleBatchHeader').props().handleSellFromOutOfStock(evnt);
    expect(context[1]).toHaveBeenCalled;
  });

  it('handles removing out of stock batch', () => {
    outOfStockWrapper.find('SaleBatchHeader').props().handleSellFromOutOfStock(evnt);
    expect(outOfStockContext[1]).toHaveBeenCalled;
  });
});
