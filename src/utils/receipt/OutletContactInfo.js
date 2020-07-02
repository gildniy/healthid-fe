export class OutletContactInfo {
    address_line1 = '';

    address_line2 = '';

    lga = '';

    phone_number = '';

    constructor(outletcontactsSet = []) {
      outletcontactsSet.forEach((info) => {
        const keyValues = Object.values(info);
        if (keyValues.length === 3) {
          const [key, value] = keyValues;
          this[key] = value;
        }
      });
    }
}
