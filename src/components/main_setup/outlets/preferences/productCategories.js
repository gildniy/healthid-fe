import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import {
  Paper,
  Typography,
  Grid,
  IconButton,
  Button,
  withStyles, Popper
} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { MainPreferencesStyles } from '../../../../assets/styles/setup';
import CategoryInput from './categoryInput';
import Modal from './categoryModal';
import GET_PRODUCT_CATEGORIES from '../../../../queries/productsQueries/productCategoryQuery';
import CREATE_PRODUCT_CATEGORIES from '../../../../mutations/createProductCategory';
import EDIT_PRODUCT_CATEGORIES from '../../../../mutations/editProductCategories';
import DELETE_PRODUCT_CATEGORY from '../../../../mutations/deleteProductCategories';
import notify from '../../../shared/Toaster';

export class Categories extends Component {
  state = {
    newCategory: false,
    newUpdate: false,
    categories: [],
    oldCategories: [],
    updates: [],
    addCategory: {
      name: '',
      salesMarkup: 0,
      isVat: true,
      loyalty: 0
    },
    selectedCategory: {
      name: '',
      salesMarkup: 0,
      isVat: true,
      loyalty: 0
    },
    openModal: false,
    anchorEl: null,
    hoveredId: ''
  };

  static getDerivedStateFromProps(props, state) {
    const { categories } = props;
    const { categories: stateCategories } = state;

    const { loading } = categories;
    if (
      !loading
      && categories
      && categories !== stateCategories
    ) {
      return {
        categories: categories.productCategories,
        oldCategories: categories.productCategories
      };
    }

    return { categories: [] };
  }

  handleOpenModal = category => () => {
    this.setState(
      prevState => ({
        ...prevState,
        selectedCategory: category,
        openModal: true,
      })
    );
  }

  handleCloseModal = () => {
    this.setState({ openModal: false });
  }

  handleAddCategory = name => (event) => {
    const { addCategory } = this.state;
    if (name === 'loyalty' || name === 'salesMarkup') {
      const val = Number(event.target.value);

      if (name === 'salesMarkup' && (val < 0 || val > 100)) return notify('Ensure the value for sales markup is between 0 and 100');
      if (name === 'loyalty' && (val < 0 || val > 1000)) return notify('Ensure the value for loyalty is between 0 and 1000');
      this.setState(
        prevState => ({
          ...prevState,
          newCategory: true,
          addCategory: {
            ...prevState.addCategory,
            [name]: val
          }
        })
      );
    } else {
      const val = event.target.value;
      this.setState(
        prevState => ({
          ...prevState,
          newCategory: true,
          addCategory: {
            ...prevState.addCategory,
            [name]: val
          }
        })
      );
    }

    return addCategory;
  }

  handleChange = data => (event) => {
    const { field, category: id } = data;
    const { categories } = this.state;
    this.setState({ newUpdate: true });

    if (field === 'loyaltyWeight' || field === 'markup') {
      if (field === 'markup' && (event.target.value < 0 || event.target.value > 100)) return notify('Ensure the value for sales markup is between 0 and 100');
      if (field === 'loyaltyWeight' && (event.target.value < 0 || event.target.value > 1000)) return notify('Ensure the value for loyalty is between 0 and 1000');
    }

    const category = categories.filter(
      specificCategory => specificCategory.id === id
    )[0];

    const otherCategories = categories.filter(
      specificCategory => specificCategory.id !== id
    );
    category[field] = event.target.value;

    return this.setState(prevState => (
      {
        categories: [...otherCategories, category],
        updates: [...prevState.updates, category.id]
      }
    ));
  }

  handleConfirmChanges = () => {
    const { updates, categories, newCategory } = this.state;

    updates.filter(
      (update, index) => updates.indexOf(update) >= index
    ).map(
      id => Number(id)
    );


    const finalUpdates = categories.filter(
      category => updates.includes(category.id)
    );

    newCategory && this.handleCreate();

    finalUpdates.map(
      update => this.handleUpdates(update)
    );

    return this.setState({ newCategory: false, newUpdate: false, updates: [] });
  }

