import formatVersions from '../../../components/utils/formatVersions';

const data = {
  editSuppliersRequests: [
    {
      version: '[{"fields":{}},{"fields":{"country":1,"city":1}},{"fields":{}}]',
      createdAt: Date.now(),
      proposedBy: {},
      approvedBy: {},
    },
    {
      version: '[{"fields":{}},{"fields":{"country":1,"city":1}},{"fields":{}}]',
      createdAt: Date.now(),
      proposedBy: {},
      isApproved: {},
    }
  ],
  countries: [{
    id: "1",
    citySet: [{
      id: "1"
    }]
  }],
  totalNumberOfSuppliers: 10
};

describe('Test the versions formatter', () => {
  it('should return an empty array if editSuppliersRequests is empty', () => {
    const result = formatVersions({ editSuppliersRequests: [] });
    expect(result.length).toEqual(0);
  })

  it('should return formatted data', () => {
    const result = formatVersions(data);
    expect(result.length).toEqual(2);
  })
})