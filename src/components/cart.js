import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Axios from 'axios';
import { Button,Icon } from 'semantic-ui-react';
import { urlApi } from './../support/urlApi';
import { connect } from 'react-redux';
import swal from 'sweetalert';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class CustomPaginationActionsTable extends React.Component {
  state = {
    rows: [],
    page: 0,
    rowsPerPage: 5,
    isEdit : false,
    editItem : {}
  };

  componentDidMount(){
    this.getDataApi()
  }

  getDataApi = () => {
      Axios.get(urlApi + '/cart?id_user=' + this.props.id)
      .then((res) => this.setState({rows : res.data}))
      .catch((err) => console.log(err))
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  
  onBtnEditClick = (param) => {
    this.setState({isEdit : true, editItem : param})
  } 

  onBtnDelete = (id) => {
      Axios.delete(urlApi + '/cart/' + id)
      .then(() => {
          this.getDataApi()
      })
      .catch((err) => console.log(err))
  };


  renderJsx = () => {
    var jsx = this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((val) => {
        return (
            <TableRow key={val.id}>
                <TableCell>{val.id}</TableCell>
                  <TableCell component="th" scope="row">
                    {val.nama}
                  </TableCell>
                  <TableCell>Rp. {val.harga}</TableCell>
                  <TableCell>{val.discount}%</TableCell>
                  <TableCell>{val.category}</TableCell>
                  <TableCell><img src={val.img} alt='..' width='50px'/></TableCell>
                  <TableCell>{val.qty}</TableCell>
                  <TableCell>
                  <Button animated color='blue' onClick={() => this.onBtnEditClick(val)}>
                    <Button.Content visible>Edit</Button.Content>
                    <Button.Content hidden>
                    <Icon name='edit' />
                     </Button.Content>
                 </Button>
                 <Button animated color='red' onClick={() => this.onBtnDelete(val.id)}>
                    <Button.Content visible>Del</Button.Content>
                    <Button.Content hidden>
                    <Icon name='delete' />
                     </Button.Content>
                 </Button>
                 </TableCell>
            </TableRow>
        )
    })
    return jsx
  }

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    // destructering untuk manggil di place holder dengan cukup nama,harga dll
    var {nama,harga,discount,category,deskripsi,img} = this.state.editItem;
    
      return (
        <div className='container'>
          <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
              <Table className={classes.table}>
              <TableHead>
                  <TableRow>
                      <TableCell style={{fontSize:'24px',fontWeight:'600'}}>ID</TableCell>
                      <TableCell style={{fontSize:'24px',fontWeight:'600'}}>NAMA</TableCell>
                      <TableCell style={{fontSize:'24px',fontWeight:'600'}}>HARGA</TableCell>
                      <TableCell style={{fontSize:'24px',fontWeight:'600'}}>DISC</TableCell>
                      <TableCell style={{fontSize:'24px',fontWeight:'600'}}>CTGRY</TableCell>
                      <TableCell style={{fontSize:'24px',fontWeight:'600'}}>IMG</TableCell>
                      <TableCell style={{fontSize:'24px',fontWeight:'600'}}>QTY</TableCell>
                  </TableRow>
              </TableHead>
                <TableBody>
                    {this.renderJsx()}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 48 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      colSpan={3}
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        native: true,
                      }}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActionsWrapped}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </Paper>
         
          </div>
        );
    
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return{
    role : state.user.role,
    id : state.user.id
  }
}

export default connect (mapStateToProps)(withStyles(styles)(CustomPaginationActionsTable));