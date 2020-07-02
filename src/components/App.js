import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthContainer from './authentication/Container';
import ResetPassword from './authentication/PasswordReset';
import StepperNav from './setup/Stepper';
import Navbar from './shared/Navbar/Navbar';
import ComingSoon from './shared/ComingSoon';
import StockControl from './stock_control/stockControl';
import Customers from './customers/customersContainer';
import CustomersCSV from './customers/importCustomersCsv';
import MigrateCustomers from './customers/migrateCustomers';
import IndividualBatch from './stock_control/individualBatch';
import ImportBatches from './stock_control/importBatches';
import ProductPage from './products/ProductPage';
import ReportPage from './reports/ReportPage';
import TeamMemberReport from './reports_team_member/teamMemberReport';
import PricingLoyalty from './pricing_loyalty/pricingLoyalty';
import UserProfile from './profile/Profile';
import ApproveProductDetail from '../container/products/approveProduct';
import ProductDetail from '../containers/productDetail';
import SellScreenContainer from '../containers/sellScreenContainer';
import AddProduct from './products/AddProduct/AddProduct';
import ImportProduct from './products/ImportProduct/ImportProduct';
import MigrateProducts from './products/migrateProducts';
import StaleProducts from './products/staleProducts';
import MigrateSuppliers from './suppliers/migrateSuppliers';
import ProposeProductEdit from './products/ProposeProductEdit';
import AddSupplier from './suppliers/AddSupplier/AddSupplier';
import EditSupplier from './suppliers/EditSupplier';
import SupplierVersions from './suppliers/Revisions/SupplierVersions';
import SalesHistory from '../containers/salesHistoryContainer';
import MainSetup from './main_setup/mainSetup';
import MainProfile from './main_setup/profiles/mainProfileSetup';
import ManageProfile from './main_setup/profiles/manageProfileSetup';
import MainPreferences from './main_setup/outlets/preferences/mainPreferences';
import MainBusinessUpdate from './main_setup/business/mainBusinessSetupUpdate';
import ManageMainOutletSetup from './main_setup/outlets/manageMainOutletSetup';
import MainOutletSetupForm from './main_setup/outlets/mainOutletSetupForm';
import MainInvitedUsers from './main_setup/users/mainInvitedUsers';
import SuppliersPage from './suppliers/SuppliersPage';
import SingleSupplierPage from './suppliers/SingleSupplierPage';
import OrdersAndSuppliers from '../containers/orders/orders';
import InitiatedOrder from '../containers/orders/InitiatedOrder';
import OrderDetail from '../containers/orders/OrderDetail';
import ImportSuppliers from './suppliers/Templates/ImportSuppliers/ImportSuppliers';
import ProductMenuComingSoon from './products/shared/productMenuComingSoon';
import AddUser from './main_setup/users/addUser';
import NewOrder from './ordersAndSuppliers/orders/newOrder';
import SupplierOrderForms from './ordersAndSuppliers/orders/supplierOrderForms';
import OrderForm from '../containers/orders/renderOrderForm';
import SingleBatch from './stock_control/batch/singleBatch';
import ApproveProposedEdits from '../container/products/ApproveProposedEdits';
import SaleHistoryDetail from '../containers/saleHistoryDetailsContainer';
import ManageSingleOutlet from './main_setup/outlets/manageSingleOutlet';
import ManageBusiness from './main_setup/outlets/manageBusiness';
import Dashboard from './dashboard/dashboard';
import NetworkDetector from './networkDetector';
import { queueLink } from '../graphql/client';

import { useStateValue } from '../providers/stateProvider';

