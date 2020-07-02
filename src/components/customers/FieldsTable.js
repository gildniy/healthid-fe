import React from 'react';

const FieldsTable = () => (
  <div>
    <div>
      <h3 className="fields-title">Guide and sample data for the CSV file you are uploading</h3>
    </div>
    <table className="fields-table">
      <tbody>
        <tr className="fields-tr">
          <td className="required-field">
            <div className="required-field-name">First Name*</div>
            <li>Customer&apos;s first name</li>
            <li>e.g. John </li>
            <span>required</span>
          </td>
          <td className="required-field">
            <div className="required-field-name">Last Name</div>
            <li>Customer&apos;s last name</li>
            <li>e.g. Smith </li>
            <span>optional</span>
          </td>
          <td className="required-field">
            <div className="required-field-name">Mobile #</div>
            <li>Customer&apos;s mobile number</li>
            <li>e.g. +234 806 000 0000</li>
            <span>optional</span>
          </td>
          <td className="required-field">
            <div className="required-field-name tier">Other Mobile #</div>
            <li>Customer&apos;s secondary number</li>
            <li>e.g. +234 806 000 0000</li>
            <span>optional</span>
          </td>
        </tr>
        <tr className="fields-tr">
          <td className="required-field">
            <div className="required-field-name">Email</div>
            <li>Customer&apos;s email</li>
            <li>e.g. john@email.com</li>
            <span>optional</span>
          </td>
          <td className="required-field">
            <div className="required-field-name">Loyalty Membership</div>
            <li>Is the customer a loyalty</li>
            <li>member? Specify Yes/No</li>
            <span>optional</span>
          </td>
          <td className="required-field">
            <div className="required-field-name">Address</div>
            <li>Customer&apos;s line of address</li>
            <li>e.g. 123 alphabet way</li>
            <span>optional</span>
          </td>
          <td className="required-field">
            <div className="required-field-name">Country</div>
            <li>Customer&apos;s country address</li>
            <li>e.g. Nigeria</li>
            <span>optional</span>
          </td>
        </tr>
        <tr className="fields-tr">
          <td className="required-field">
            <div className="required-field-name">City</div>
            <li>City located in the selected</li>
            <li>country e.g. Lagos</li>
            <span>optional</span>
          </td>
          <td className="required-field">
            <div className="required-field-name">Region</div>
            <li>Region in the selected city</li>
            <li>e.g. Yaba</li>
            <span>optional</span>
          </td>
          <td className="required-field">
            <div className="required-field-name">Emergency Contact Name</div>
            <li>Customer&apos;s emergency contact</li>
            <li>name e.g. Jane Smith</li>
            <span>optional</span>
          </td>
          <td className="required-field">
            <div className="required-field-name">Emergency Contact Email</div>
            <li>Customer&apos;s emergency contact</li>
            <li>email e.g. jane@email.com</li>
            <span>optional</span>
          </td>
        </tr>
        <tr className="fields-tr">
          <td className="required-field">
            <div className="required-field-name">Emergency Contact #</div>
            <li>Customer&apos;s emergency contact</li>
            <li>number e.g. +234 806 000 1111</li>
            <span>optional</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default FieldsTable;
