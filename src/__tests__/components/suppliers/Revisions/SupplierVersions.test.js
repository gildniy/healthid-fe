import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import * as moxios from 'moxios';
import PropTypes from 'prop-types';
import { SupplierVersions } from '../../../../components/suppliers/Revisions/SupplierVersions';
import GET_VERSIONS from '../../../../queries/getVersions';
import '../../../../../__mocks__/window';

import { StateContext } from '../../../../providers/stateProvider';

describe('Render Add Supplier component', () => {
  SupplierVersions.contextTypes = [
    PropTypes.string,
    PropTypes.func
  ];

  const context = ['kitty', jest.fn()];

  jest.useFakeTimers();
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  const props = {
    session: {
      me: {
        mobileNumber: '254123123123',
        email: 'user@gmail.com',
        username: 'user',
        role: { name: 'Master Admin' },
        activeOutlet: {
          outletpreference: {
            outletTimezone: { name: 'Africa/Lagos' }
          }
        }
      }
    },
    match: {
      params: {
        id: 'x'
      }
    },
    classes: {},
    approveVersion: jest.fn(
      () => new Promise((resolve) => {
        const data = {
          approveEditRequest: {
            message: 'Version approved!'
          }
        };
        const res = { data };
        return resolve(res);
      })
    ),
    history: jest.fn()
  };

  const mocks = [
    {
      request: {
        query: GET_VERSIONS
      },
      result: {
        data: {
          totalNumberOfSuppliers: 10
        },
        error: 'x'
      }
    }
  ];

  const wrapper = shallow(<SupplierVersions {...props} />, { context });

  it('renders data upon successful view', () => {
    const wrapperMount = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <StateContext.Provider value={context}>
            <SupplierVersions {...props} />
          </StateContext.Provider>
        </BrowserRouter>
      </MockedProvider>
    );
    wait(0);
    expect(wrapperMount.length).toBe(1);
  });

  it('calls toggleDialogView', () => {
    wrapper.instance().toggleDialogView();
    expect(wrapper.state().isDialogOpen).toBeTruthy();
  });

  it('calls toggleDialogView', () => {
    wrapper.instance().toggleDialogView();
    expect(wrapper.state().isDialogOpen).toBeFalsy();
  });

  it('calls handleChangePage', () => {
    const newPage = 2;
    wrapper.instance().handleChangePage('', newPage);
    expect(wrapper.state().currentPage).toEqual(newPage + 1);
  });

  it('calls handleChangeRowsPerPage', () => {
    const rowsPerPage = 25;
    wrapper.instance().handleChangeRowsPerPage({
      target: {
        value: rowsPerPage
      }
    });
    expect(wrapper.state().currentPageCount).toEqual(rowsPerPage);
  });

  it('calls handleApproveVersion', () => {
    wrapper.instance().handleApproveVersion(1);
    expect(wrapper.state().isDialogOpen).toBeFalsy();
  });

  it('calls handleApproveVersion', () => {
    const propsApproveError = props;
    propsApproveError.approveVersion = jest.fn(
      () => new Promise((reject) => {
        const error = {
          graphQLErrors: [{
            message: 'Version approval failed!'
          }]
        };
        return reject(error);
      })
    );
    const wrapperApproveError = shallow(<SupplierVersions {...propsApproveError} />, { context });
    wrapperApproveError.instance().handleApproveVersion(1);
    expect(props.history).not.toHaveBeenCalled();
  });

  it('calls handleRejectVersion', () => {
    wrapper.instance().handleRejectVersion();
    expect(props.history).not.toHaveBeenCalled();
  });
});
