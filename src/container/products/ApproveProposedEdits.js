import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import GET_PROPOSED_EDIT from '../../queries/productsQueries/getProposedEdit';
import ApproveEdits from '../../components/products/proposedEdits/ApproveProposedEdits';
import ProductLoader from '../../components/products/shared/productLoader';
import withAuth from '../../components/withAuth';

export const ApproveProposedEditsContainer = (props) => {
  const {
    match: {
      params: { id }
    },
    session,
    history
  } = props;

  return (
    <Query query={GET_PROPOSED_EDIT} variables={{ id }}>
      {({ data, loading, error }) => {
        let result;
        if (loading) {
          result = <ProductLoader />;
        } else if (error) {
          result = <div name="error">Error</div>;
        } else {
          result = <ApproveEdits history={history} edit={data.proposedEdit} session={session} />;
        }
        return result;
      }}
    </Query>
  );
};

ApproveProposedEditsContainer.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  session: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.function).isRequired
};

export default withAuth(withRouter(ApproveProposedEditsContainer));
