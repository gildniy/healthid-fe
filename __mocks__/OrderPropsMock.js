export const props = {
  receivedOrder: {
    orderItems: [
      {
        id: '1',
        order: {
          id: '71',
          name: 'Order for February',
          orderNumber: 'ej9o0c2pv',
          status: 'closed',
          closed: true,
          invoice: '',
          user: {
            firstName: 'Placide',
            lastName: 'IRANDORA',
          },
          destinationOutlet: {
            id: '751',
            name: 'Somewhere',
            addressLine1: 'Test',
            city: {
              name: 'Kigali',
              country: { name: 'Rwanda' },
            },
          },
          createdAt: '2020-01-21T09:39:13.240321+00:00',
        },
        additionalNotes: null,
        supplier: {
          id: 'b6o9tttmb',
          supplierId: 'S-DUN798',
          name: 'Dunn LTD',
          suppliersmetaSet: [],
        },
        status: 'Pending',
        deliverTo: 'LS Festac',
        deliveryDue: '2020-01-30',
        paymentDue: '2020-01-30',
        product: {
          id: '7',
          productName: 'panadol2',
          productCategory: {
            id: '1',
            name: 'prescription',
          },
          dispensingSize: {
            id: '1',
            name: 'tablets',
          },
          skuNumber: '000007',
          description: 'forever younger tablets',
          brand: 'ventolinllke',
          manufacturer: 'Harmon',
          vatStatus: false,
          salesPrice: 1400.0,
          createdAt: '2019-05-30T11:53:08.007323+00:00',
          reorderPoint: 6,
          reorderMax: 12,
          nearestExpiryDate: null,
          preferredSupplier: {
            id: '2',
            name: 'sean2',
          },
          backupSupplier: {
            id: '2',
            name: 'sean2',
          },
          tags: ['painkillers', 'panadol'],
          markup: 27,
          unitCost: 30.0,
          loyaltyWeight: 15,
        },
        price: '3000',
        quantity: 222,
        unitCost: 40.0,
      }],
    currency: '₦',
  },
  client: {
    query: jest.fn(),
  },
  classes: { paper: '' },
  supplierOrderDetails: {
    id: 'csohivy63',
    invoice: '',
    orderDetails: [
      {
        id: '8fe62hmy0',
        orderedQuantity: 92,
        price: '4600',
        costPerItem: '50',
        product: {
          id: '491',
          productName: 'Canesten Cream 20g'
        }
      },
      {
        id: '277goz6i5',
        orderedQuantity: 92,
        price: '4600',
        costPerItem: '50',
        product: {
          id: '498',
          productName: 'Carzepin 200mg Tablets X50'
        }
      }
    ],
    grandTotal: 9200.0,
    markedAsSent: false,
    supplierOrderName: 'Dunn LTD-Order for February',
    supplierOrderNumber: 'ej9o0c2pv-S-DUN798',
    order: {
      id: '71',
      name: 'Order for February',
      orderNumber: 'ej9o0c2pv',
      status: 'waiting for order to be placed',
      closed: true,
      invoice: '',
      user: {
        firstName: 'Placide',
        lastName: 'IRANDORA'
      },
      destinationOutlet: {
        id: '751'
      },
      createdAt: '2020-01-21T09:39:13.240321+00:00'
    },
    additionalNotes: null,
    supplier: {
      id: 'b6o9tttmb',
      supplierId: 'S-DUN798',
      name: 'Dunn LTD',
      suppliersmetaSet: []
    },
    status: 'Pending',
    deliverTo: 'LS Festac',
    deliveryDue: '2020-01-30',
    paymentDue: '2020-01-30'
  },
  filter: jest.fn()
};

export const openOrderDescriptionProps = {
  classes: { paper: '' },
  supplierOrderDetails: {
    id: 'csohivy63',
    invoice: null,
    orderDetails: [
      {
        id: '8fe62hmy0',
        orderedQuantity: 92,
        price: '4600',
        costPerItem: '50',
        product: {
          id: '491',
          productName: 'Canesten Cream 20g'
        }
      },
      {
        id: '277goz6i5',
        orderedQuantity: 92,
        price: '4600',
        costPerItem: '50',
        product: {
          id: '498',
          productName: 'Carzepin 200mg Tablets X50'
        }
      }
    ],
    grandTotal: 9200.0,
    markedAsSent: true,
    supplierOrderName: 'Dunn LTD-Order for February',
    supplierOrderNumber: 'ej9o0c2pv-S-DUN798',
    order: {
      id: '71',
      name: 'Order for February',
      orderNumber: 'ej9o0c2pv',
      status: 'waiting for order to be placed',
      closed: false,
      user: {
        firstName: 'Placide',
        lastName: 'IRANDORA'
      },
      destinationOutlet: {
        id: '751'
      },
      createdAt: '2020-01-21T09:39:13.240321+00:00'
    },
    additionalNotes: null,
    supplier: {
      id: 'b6o9tttmb',
      supplierId: 'S-DUN798',
      name: 'Dunn LTD',
      suppliersmetaSet: []
    },
    status: 'OPEN',
    deliverTo: 'LS Festac',
    deliveryDue: '2020-01-30',
    paymentDue: '2020-01-30'
  },
  uploadImage: jest.fn(),
  handleDragOverImage: jest.fn(),
  handleOnCropChange: jest.fn(),
  handleSave: jest.fn(),
  filter: jest.fn(),
  closeOrder: jest.fn(
    () => new Promise(resolve => resolve())
  ),
  supplierOrderFormId: 'asda212'
};

