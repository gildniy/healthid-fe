
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import GET_SUPPLIER_ORDER_FORM from '../../queries/getSupplierOrderForm';
import SupplierOrderForm from '../../components/ordersAndSuppliers/orders/SupplierOrderForm';
import withAuth from '../../components/withAuth';
import ProductLoader from '../../components/products/shared/productLoader';
import { StateContext } from '../../providers/stateProvider';

export class OrderFormRender extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: 'changeGrid',
      grid: 'grid4'
    });
  }

  static contextType = StateContext;

  render() {
    const { history, match: { params: { supplierOrderId } }, session } = this.props;
    return (
      <Fragment>
        <Query query={GET_SUPPLIER_ORDER_FORM} variables={{ supplierOrderId }}>
          {({ data, loading, error }) => {
            if (loading) return <ProductLoader />;
            if (error) return <div className="error">Error Fetching the data</div>;
            if (!data.supplierOrderForm.orderDetails.length) return history.push('/orders/forms');
            const { orderDetails, additionalNotes } = data.supplierOrderForm;
            return (
              <SupplierOrderForm
                history={history}
                session={session}
                supplierOrderId={supplierOrderId}
                additionalNotes={additionalNotes}
                orderDetails={orderDetails}
              />
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

OrderFormRender.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  session: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object).isRequired,
};

OrderFormRender.defaultProps = {
  session: {}
};

export default withAuth(withRouter(OrderFormRender));
