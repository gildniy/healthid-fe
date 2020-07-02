import React, { Component } from 'react';
import { Query, graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import {
  Paper,
  Grid,
  Typography,
  withStyles
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import withAuth from '../../withAuth';
import ProposeEditHeader from '../../products/Templates/ProposeEditHeader';
import TableToolBar from './TableToolBar';
import VersionTable from './VersionsTable';
import VersionDialog from './VersionDialog';
import { MainBusinessSetUpStyles as styles } from '../../../assets/styles/setup';
import { SupplierFormStyles } from '../../../assets/styles/suppliers/addSupplierStyles';
import { proposeEditStyles } from '../../../assets/styles/products/products';
import initiateOrderStyles from '../../../assets/styles/orders/newOrder';
import GET_VERSIONS from '../../../queries/getVersions';
import APPROVE_VERSION from '../../../mutations/approveVersion';
import formatVersions from '../../utils/formatVersions';
import notify from '../../shared/Toaster';

import { StateContext } from '../../../providers/stateProvider';

export class SupplierVersions extends Component {
  state={
    isDialogOpen: false,
    currentPage: 1,
    currentPageCount: 10,
  };

  componentDidMount() {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: 'changeGrid',
      grid: 'grid4'
    });
  }

  toggleDialogView = (selected) => {
    const { isDialogOpen } = this.state;
    this.setState({ isDialogOpen: !isDialogOpen, selected });
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({ currentPageCount: event.target.value });
  };

  handleChangePage = (_, newPage) => {
    this.setState({ currentPage: newPage + 1 });
  };

  handleApproveVersion = (id) => {
    const { approveVersion, history, match: { params: { id: supplierId } } } = this.props;
    approveVersion({
      variables: { id }
    }).then(
      ({ data: { approveEditRequest: { message } } }) => {
        notify(message);
        this.setState({ isDialogOpen: false });
        history.push(`/suppliers/${supplierId}/details`);
      }
    ).catch((err) => {
      const { message } = err.message ? err : err.graphQLErrors[0];
      notify(message);
    });
  };

  handleRejectVersion = () => {};

  static contextType = StateContext;

  render() {
    const {
      match: { params: { id } }, classes, session: { me: { activeOutlet } }
    } = this.props;

    const {
      isDialogOpen,
      currentPage,
      currentPageCount,
      selected
    } = this.state;

    return (
      <>
        <ProposeEditHeader
          type="the Supplier"
          classes={classes}
          previousPage={`/suppliers/${id}/details`}
        />
        <Query
          query={GET_VERSIONS}
          fetchPolicy="cache-and-network"
          variables={{
            pageCount: currentPageCount,
            pageNumber: currentPage,
            supplierId: id
          }}
        >
          { ({ loading, data }) => (
            <>
              <Paper style={{ ...SupplierFormStyles.paperForm, paddingBottom: 0 }}>
                <Grid style={styles.contentHeader}>
                  <Typography style={initiateOrderStyles.newOrderTitle} variant="h5">
                    {loading ? 'Loading Versions' : data.singleSupplier.name}
                  </Typography>
                </Grid>
                <TableToolBar
                  name="toolbar"
                  number={data.totalNumberOfSuppliers}
                  loading={loading}
                  data={data}
                />
                <VersionTable
                  loading={loading}
                  data={formatVersions(data)}
                  numberOfVersions={data.totalNumberOfSuppliers}
                  page={currentPage}
                  rowsPerPage={currentPageCount}
                  handleChangePage={this.handleChangePage}
                  handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                  toggleDialogView={this.toggleDialogView}
                />
              </Paper>
              <VersionDialog
                isDialogOpen={isDialogOpen}
                toggleDialogView={this.toggleDialogView}
                currentSupplier={data.singleSupplier}
                supplier={formatVersions(data)[selected]}
                handleApproveVersion={this.handleApproveVersion}
                handleRejectVersion={this.handleRejectVersion}
                activeOutlet={activeOutlet}
              />
            </>
          )}
        </Query>
      </>
    );
  }
}

SupplierVersions.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  approveVersion: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
  session: PropTypes.instanceOf(Object).isRequired
};

const APPROVE_MUTATION = graphql(APPROVE_VERSION, { name: 'approveVersion' });

export default withAuth(compose(APPROVE_MUTATION)(
  withRouter(withStyles(proposeEditStyles)(SupplierVersions))
));
