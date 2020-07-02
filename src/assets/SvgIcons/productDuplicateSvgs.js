import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export const Previous = props => (
  <SvgIcon {...props} xmlns="http://www.w3.org/2000/svg" width="573.146" height="878.828" viewBox="0 0 573.146 878.828" className="paginationIcons">
    <path id="previous_page_icon" data-name="previous page icon" d="M439.414,573.146,0,131.542,130.889,0,439.414,310.062,747.94,0,878.829,131.542Z" transform="translate(573.146) rotate(90)" fill="#707070" />
  </SvgIcon>
);

export const PreviousDisabled = props => (
  <SvgIcon {...props} xmlns="http://www.w3.org/2000/svg" width="573.146" height="878.828" viewBox="0 0 573.146 878.828" className="paginationIcons">
    <path id="previous_page_icon" data-name="previous page icon" d="M439.414,573.146,0,131.542,130.889,0,439.414,310.062,747.94,0,878.829,131.542Z" transform="translate(573.146) rotate(90)" fill="#bab5b1" />
  </SvgIcon>
);

export const Next = props => (
  <SvgIcon {...props} xmlns="http://www.w3.org/2000/svg" width="573.801" height="884.229" viewBox="0 0 573.801 884.229" className="paginationIcons">
    <path id="next_page_icon" data-name="next page icon" d="M442.114,573.8,0,131.692,131.694,0,442.114,310.417,752.535,0,884.228,131.692Z" transform="translate(0 884.229) rotate(-90)" fill="#707070" />
  </SvgIcon>
);

export const NextDisabled = props => (
  <SvgIcon {...props} xmlns="http://www.w3.org/2000/svg" width="573.801" height="884.229" viewBox="0 0 573.801 884.229" className="paginationIcons">
    <path id="next_page_icon" data-name="next page icon" d="M442.114,573.8,0,131.692,131.694,0,442.114,310.417,752.535,0,884.228,131.692Z" transform="translate(0 884.229) rotate(-90)" fill="#bab5b1" />
  </SvgIcon>
);