export const props1 = {
  receivedOrder: {
    orderItems: [
      {
        id: '1',
        order: {
          id: '71',
          name: 'Order for February',
          orderNumber: 'ej9o0c2pv',
          status: 'closed',
          closed: true,
          invoice: '',
          user: {
            firstName: 'Placide',
            lastName: 'IRANDORA',
          },
          destinationOutlet: {
            id: '751',
            name: 'Somewhere',
            addressLine1: 'Test',
            city: {
              name: 'Kigali',
              country: { name: 'Rwanda' },
            },
          },
          createdAt: '2020-01-21T09:39:13.240321+00:00',
        },
        additionalNotes: null,
        supplier: {
          id: 'b6o9tttmb',
          supplierId: 'S-DUN798',
          name: 'Dunn LTD',
          suppliersmetaSet: [],
        },
        status: 'Pending',
        deliverTo: 'LS Festac',
        deliveryDue: '2020-01-30',
        paymentDue: '2020-01-30',
        product: {
          id: '7',
          productName: 'panadol2',
          productCategory: {
            id: '1',
            name: 'prescription',
          },
          dispensingSize: {
            id: '1',
            name: 'tablets',
          },
          skuNumber: '000007',
          description: 'forever younger tablets',
          brand: 'ventolinllke',
          manufacturer: 'Harmon',
          vatStatus: false,
          salesPrice: 1400.0,
          createdAt: '2019-05-30T11:53:08.007323+00:00',
          reorderPoint: 6,
          reorderMax: 12,
          nearestExpiryDate: null,
          preferredSupplier: {
            id: '2',
            name: 'sean2',
          },
          backupSupplier: {
            id: '2',
            name: 'sean2',
          },
          tags: ['painkillers', 'panadol'],
          markup: 27,
          unitCost: 30.0,
          loyaltyWeight: 15,
        },
        price: '3000',
        quantity: 222,
        unitCost: 40.0,
      }],
    currency: '₦',
  },
  classes: { paper: '' },
  supplierOrderFormId: 'csohivy63',
  supplierOrderDetails: {
    id: 'csohivy63',
    invoice: null,
    status: 'CLOSED',
    orderDetails: [
      {
        id: '8fe62hmy0',
        orderedQuantity: 92,
        price: '4600',
        costPerItem: '50',
        product: {
          id: '2652',
          productName: 'Amoksiklav Susp ORANGE 100ML',
          batchInfo: [
            {
              batchQuantities: [
                {
                  quantityReceived: 100
                }
              ]
            }
          ]
        }
      },
      {
        id: '277goz6i5',
        orderedQuantity: 92,
        price: '4600',
        costPerItem: '50',
        product: {
          id: '498',
          productName: 'Carzepin 200mg Tablets X50',
          batchInfo: [
            {
              batchQuantities: [
                {
                  quantityReceived: 100
                }
              ]
            }
          ]
        }
      }
    ],
    grandTotal: 9200.0,
    markedAsSent: false,
    supplierOrderName: 'Dunn LTD-Order for February',
    supplierOrderNumber: 'ej9o0c2pv-S-DUN798',
    order: { ...props.supplierOrderDetails.order },
    additionalNotes: null,
    supplier: {
      id: 'b6o9tttmb',
      supplierId: 'S-DUN798',
      name: 'Dunn LTD',
      suppliersmetaSet: []
    },
    deliverTo: 'LS Festac',
    deliveryDue: '2020-01-30',
    paymentDue: '2020-01-30',
  },
  filter: jest.fn()
};

export const orderMockContext = {
  batchInformation: {
    batch: {
      supplierOrderFormId: 'sda82131',
      productBatches: [
        {
          productId: '491',
          productName: 'Product',
          dateReceived: '2020-01-02',
          batchNumber: '',
          supplier: 'Supplier 1',
          supplierId: 'bsa2w0sd',
          expiryDate: '2020-10-20',
          costPerItem: '120',
          quantityReceived: '30',
          deliveryPromptness: true,
          serviceQuality: '1',
          notes: '',
        }
      ],
      batchSize: 1
    },
    orderBatches: [
      {
        supplierOrderFormId: 'sda82131',
        productBatches: [
          {
            productId: '493',
            productName: 'Product',
            dateReceived: '2020-01-02',
            batchNumber: '',
            supplier: 'Supplier 1',
            supplierId: 'bsa2w0sd',
            expiryDate: '2020-10-20',
            costPerItem: '120',
            quantityReceived: '30',
            deliveryPromptness: true,
            serviceQuality: '1',
            notes: '',
          }
        ],
        batchSize: 1
      }
    ],
    openDialog: true,
    singleBatch: {
      productId: '212',
      productName: 'Product 1',
      dateReceived: '2020-01-20',
      supplier: '',
    }
  }
};
