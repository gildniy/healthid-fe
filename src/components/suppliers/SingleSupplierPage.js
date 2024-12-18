import React, { Fragment, Component } from 'react';
import { graphql, compose, Query } from 'react-apollo';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  TextField,
  withStyles,
  Paper,
  TableCell,
  Button, Divider, Typography
} from '@material-ui/core';
import APPROVE_SUPPLIER_MUTATION from '../../mutations/approveSupplierMutation';
import withAuth from '../withAuth';
import notify from '../shared/Toaster';
import SupplierHeader from './Templates/SupplierHeader';
import SupplierNotes from './Templates/SupplierNotes';
import SupplierDescription from './Templates/SupplierDescription';
import SupplierInformation from './Templates/SupplierInformation';
import { supplierDetailStyles } from '../../assets/styles/suppliers/supplierDetail';
import SupplierCommentary from './Templates/SupplierCommentary';
import SingleSupplierPageLoader from './Templates/SingleSupplierPageLoader';
import GET_SINGLE_SUPPLIER from '../../queries/getSingleSupplierQuery';
import { SeparatorStyles } from '../../assets/styles/shared/separator';

import { StateContext } from '../../providers/stateProvider';

export class SingleSupplierPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approved: false
    };
  }

  componentDidMount() {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: 'changeGrid',
      grid: 'grid4'
    });
  }

  renderTextField = (style, name, label, value) => (
    <TextField
      className={style}
      id={name}
      name={name}
      label={label}
      value={value}
      fullWidth
      InputProps={{ disableUnderline: true, readOnly: true }}
    />
  );

  renderTableCell = (align, style, name) => (
    <TableCell align={align || ''} style={style}>
      {name}
    </TableCell>
  );

  suppliersLink = props => <Link to="/suppliers" {...props} />;


  handleSupplierApproval = () => {
    const {
      approveSupplier, match, refetch
    } = this.props;
    const { id } = match.params;

    approveSupplier({
      variables: {
        id
      }
    })
      .then((res) => {
        notify(`${res.data.approveSupplier.supplier.name} is now an approved supplier`);
        this.setState({ approved: true });
        refetch();
      })
      .catch((error) => {
        notify(error.message.slice(14));
      });
  }

  static contextType = StateContext;

  render() {
    const { approved } = this.state;
    const { classes, match, session } = this.props;
    const { id } = match.params;

    const { me: { activeOutlet } } = session;
    const outletId = activeOutlet.id;

    return (
      <div>
        <Query
          query={GET_SINGLE_SUPPLIER}
          variables={{ id }}
        >
          {({
            loading, error, data, refetch
          }) => {
            if (loading) {
              return (
                <SingleSupplierPageLoader />
              );
            }
            if (error) return `Error! ${error.message}`;

            const supplier = data.singleSupplier;

            return (
              <div name="single_supplier">
                <SupplierHeader
                  classes={classes}
                  supplier={supplier}
                  previousPage="/suppliers"
                >
                  {
                    !(supplier.isApproved || approved)
                      ? (
                        <Button
                          variant="outlined"
                          className={classes.approveButton}
                          onClick={this.handleSupplierApproval}
                        >
                          Approve
                        </Button>
                      )
                      : (
                        <>
                          <Link
                            style={{ textDecoration: 'none' }}
                            to={`/suppliers/${id}/edit`}
                          >
                            <Button
                              variant="outlined"
                              className={classes.editButton}
                            >
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="outlined"
                            className={classes.approveButton}
                            onClick={() => { window.location.href = `/suppliers/${id}/versions`; }}
                          >
                            View All Versions
                          </Button>
                        </>
                      )
                  }
                </SupplierHeader>

                <Paper elevation={2} className={classes.paper}>
                  <Fragment>
                    <Typography paragraph variant="h6" align="center" style={SeparatorStyles.paperHeader}>
                      {supplier.name }
                    </Typography>
                    <Divider />
                  </Fragment>

                  <SupplierDescription
                    classes={classes}
                    renderTextField={this.renderTextField}
                    supplier={supplier}
                    activeOutlet={outletId}
                    image="image.png"
                  />

                  <SupplierInformation
                    classes={classes}
                    renderTextField={this.renderTextField}
                    supplier={supplier}
                  />

                  {supplier.isApproved ? (
                    <SupplierNotes
                      classes={classes}
                      renderTableCell={this.renderTableCell}
                      supplier={supplier}
                      session={session}
                      refetch={refetch}
                    />
                  ) : (
                    <SupplierCommentary
                      classes={classes}
                      renderTextField={this.renderTextField}
                      supplier={supplier}
                    />
                  )}
                  <div className={classes.spaceDiv} />
                </Paper>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

SingleSupplierPage.propTypes = {
  session: PropTypes.objectOf(PropTypes.object),
  classes: PropTypes.instanceOf(Object),
  refetch: PropTypes.func,
  approveSupplier: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(Object).isRequired
};

SingleSupplierPage.defaultProps = {
  session: { me: {} },
  classes: {},
  refetch: () => { }
};

const APPROVE_SUPPLIER = graphql(APPROVE_SUPPLIER_MUTATION, {
  name: 'approveSupplier'
});

export default compose(APPROVE_SUPPLIER)(
  withAuth(withRouter(withStyles(supplierDetailStyles)(SingleSupplierPage)))
);
