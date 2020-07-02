import React from 'react';
import { mount, shallow } from 'enzyme';
import wait from 'waait';
import * as AppContext from '../../../../providers/stateProvider';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import * as moxios from 'moxios';
import UPLOAD_IMAGE from '../../../../mutations/uploadImage';
import UploadInvoice from '../../../../components/ordersAndSuppliers/Templates/decriptionTemplates/uploadInvoice';

const contextValues = { state: {
    logo: {logo:""},
    crop: "",
    DragOverImage:{
      fileName: '',
      imageFile: '',
      src: '',
      open: false
    }
  }, dispatch: jest.fn() };
jest.spyOn(AppContext, 'useStateValue').mockImplementation(() => contextValues);
describe('renders OrderDetailRender component', () => {
  beforeEach(() => {
    moxios.install();
    const useEffect = jest.spyOn(React, 'useEffect').mockImplementation(f => f());
  });

  afterEach(() => {
    moxios.uninstall();
  });
  describe(' Render ', () => {
    const notify = jest.fn();
    const props = {
      classes: { paper: '' },
      onClick: jest.fn(),
      order: {
        id: '8',
        orderNumber: '5h0cujrgl',
        sentStatus: false,
        createdAt: '2020-01-10T08:43:57.394222+00:00',
        status: 'complete order form',
        name: 'January new year order',
        closed: false,
        supplierorderdetailsSet: [
          {
            supplierOrderName: 'Eric Eric-new order',
            supplierOrderNumber: '7w76n2c2j-85z7puo6p',
            additionalNotes: 'some additional details',
            supplier: {
              id: '85z7puo6p',
              suppliersmetaSet: [
                {
                  creditDays: 0,
                  paymentTerms: 'CASH_ON_DELIVERY'
                }
              ]
            },
            deliveryDue: '2020-01-19',
            deliverTo: 'Lois Mclaughlin',
            createdAt: '2020-01-12T11:11:54.520897+00:00'
          },
        ],
        orderdetailsSet: [],
        invoice: null,
        user: null
      },
      supplierOrderFormId:"aw3diqmv1",
      handleCloseModal: jest.fn(),
      uploadImage: jest.fn(
        () => new Promise((resolve) => {
          const data = {
            addSupplier: {
              supplier: {
                name: 'name',
                supplierId: 1
              }
            }
          };
          const res = { data };
          return resolve(res);
        })
      ),
      filter: jest.fn()
    };
    const largeFile = [
      {
        name: 'eucerin',
        size: 1000000000,
        type: 'image/jpg',
        lastModified: ''
      }
    ];
    const uploadImage = {
      invoice: { id: '5' },
      message: 'hey'
    };
    const mocks = [
      {
        request: {
          query: UPLOAD_IMAGE,
          variables: { invoiceFile: 'Buck', orderId: 5 },
        },
        result: { data: { uploadImage } },
      },
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
            <UploadInvoice {...props} />
        </BrowserRouter>
      </MockedProvider>
    );
    it('should render for an open order', async () => {
      const notify = jest.fn();
      const Newprops = {
        state: {
          open: '',
          src: '',
          logo:{logo: ''},
          DragOverImage:{
            fileName: '',
            imageFile: '',
            src: '',
            open: false
          }
        },
        dragImage: jest.fn(),
        onSelectFile: jest.fn(),
        handleClose: jest.fn(),
        handleOnCropChange: jest.fn(),
        handleSave: jest.fn(),
      };
      const validFile = new File([new Blob()], 'image.jpg', {
        name: 'profile',
        size: 10000,
        type: 'image/jpg',
        lastModified: ''
      });
      const wrapper = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
          <BrowserRouter>
              <UploadInvoice {...props} />
          </BrowserRouter>
        </MockedProvider>
      );
      const fileContents = 'file contents';
      const readAsText = jest.fn();
      const readAsDataURL = jest.fn();
      const addEventListener = jest.fn((_, evtHandler) => { evtHandler(); });
      const dummyFileReader = {
        addEventListener, readAsDataURL, readAsText, result: fileContents
      };
      window.FileReader = jest.fn(() => dummyFileReader);
      wrapper.find('button[name="DialogUploadButton"]').simulate('click');
      wrapper.find('input[name="imageInput"]').simulate('change', { target: { files: [validFile] } });
      wrapper.find('button').at(0).simulate('click');
      wrapper.find('ForwardRef(Button)').at(1).simulate('click');
      expect(FileReader).toHaveBeenCalled();
    });
  });
});
