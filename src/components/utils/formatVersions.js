import moment from 'moment';

export default ({ editSuppliersRequests, countries }) => {
  if (!editSuppliersRequests || editSuppliersRequests.length === 0) return [];
  const formatedVersions = [];
  editSuppliersRequests.forEach(({
    id, version, createdAt, proposedBy, approvedBy, status, isApproved
  }) => {
    const parsedVersion = JSON.parse(version);
    const supplier = parsedVersion[0].fields;
    const contacts = parsedVersion[1].fields;
    const meta = parsedVersion[2].fields;

    const country = countries.find(single => single.id === contacts.country.toString());
    const city = country.citySet.find(single => single.id === contacts.city.toString());
    const tier = [
      { id: 1, name: 'Manufacturer' },
      { id: 2, name: 'Importer' },
      { id: 3, name: '1T wholesaler' },
      { id: 4, name: '2T wholesaler' },
      { id: 5, name: '3T wholesaler' }
    ].find(single => single.id === supplier.tier);

    formatedVersions.push({
      id,
      supplierid: supplier.supplier_id,
      submitTime: moment(createdAt).format('DD/MM/YYYY HH:mm'),
      isActive: status === 'active',
      proposedBy: `${proposedBy.firstName} ${proposedBy.lastName}`,
      approvedBy: approvedBy ? `${approvedBy.firstName} ${approvedBy.lastName}` : 'Pending',
      status: isApproved ? 'Approved' : 'Pending',
      name: supplier.name,
      tier,
      user: { id: supplier.user },
      supplierContacts: [{
        email: contacts.email,
        mobileNumber: contacts.mobile_number,
        addressLine1: contacts.address_line_1,
        addressLine2: contacts.address_line_2,
        country: { name: country.name },
        city: { name: city.name },
        lga: contacts.lga,
      }],
      supplierMeta: [{
        displayName: meta.display_name,
        paymentTerms: meta.payment_terms,
        logo: meta.logo,
        creditDays: meta.credit_days,
        commentary: meta.commentary,
      }],
      supplierratingSet: [{}],
    });
  });
  return formatedVersions;
};
