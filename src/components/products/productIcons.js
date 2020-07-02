/* eslint-disable default-case */
import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import PropTypes from 'prop-types';
import * as IconPaths from './productsSVGIconPaths';

export const getIconStructure = (id) => {
  switch (id) {
  case 'expiry_icon':
    return (
      <g id="near_expiry" data-name="near expiry" transform="translate(0 -0.005)">
        <g id="Layer_1" data-name="Layer 1" transform="translate(0 0.005)">
          <path id="Path_33821" data-name="Path 33821" d={IconPaths.ManageExpirersPath.ClockFace} transform="translate(0 0.016)" />
          <path id="Path_33822" data-name="Path 33822" d={IconPaths.ManageExpirersPath.ElapsedTime} transform="translate(39.006 38.747)" />
          <path id="Path_33823" data-name="Path 33823" d={IconPaths.ManageExpirersPath.ClockSticks} transform="translate(70.565 39.01)" />
          <g id="iconfinder_product_4172167" transform="translate(255.694 61.982)">
            <path id="Path_33791" data-name="Path 33791" d={IconPaths.ManageExpirersPath.RightBoxFace} transform="translate(159.766 103.547)" />
            <path id="Path_33792" data-name="Path 33792" d={IconPaths.ManageExpirersPath.LeftBoxFace} transform="translate(-2.715 90.822)" />
            <path id="Subtraction_13" data-name="Subtraction 13" d={IconPaths.ManageExpirersPath.TopBoxFace} transform="translate(17.306 0)" />
          </g>
        </g>
      </g>
    );

  case 'stock_transfer':
    return (
      <>
        <svg xmlns="http://www.w3.org/2000/svg">
          <g id="stock_transfer" data-name="stock transfer" opacity="0.5">
            <path id="Path_33895" data-name="Path 33895" d="M70.874,193.667A17.686,17.686,0,0,0,88.56,175.98v-72.9A31.872,31.872,0,0,1,120.4,71.244h72.9a17.684,17.684,0,1,0,0-35.369H120.4a67.279,67.279,0,0,0-67.2,67.2v72.9A17.685,17.685,0,0,0,70.874,193.667Zm0,0" transform="translate(18.248 5.814)" fill="#424242" />
            <path id="Path_33896" data-name="Path 33896" d="M450.032,313.469a17.685,17.685,0,0,0-17.682,17.686v72.9a31.869,31.869,0,0,1-31.837,31.831h-72.9a17.686,17.686,0,1,0,0,35.373h72.9a67.282,67.282,0,0,0,67.206-67.2v-72.9A17.686,17.686,0,0,0,450.032,313.469Zm0,0" transform="translate(47.947 42.047)" fill="#424242" />
            <g id="Group_1819" data-name="Group 1819" transform="translate(90.842 411.511)">
              <path id="Path_33898" data-name="Path 33898" d="M60.75,422.266H98.079V546.624H60.75Zm0,0" transform="translate(-60.75 -422.266)" fill="#424242" />
              <path id="Path_33899" data-name="Path 33899" d="M125.059,422.266h37.329V546.624H125.059Zm0,0" transform="translate(-54.988 -422.266)" fill="#424242" />
            </g>
            <path id="Path_33903" data-name="Path 33903" d="M384.487,2.794,243.281,122.444a5.931,5.931,0,0,0,3.807,10.459H270V282.078a11.829,11.829,0,0,0,11.8,11.858h16.278V148.549a17.746,17.746,0,0,1,17.706-17.786H468.405a17.746,17.746,0,0,1,17.706,17.786V293.935h16.278a11.834,11.834,0,0,0,11.8-11.858V132.9h22.914a5.932,5.932,0,0,0,3.807-10.459L399.708,2.794A11.761,11.761,0,0,0,384.487,2.794Zm25.138,90.54H374.579a17.787,17.787,0,0,1,0-35.573h35.045a17.787,17.787,0,0,1,0,35.573Zm0,0" transform="translate(-241.171 241.933)" fill="#424242" />
            <path id="Path_33904" data-name="Path 33904" d="M384.487,2.794,243.281,122.444a5.931,5.931,0,0,0,3.807,10.459H270V282.078a11.829,11.829,0,0,0,11.8,11.858h16.278V148.549a17.746,17.746,0,0,1,17.706-17.786H468.405a17.746,17.746,0,0,1,17.706,17.786V293.935h16.278a11.834,11.834,0,0,0,11.8-11.858V132.9h22.914a5.932,5.932,0,0,0,3.807-10.459L399.708,2.794A11.761,11.761,0,0,0,384.487,2.794Zm25.138,90.54H374.579a17.787,17.787,0,0,1,0-35.573h35.045a17.787,17.787,0,0,1,0,35.573Zm0,0" transform="translate(38.779 0.001)" fill="#424242" />
            <path id="Path_33901" data-name="Path 33901" d="M322.742,207.98h117.08v57.158H322.742Zm0,0" transform="translate(50.371 28.278)" fill="#424242" />
            <path id="Path_33902" data-name="Path 33902" d="M322.742,146.3h117.08v34.357H322.742Zm0,0" transform="translate(50.371 20.228)" fill="#424242" />
          </g>
        </svg>
      </>
    );

  case 'Initiate_new_order':
    return (
      <>
        <svg xmlns="http://www.w3.org/2000/svg">
          <g id="Initiate_new_order" data-name="Initiate new order" opacity="0.5">
            <g id="Layer_1" data-name="Layer 1" transform="translate(0 0)">
              <path id="add" d="M535.869,242.417H293.452V0H242.417V242.417H0v51.035H242.417V535.869h51.035V293.452H535.869Z" fill="#424242" />
            </g>
          </g>
        </svg>
      </>
    );

  case 'export':
    return (
      <React.Fragment>
        <g id="Group_1609" data-name="Group 1609" transform="translate(120.364 0)">
          <g id="Group_1608" data-name="Group 1608" transform="translate(0 0)" fill="#757575">
            <path id="Path_33808" data-name="Path 33808" d={IconPaths.ExportListPath.Arrow} transform="translate(-132.64 -4.72)" />
          </g>
        </g>
        <g id="Group_1611" data-name="Group 1611" transform="translate(0 141.505)" fill="#757575">
          <g id="Group_1610" data-name="Group 1610" fill="#757575">
            <path id="Path_33809" data-name="Path 33809" d={IconPaths.ExportListPath.Frame} transform="translate(0 -155.28)" />
          </g>
        </g>
      </React.Fragment>
    );

  case 'eye':
    return (
      <React.Fragment>
        <path fill="none" d="M0 0h24v24H0V0z" />
        <path d="M12 6.5c3.79 0 7.17 2.13 8.82 5.5-1.65 3.37-5.02 5.5-8.82 5.5S4.83 15.37 3.18 12C4.83 8.63 8.21 6.5 12 6.5m0-2C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5m0-2c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5-2.02-4.5-4.5-4.5z" />
      </React.Fragment>
    );

  case 'warehouse':
    return (
      <React.Fragment>
        <g id="warehouse" transform="translate(9.998 1)">
          <path id="Path_33895" data-name="Path 33895" d="M82,292.952a28.814,28.814,0,0,0,28.815-28.815V145.365A51.926,51.926,0,0,1,162.681,93.5H281.452a28.812,28.812,0,1,0,0-57.623H162.681A109.611,109.611,0,0,0,53.191,145.365V264.137A28.813,28.813,0,0,0,82,292.952Zm0,0" transform="translate(53.198 31.045)" fill="#757575" />
          <path id="Path_33896" data-name="Path 33896" d="M538.186,313.469a28.812,28.812,0,0,0-28.808,28.815V461.055a51.921,51.921,0,0,1-51.868,51.86H338.74a28.815,28.815,0,0,0,0,57.63H457.51A109.616,109.616,0,0,0,567,461.055V342.284A28.814,28.814,0,0,0,538.186,313.469Zm0,0" transform="translate(263.121 264.742)" fill="#757575" />
          <g id="Group_1819" data-name="Group 1819" transform="translate(138.001 669.438)">
            <path id="Path_33898" data-name="Path 33898" d="M60.75,422.265h60.817V624.872H60.75Zm0,0" transform="translate(-60.75 -422.265)" fill="#757575" />
            <path id="Path_33899" data-name="Path 33899" d="M125.059,422.265h60.817V624.872H125.059Zm0,0" transform="translate(-10.9 -422.265)" fill="#757575" />
          </g>
          <path id="Path_33903" data-name="Path 33903" d="M474.661,4.552,244.608,199.488a9.663,9.663,0,0,0,6.2,17.039h37.331V459.566a19.272,19.272,0,0,0,19.232,19.319h26.52V242.018a28.911,28.911,0,0,1,28.847-28.978H611.381a28.912,28.912,0,0,1,28.847,28.978V478.884h26.52a19.28,19.28,0,0,0,19.231-19.319V216.528H723.31a9.664,9.664,0,0,0,6.2-17.039L499.46,4.552a19.16,19.16,0,0,0-24.8,0ZM515.615,152.06h-57.1a28.978,28.978,0,0,1,0-57.956h57.1a28.978,28.978,0,0,1,0,57.956Zm0,0" transform="translate(-251.171 393.159)" fill="#424242" />
          <path id="Path_33904" data-name="Path 33904" d="M474.661,4.552,244.608,199.488a9.663,9.663,0,0,0,6.2,17.039h37.331V459.566a19.272,19.272,0,0,0,19.232,19.319h26.52V242.018a28.911,28.911,0,0,1,28.847-28.978H611.381a28.912,28.912,0,0,1,28.847,28.978V478.884h26.52a19.28,19.28,0,0,0,19.231-19.319V216.528H723.31a9.664,9.664,0,0,0,6.2-17.039L499.46,4.552a19.16,19.16,0,0,0-24.8,0ZM515.615,152.06h-57.1a28.978,28.978,0,0,1,0-57.956h57.1a28.978,28.978,0,0,1,0,57.956Zm0,0" transform="translate(204.925 -1)" fill="#424242" />
          <path id="Path_33901" data-name="Path 33901" d="M322.742,207.98H513.49V301.1H322.742Zm0,0" transform="translate(275.135 175.934)" fill="#757575" />
          <path id="Path_33902" data-name="Path 33902" d="M322.742,146.3H513.49V202.28H322.742Zm0,0" transform="translate(275.135 124.012)" fill="#757575" />
        </g>
      </React.Fragment>
    );
  case 'supplier_order_forms':
    // <svg xmlns="http://www.w3.org/2000/svg" width="413.385" height="535.869" viewBox="0 0 413.385 535.869">
    return (
      <React.Fragment>
        <g id="supplier_order_forms" data-name="supplier order forms" opacity="0.5">
          <g id="Group_3548" data-name="Group 3548">
            <g id="Group_3547" data-name="Group 3547">
              <path id="Path_35821" data-name="Path 35821" d="M314.017,174.74a17.356,17.356,0,0,1-17.225-17.474V0H55.652V535.869H469.037V174.74ZM141.774,431.024A17.476,17.476,0,1,1,159,413.55,17.351,17.351,0,0,1,141.774,431.024Zm0-69.9A17.476,17.476,0,1,1,159,343.654,17.351,17.351,0,0,1,141.774,361.128Zm0-69.9A17.476,17.476,0,1,1,159,273.758,17.351,17.351,0,0,1,141.774,291.233ZM382.915,431.024H210.671a17.476,17.476,0,0,1,0-34.949H382.915a17.476,17.476,0,0,1,0,34.949Zm0-69.9H210.671a17.476,17.476,0,0,1,0-34.949H382.915a17.476,17.476,0,0,1,0,34.949Zm0-69.9H210.671a17.476,17.476,0,0,1,0-34.949H382.915a17.476,17.476,0,0,1,0,34.949Z" transform="translate(-55.652)" fill="#424242" />
            </g>
          </g>
          <g id="Group_3550" data-name="Group 3550" transform="translate(276.437 10.031)">
            <g id="Group_3549" data-name="Group 3549" transform="translate(0)">
              <path id="Path_35822" data-name="Path 35822" d="M322.783,9.783V136.7H449.7Z" transform="translate(-322.783 -9.783)" fill="#424242" />
            </g>
          </g>
        </g>
      </React.Fragment>

    );
  case 'search':
    return (
      <>
        <svg xmlns="http://www.w3.org/2000/svg">
          <g id="search" opacity="0.5">
            <path id="Path_33802" data-name="Path 33802" d="M494.938,466.142,377.153,348.357a205.743,205.743,0,0,0,46.794-130.883C423.947,103.488,331.459,11,217.474,11,103.388,11,11,103.488,11,217.474s92.388,206.474,206.474,206.474a205.385,205.385,0,0,0,130.783-46.694L466.042,494.938a20.4,20.4,0,0,0,28.9-28.8Zm-277.465-83.29c-91.288,0-165.479-74.19-165.479-165.379S126.185,51.995,217.474,51.995c91.188,0,165.479,74.291,165.479,165.479S308.662,382.852,217.474,382.852Z" transform="translate(-11 -11)" fill="#424242" />
          </g>
        </svg>
      </>
    );

  default:
    return <g />;
  }
};