  handleCreate = () => {
    const businessId = localStorage.getItem('businessId');
    const { addCategory } = this.state;
    const { createProductCategory, categories } = this.props;
    const { refetch } = categories;

    return createProductCategory({
      variables: {
        businessId,
        isVat: addCategory.isVat,
        markup: addCategory.salesMarkup,
        name: addCategory.name,
        loyaltyWeight: addCategory.loyalty,
      }
    }).then(
      ({ data }) => {
        notify(`Category '${data.createProductCategory.productCategory.name}' created successfully`);
        this.setState(
          {
            addCategory: {
              name: '',
              salesMarkup: 0,
              isVat: true,
              loyalty: 0
            }
          }
        );
        refetch();
      }
    ).catch(
      err => (err.graphQLErrors
        ? err.graphQLErrors.map(
          error => notify(error.message)
        )
        : notify(err)
      )
    );
  }

  handleUpdates = (update) => {
    const { editProductCategories, categories } = this.props;
    const { refetch } = categories;

    return editProductCategories({
      variables: {
        id: update.id,
        isVatApplicable: update.isVatApplicable,
        markup: update.markup,
        name: update.name,
        loyaltyWeight: update.loyaltyWeight,
      }
    }).then(
      ({ data }) => {
        notify(`Category '${data.editProductCategory.productCategory.name}' updated successfully`);
        refetch();
      }
    ).catch(
      err => (err.graphQLErrors
        ? err.graphQLErrors.map(
          error => notify(error.message)
        )
        : notify(err)
      )
    );
  }

  handleShowInput = () => this.setState(
    prevState => ({ ...prevState, newCategory: !prevState.newCategory })
  );

  handleDelete = (id, event) => {
    const { deleteProductCategory, categories } = this.props;
    const { refetch } = categories;

    return deleteProductCategory({
      variables: {
        id,
      }
    }).then(
      () => {
        notify('Category has been deleted successfully');
        refetch();
        this.setState(
          {
            addCategory: {
              name: '',
              salesMarkup: 0,
              isVat: true,
              loyalty: 0
            }
          }
        );
        this.handleClosePopper(event);
      }
    ).catch(
      err => (err.graphQLErrors
        ? err.graphQLErrors.map(
          error => notify(error.message)
        )
        : notify(err)
      )
    );
  }

  handleOpenPopper = (selectedId, event) => {
    const { anchorEl } = this.state;
    this.setState({
      selectedId,
      anchorEl: anchorEl ? null : event.currentTarget,
    });
  };

  handleClosePopper(event) {
    const { anchorEl } = this.state;
    this.setState({
      anchorEl: anchorEl ? null : event.currentTarget,
    });
  }

  handleOnRowHover(id) {
    this.setState(prevState => ({
      ...prevState,
      hoveredId: id,
    }));
  }

  handleMouseLeave() {
    const { hoveredId } = this.state;
    this.setState({ hoveredId: '' });
    if (hoveredId) {
      this.setState(prevState => ({
        ...prevState,
        hoveredId: ''
      }));
    }
  }

