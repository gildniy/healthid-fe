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
            <div className="required-field-name">Product Name</div>
            <li>Specify product to assign batch to</li>
            <li>e.g: Panadol Tablets (40 sachets) </li>
            <span>required</span>
          </td>
          <td className="required-field">
            <div className="required-field-name">Date Received</div>
            <li>Select the data for when batch</li>
            <li>was received e.g: 23/11/2019</li>
            <span>required</span>
          </td>
          <td className="required-field">
            <div className="required-field-name">Batch Number</div>
            <li>Enter Manufacturer batch #, system</li>
            <li>auto-generates one if not provided</li>
            <span>required</span>
          </td>
          <td className="required-field">
            <div className="required-field-name tier">Supplier</div>
            <li>Specify display name of the existing</li>
            <li>supplier the batch was received from</li>
            <span>required</span>
          </td>
        </tr>
        <tr className="fields-tr">
          <td className="required-field">
            <div className="required-field-name">Expiry Date</div>
            <li>Select the date for when the</li>
            <li>product batch will expire</li>
            <span>required</span>
          </td>
          <td className="required-field">
            <div className="required-field-name">Cost Per Item</div>
            <li>Enter the cost per item</li>
            <li>received from supplier</li>
            <span>required</span>
          </td>
          <td className="required-field">
            <div className="required-field-name">Quantity Received</div>
            <li>Specify the product batch quantity</li>
            <li>received from the supplier</li>
            <span>required</span>
          </td>
          <td className="required-field">
            <div className="required-field-name">Delivery Promptness</div>
            <li>Select promptness of delivery</li>
            <li>from either &apos;On time&apos; or &apos;Late&apos;</li>
            <span>required</span>
          </td>
        </tr>
        <tr className="fields-tr">
          <td className="required-field">
            <div className="required-field-name">Service Quality</div>
            <li>Specify the quality of the batch</li>
            <li>received from the supplier</li>
            <span>required</span>
          </td>

          <td className="required-field">
            <div className="required-field-name">Notes</div>
            <li>Enter any additional notes about</li>
            <li>the batch received</li>
            <span>optional</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default FieldsTable;