export const getViewBox = (id) => {
  switch (id) {
  case 'expiry_icon':
    return (
      IconPaths.ManageExpirersPath.viewBox
    );
  case 'export':
    return (
      IconPaths.ExportListPath.viewBox
    );
  case 'eye':
    return '0 0 24 24';
  case 'warehouse':
    return '0 0 947.869 873.045';
  case 'supplier_order_forms':
    return '0 0 413.385 535.869';
  case 'stock_transfer':
    return '0 0 581.801 535.869';
  case 'Initiate_new_order':
    return '0 0 535.869 535.869';
  case 'search':
    return '0 0 489.938 489.938';
  }
};
export const forwardIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIiBoZWlnaHQ9IjMycHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik0yNC4yOTEsMTQuMjc2TDE0LjcwNSw0LjY5Yy0wLjg3OC0wLjg3OC0yLjMxNy0wLjg3OC0zLjE5NSwwbC0wLjgsMC44Yy0wLjg3OCwwLjg3Ny0wLjg3OCwyLjMxNiwwLDMuMTk0ICBMMTguMDI0LDE2bC03LjMxNSw3LjMxNWMtMC44NzgsMC44NzgtMC44NzgsMi4zMTcsMCwzLjE5NGwwLjgsMC44YzAuODc4LDAuODc5LDIuMzE3LDAuODc5LDMuMTk1LDBsOS41ODYtOS41ODcgIGMwLjQ3Mi0wLjQ3MSwwLjY4Mi0xLjEwMywwLjY0Ny0xLjcyM0MyNC45NzMsMTUuMzgsMjQuNzYzLDE0Ljc0OCwyNC4yOTEsMTQuMjc2eiIgZmlsbD0iIzUxNTE1MSIvPjwvc3ZnPg==';

export const Icon = ({ id, className }) => (
  <SvgIcon
    xmlns="http://www.w3.org/2000/svg"
    id={id}
    viewBox={getViewBox(id)}
    className={className}
  >
    {getIconStructure(id)}
  </SvgIcon>
);

Icon.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Icon.defaultProps = {
  className: ''
};

export default Icon;