  render() {
    const {
      categories,
      addCategory,
      newCategory,
      openModal,
      selectedCategory,
      selectedId,
      anchorEl,
      hoveredId
    } = this.state;
    const { classes } = this.props;
    const open = Boolean(anchorEl);
    return (
      <Fragment>
        <Grid item xs={12}>
          <Paper elevation={2} style={MainPreferencesStyles.paperTitle}>
            <Typography variant="subtitle2">
              Category Settings
            </Typography>
            <Grid style={MainPreferencesStyles.categoryBox}>
              <IconButton
                aria-label="Add"
                style={MainPreferencesStyles.categoryIcons}
                onClick={this.handleShowInput}
              >
                <Add />
              </IconButton>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12} style={{ borderBottom: 'solid 1px #E8E8E8' }}>
              <Grid container>
                <Grid item xs={3} style={MainPreferencesStyles.categoryNameTitle}>
                  <Typography variant="subtitle2">Category</Typography>
                </Grid>
                <Grid item xs={3} style={MainPreferencesStyles.categoryTitle}>
                  <Typography variant="subtitle2" align="center">Default Sales Markup (%)</Typography>
                  <Typography variant="caption" align="justify" style={MainPreferencesStyles.categorySubtitle}>
                    The amount by which the cost of a product is increased
                    in order to derive the selling price
                  </Typography>
                </Grid>
                <Grid item xs={3} style={MainPreferencesStyles.categoryTitle}>
                  <Typography variant="subtitle2" align="center">VAT Applicability</Typography>
                  <Typography variant="caption" align="center" style={MainPreferencesStyles.categorySubtitle}>
                    The application of value added tax on the purchase of a product
                  </Typography>
                </Grid>
                <Grid item xs={3} style={MainPreferencesStyles.categoryTitle}>
                  <Typography variant="subtitle2" align="center">Loyalty Calculator</Typography>
                  <Typography variant="caption" align="center" style={MainPreferencesStyles.categorySubtitle}>
                    The # of loyalty points loyalty members receive for certain amount spent
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Modal
                  openModal={openModal}
                  handleCloseModal={this.handleCloseModal}
                  handleChange={this.handleChange}
                  handleDelete={this.handleDelete}
                  handleConfirmChanges={this.handleConfirmChanges}
                  stateData={selectedCategory}
                />
                <Popper open={open} anchorEl={anchorEl} style={MainPreferencesStyles.deletePopper}>
                  <Paper style={MainPreferencesStyles.deletePopperInner}>
                    <Typography>
                      Are you sure you want to delete this category?
                    </Typography>
                    <Grid container style={MainPreferencesStyles.deletePopperButtonsBox} align="center">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={event => this.handleDelete(selectedId, event)}
                        style={MainPreferencesStyles.deletePopperButton}
                      >
                        Yes
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={event => this.handleClosePopper(event)}
                      >
                        No
                      </Button>
                    </Grid>
                  </Paper>
                </Popper>
                {
                  categories.sort((a, b) => Number(a.id) - Number(b.id)).map(
                    category => (
                      <Grid
                        container
                        item
                        xs={12}
                        key={category.id}
                        className={classes.categoryRow}
                        onMouseEnter={() => this.handleOnRowHover(category.id)}
                        onMouseLeave={e => this.handleMouseLeave(e)}
                      >
                        <Grid item xs={3} style={MainPreferencesStyles.categoryNameCell}>
                          <Typography>{category.name}</Typography>
                        </Grid>
                        <Grid item xs={3} style={MainPreferencesStyles.categoryCell}>
                          <Typography>{category.markup}</Typography>
                        </Grid>
                        <Grid item xs={3} style={MainPreferencesStyles.categoryCell} align="center">
                          <Typography>{category.isVatApplicable ? 'Yes' : 'No'}</Typography>
                        </Grid>
                        <Grid item xs={2} style={MainPreferencesStyles.categoryCell} align="center">
                          <Grid item xs={12}>
                            <Typography>{category.loyaltyWeight}</Typography>
                          </Grid>
                        </Grid>
                        <Grid item xs={1}>
                          <Grid item xs={12} style={hoveredId !== category.id ? { display: 'none' } : {}}>
                            <Tooltip title="Edit Category" placement="bottom">
                              <IconButton onClick={this.handleOpenModal(category)}>
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Remove Category" placement="bottom">
                              <IconButton onClick={
                                event => this.handleOpenPopper(category.id, event)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </Grid>
                        </Grid>
                      </Grid>
                    )
                  )
                }
              </Grid>
            </Grid>
            {
              newCategory
                ? (
                  <CategoryInput
                    classes={classes}
                    handleChange={this.handleAddCategory}
                    stateData={addCategory}
                    handleShowInput={this.handleShowInput}
                    handleConfirmChanges={this.handleConfirmChanges}
                  />
                )
                : null
            }
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

Categories.defaultProps = {
  createProductCategory: () => { },
  editProductCategories: () => { },
  deleteProductCategory: () => { },
  categories: {
    productCategories: [],
    refetch: () => { }
  },
  classes: {
    categoryRow: '',
    categoryCell: ''
  }
};

Categories.propTypes = {
  createProductCategory: PropTypes.func,
  classes: PropTypes.shape({
    categoryRow: PropTypes.string,
    categoryCell: PropTypes.string
  }),
  editProductCategories: PropTypes.func,
  deleteProductCategory: PropTypes.func,
  categories: PropTypes.shape({
    productCategories: PropTypes.arrayOf(PropTypes.shape({})),
    refetch: PropTypes.func,
  }),
};

export default compose(
  graphql(GET_PRODUCT_CATEGORIES, {
    name: 'categories',
    options: () => ({ variables: { businessId: localStorage.getItem('businessId') } })
  }),
  graphql(CREATE_PRODUCT_CATEGORIES, {
    name: 'createProductCategory'
  }),
  graphql(EDIT_PRODUCT_CATEGORIES, {
    name: 'editProductCategories'
  }),
  graphql(DELETE_PRODUCT_CATEGORY, {
    name: 'deleteProductCategory'
  }),
)(withStyles(MainPreferencesStyles)(Categories));
