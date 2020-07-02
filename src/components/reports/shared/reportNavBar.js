import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LowerNavbar from '../../shared/LowerNavbar/LowerNavbar';

class ReportNavbar extends Component {
  constructor({ activeGrid }) {
    super(activeGrid);
    this.state = {
      activeGrid,
      menu: [
        { grid: 'grid1', label: 'Store Performance', url: '/reports/store' },
        { grid: 'grid2', label: 'Team Member Performance', url: '/reports/team-member' },
        { grid: 'grid3', label: 'High-Level Performance', url: '/reports/high-level' }
      ]
    };
  }

  render() {
    const { activeGrid, menu } = this.state;
    return <LowerNavbar activeGrid={activeGrid} menu={menu} />;
  }
}

ReportNavbar.propTypes = {
  activeGrid: PropTypes.string
};
ReportNavbar.defaultProps = {
  activeGrid: ''
};

export default ReportNavbar;