const App = ({ session, offline }) => {
  const [{ grid: { isNavbarHidden } }] = Object.values(useStateValue());
  useEffect(() => {
    if (offline) {
      queueLink.close();
    } else {
      queueLink.open();
    }
  }, [offline]);

  return (
    <Fragment>
      {isNavbarHidden ? null : <Navbar session={session} offline={offline} />}
      <Switch>
        <Route exact path="/" component={AuthContainer} />
        <Route exact path="/register" component={AuthContainer} />
        <Route exact path="/setup" render={() => <StepperNav session={session} />} />
        <Route exact path="/dashboard" render={() => <Dashboard session={session} />} />
        <Route exact path="/comingsoon" render={() => <ComingSoon session={session} />} />
        <Route exact path="/main_setup" render={() => <MainSetup session={session} />} />
        <Route exact path="/main_setup/profile" render={() => <MainProfile session={session} />} />
        <Route exact path="/main_setup/profile/manage_profile_user" render={() => <ManageProfile session={session} />} />
        <Route exact path="/main_setup/preferences/:outletID" render={() => <MainPreferences session={session} />} />
        <Route exact path="/main_setup/business_information" render={() => <ManageBusiness session={session} />} />
        <Route exact path="/main_setup/business_information/update" render={() => <MainBusinessUpdate session={session} />} />
        <Route exact path="/main_setup/outlets_registers" render={() => <ManageMainOutletSetup session={session} />} />
        <Route exact path="/main_setup/outlets/edit/:id" render={props => <MainOutletSetupForm {...props} session={session} />} />
        <Route exact path="/main_setup/outlets/:id" render={props => <ManageSingleOutlet {...props} session={session} />} />
        <Route exact path="/main_setup/outlets_registers/new" render={() => <MainOutletSetupForm session={session} />} />
        <Route exact path="/main_setup/users" render={() => <MainInvitedUsers session={session} />} />
        <Route exact path="/main_setup/add_user" render={() => <AddUser session={session} />} />
        <Route exact path="/reset_password/:uid65/:token" component={ResetPassword} />
        <Route exact path="/reports/store" render={() => <ReportPage session={session} />} />
        <Route exact path="/reports/team-member" render={() => <TeamMemberReport session={session} />} />
        <Route exact path="/products/:id/approve" render={() => <ApproveProductDetail session={session} />} />
        <Route exact path="/products" render={() => <ProductPage session={session} />} />
        <Route exact path="/products/:status" render={() => <ProductPage session={session} />} />
        <Route exact path="/products/:id/edit" render={() => <ProposeProductEdit session={session} />} />
        <Route exact path="/profile" component={UserProfile} />
        <Route exact path="/products/:id/details" render={props => <ProductDetail {...props} session={session} />} />
        <Route exact path="/customers" render={() => <Customers session={session} />} />
        <Route exact path="/customers/add_csv" render={() => <CustomersCSV session={session} />} />
        <Route exact path="/customers/migrate" render={() => <MigrateCustomers session={session} />} />
        <Route exact path="/stock" render={() => <StockControl session={session} />} />
        <Route exact path="/stock/add_single" render={() => <IndividualBatch session={session} />} />
        <Route exact path="/stock/add_csv" render={() => <ImportBatches session={session} />} />
        <Route exact path="/suppliers/add" render={() => <AddSupplier session={session} />} />
        <Route exact path="/suppliers/:id/edit" render={() => <EditSupplier session={session} />} />
        <Route exact path="/suppliers/:id/versions" render={() => <SupplierVersions session={session} />} />
        <Route exact path="/pricing" render={() => <PricingLoyalty session={session} />} />
        <Route exact path="/suppliers" render={() => <Redirect to="/suppliers/approved" />} />
        <Route exact path="/suppliers/:status" render={() => <SuppliersPage session={session} />} />
        <Route exact path="/suppliers/:id/details" render={() => <SingleSupplierPage session={session} />} />
        <Route exact path="/suppliers-migrate" render={() => <MigrateSuppliers session={session} />} />
        <Route exact path="/suppliers/new/import" render={() => <ImportSuppliers session={session} />} />
        <Route exact path="/sell" render={() => <SellScreenContainer session={session} offline={offline} />} />
        <Route exact path="/returns" render={() => <SellScreenContainer isReturns session={session} offline={offline} />} />
        <Route exact path="/sell/history" render={() => <SalesHistory session={session} />} />
        <Route exact path="/sell/history/:id" render={() => <SaleHistoryDetail session={session} />} />
        <Route exact path="/product/add" render={() => <AddProduct session={session} />} />
        <Route exact path="/product/import" render={() => <ImportProduct session={session} />} />
        <Route exact path="/orders/list/:id" render={() => <InitiatedOrder session={session} />} />
        <Route exact path="/product-migrate" render={() => <MigrateProducts session={session} />} />
        <Route exact path="/orders/initiate" render={() => <NewOrder session={session} />} />
        <Route exact path="/orders/forms" render={() => <SupplierOrderForms session={session} />} />
        <Route exact path="/orders/forms/:supplierOrderId" render={() => <OrderForm session={session} />} />
        <Route exact path="/product-migrate" render={() => <MigrateProducts session={session} />} />
        <Route exact path="/stale-products" render={() => <StaleProducts session={session} />} />
        <Route exact path="/orders/:status" render={() => <OrdersAndSuppliers session={session} />} />
        <Route exact path="/supplier-order/:supplierOrderId" render={() => <OrderDetail session={session} />} />
        <Route exact path="/orders" render={() => <Redirect to="/orders/open" />} />
        <Route exact path="/productmenucomingsoon" render={() => <ProductMenuComingSoon session={session} />} />
        <Route exact path="/stock/batchDetails" render={props => <SingleBatch {...props} session={session} />} />
        <Route exact path="/products/proposed-edits/:id" render={() => <ApproveProposedEdits session={session} />} />
      </Switch>
    </Fragment>
  );
};

App.propTypes = {
  session: PropTypes.objectOf(PropTypes.object),
  offline: PropTypes.bool
};

App.defaultProps = {
  session: {},
  offline: false
};

export default NetworkDetector(App);
