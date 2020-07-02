import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SalesHistoryDetail  } from '../../../../components/sell/salesHistory/salesHistoryDetail';
import SalesHistoryTable from '../../../../components/sell/salesHistory/soldProductsTable';
import SaleElements from '../../../../components/sell/salesHistory/saleElements';
import { StateContext } from '../../../../providers/stateProvider';

const context = ['kitty', jest.fn()];

SalesHistoryDetail.contextTypes = [
  PropTypes.string,
  PropTypes.func
];

const props = {
    match: { params: { id: 736 } },
    "saleHistory": {
      "id": "61",
      "createdAt": "2020-02-28T09:03:52.378304+00:00",
      "salesPerson": {
        "id": "5g3xrnwch",
        "firstName": "Placide",
        "lastName": "IRANDORA",
        "role": {
          "id": "adm000001",
          "name": "Master Admin"
        }
      },
      "receipt": {
        "id": "97bso2xnh",
        "barcode": "http://res.cloudinary.com/health-id/image/upload/v1582880641/guw1c8fyn3mwk83dphjf.png",
        "receiptNo": "RN793-61",
        "purchaseTotal": 26.0,
        "amountToPay": 26766.0,
        "subTotal": 26.0,
        "discountTotal": 0.0,
        "changeDue": 18234.0,
        "cashier": {
          "id": "5g3xrnwch",
          "firstName": "Placide",
          "lastName": "IRANDORA",
          "username": "placideirandora"
        }
      },
      "amountToPay": 26766.0,
      "customer": {
        "firstName": "bahati",
        "lastName": "robben"
      },
      "outlet": {
        "id": "7",
        "name": "Victoria Pharmacy",
        "phoneNumber": null,
        "business": {
          "id": "emfvd605w",
          "addressLine1": "Victoria Island, Street 001",
          "phoneNumber": "+23434890234"
        },
        "city": {
          "id": "4",
          "name": "Lagos",
          "country": {
            "name": "Nigeria"
          }
        },
        "outletpreference": {
          "id": "2zdpnu5ea",
          "outletCurrency": {
            "id": "4jatbw5sm",
            "symbol": "₦"
          }
        }
      },
      "saledetailSet": [
        {
          "id": "86",
          "product": {
            "id": "16",
            "productName": "ABSOLUTE MAKEUP CLEANSING WIPES",
            "quantityInStock": 15,
            "dispensingSize": {
              "id": "14",
              "name": "NULL"
            }
          },
          "quantity": 1,
          "discount": 0.0,
          "price": 1500.0,
          "note": null
        },
        {
          "id": "87",
          "product": {
            "id": "16",
            "productName": "ABSOLUTE MAKEUP CLEANSING WIPES",
            "quantityInStock": 15,
            "dispensingSize": {
              "id": "14",
              "name": "NULL"
            }
          },
          "quantity": 4,
          "discount": 0.0,
          "price": 1500.0,
          "note": null
        },
        {
          "id": "88",
          "product": {
            "id": "10",
            "productName": "BAMBOO CHARCOAL FACE MASKS",
            "quantityInStock": 114,
            "dispensingSize": {
              "id": "4",
              "name": "packs"
            }
          },
          "quantity": 4,
          "discount": 0.0,
          "price": 1663.0,
          "note": null
        },
        {
          "id": "89",
          "product": {
            "id": "10",
            "productName": "BAMBOO CHARCOAL FACE MASKS",
            "quantityInStock": 114,
            "dispensingSize": {
              "id": "4",
              "name": "packs"
            }
          },
          "quantity": 3,
          "discount": 0.0,
          "price": 1663.0,
          "note": null
        },
        {
          "id": "90",
          "product": {
            "id": "15",
            "productName": "COARTEM 20MG/120MG",
            "quantityInStock": 10,
            "dispensingSize": {
              "id": "14",
              "name": "NULL"
            }
          },
          "quantity": 1,
          "discount": 0.0,
          "price": 875.0,
          "note": null
        },
        {
          "id": "91",
          "product": {
            "id": "13",
            "productName": "ACTIKID VIT D3 DROPS 30ML",
            "quantityInStock": 9,
            "dispensingSize": {
              "id": "14",
              "name": "NULL"
            }
          },
          "quantity": 2,
          "discount": 0.0,
          "price": 3375.0,
          "note": null
        }
      ],
      "discountTotal": 0.0,
      "subTotal": 26.0,
      "paidAmount": 45000.0,
      "changeDue": 18234.0,
      "paymentMethod": "CASH",
      "notes": ""
    }
};
describe('testing the Query component', () => {
    const generate = async (allProps) => {
      const wrapper = mount(
          <StateContext.Provider value={context}>
            <BrowserRouter>
              <SalesHistoryDetail {...allProps} />
            </BrowserRouter>
          </StateContext.Provider>
      );
      return wrapper;
    };

    it('should render successfully', async () => {
      const wrapper = await generate(props);
      expect(wrapper.length).toBe(1);
    });

    it('should render successfully if some data are missing', async () => {
        const newProps = {
            match: { params: { id: 736 } },
            "saleHistory": {
                "id": "657",
                "createdAt": "2020-02-19T03:17:32.682987+00:00",

                "receipt": {
                  "cashier": { "firstName": 'robben bahati' },
                  "subTotal": 1231, "discountTotal": 231, "amountToPay": 1200, "changeDue": 1000, "purchaseTotal": 1231
                },
                "outlet": {
                  "name": "ta",
                  "city": {
                    "name": "Kituni",
                    "country":{
                      "name": "Uganda"
                    }
                  },
                  "business": {
                    "addressLine1": "Victoria Island, Street 001",
                    "phoneNumber": "+23434890234"
                  },
                  "outletpreference": {
                    "outletCurrency": {
                      "symbol": "$"
                    }
                  }
                },
                "saledetailSet": [
                  {
                    "id": "603",
                    "product": {
                      "id": "3797",
                      "productName": "CAMOSUNATE QUICK BOOK",
                      "quantityInStock": 0,
                      "dispensingSize": {
                        "name": "NULL"
                      }
                    },
                    "quantity": 1,
                    "discount": 0.0,
                    "price": 600.0
                  }
                ],
                "registerId": null,
                "paidAmount": 1200.0,
                "paymentMethod": "CASH"
            }
        };
        const wrapper2 = await generate(newProps);
        expect(wrapper2.length).toBe(1);
      });

    it('should display the notes popup upon click', async () => {
      const wrapper = await generate(props);
      const wrapper1 = wrapper.find('SalesHistoryDetail');
      const NotesIcon = wrapper1.find('NotesIcon');
      NotesIcon.simulate('click', {currentTarget: 'notes'});
      expect(wrapper1.state().isNotesPopperOpen).toBe(true);
      wrapper1.instance().handleClosePopOver();
      expect(wrapper1.state().isNotesPopperOpen).toBe(false);
    })
  });

  describe('testing the child components', () => {
    it('should render the sale history table', () => {
        const ownProps = {
            products:[
              {
                "id": "603",
                "product": {
                  "id": "3797",
                  "productName": "CAMOSUNATE QUICK BOOK",
                  "quantityInStock": 0,
                  "dispensingSize": {
                    "name": "bottle"
                  }
                },
                "quantity": 1,
                "discount": 0.0,
                "price": 600.0
              }
            ],
            currency: '$'
        };
        const wrapper = mount(<SalesHistoryTable {...ownProps} />);
        expect(wrapper).toMatchSnapshot
    });
    it('shoould render the sale elements table', () => {
        const ownProps = [
                [{ title: 'Receipt #', value: 54 },
                  { title: 'Cashier', value: 'firstName' }],
                [{ title: 'Outlet', value: 'location' },
                  { title: 'Register', value: 'Register 1' }],
                [{ title: 'Customer', value: 'customer Name' },
                  { title: 'End User', value: 'Customer' }
                ]
            ];
        const wrapper = mount(<SaleElements inputElements={ownProps} />);
        expect(wrapper).toMatchSnapshot
    })
  });
