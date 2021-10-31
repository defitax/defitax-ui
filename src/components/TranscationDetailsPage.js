
import PropTypes from 'prop-types';
import React, { useState,useEffect,useContext  } from 'react';
import { Avatar, Grid, Menu, MenuItem, Typography,Button  } from '@material-ui/core';
import MainCard from './ui-component/cards/MainCard';
import PictureAsPdfTwoToneIcon from '@material-ui/icons/PictureAsPdfOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { AppContext } from "components/layout/MainLayout";
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/styles';
import SearchIcon from '@material-ui/icons/Search';
import logo from './logo-home-page.png';
import { makeStyles } from '@material-ui/styles';
import { gridSpacing } from './store/constant';
import { DataGrid } from '@material-ui/data-grid';
import SendIcon from '@material-ui/icons/Send';

  import { GridToolbarContainer,
    GridToolbarExport
     } from '@material-ui/data-grid';

import {web3Accounts, web3Enable} from "@polkadot/extension-dapp";
import { HttpLink } from 'apollo-link-http';

import Paper from '@material-ui/core/Paper';
import { ApolloClient, ApolloLink, InMemoryCache,useQuery,useLazyQuery, gql } from "@apollo/client";


import {
  InputBase,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: theme.palette.secondary.dark,
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: theme.palette.secondary[800],
            borderRadius: '50%',
            top: '-85px',
            right: '-95px',
            [theme.breakpoints.down('xs')]: {
                top: '-105px',
                right: '-140px'
            }
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: theme.palette.secondary[800],
            borderRadius: '50%',
            top: '-125px',
            right: '-15px',
            opacity: 0.5,
            [theme.breakpoints.down('xs')]: {
                top: '-155px',
                right: '-70px'
            }
        }
    },
    content: {
        padding: '20px !important'
    },
    avatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        backgroundColor: theme.palette.secondary[800],
        marginTop: '8px'
    },
    avatarRight: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.secondary[200],
        zIndex: 1
    },
    cardHeading: {
        fontSize: '2.125rem',
        fontWeight: 500,
        marginRight: '8px',
        marginTop: '14px',
        marginBottom: '6px'
    },
    subHeading: {
        fontSize: '1rem',
        fontWeight: 500,
        color: theme.palette.secondary[200]
    },
    avatarCircle: {
        cursor: 'pointer',
        ...theme.typography.smallAvatar,
        backgroundColor: theme.palette.secondary[200],
        color: theme.palette.secondary.dark
    },
    circleIcon: {
        transform: 'rotate3d(1, 1, 1, 45deg)'
    },
    menuItem: {
        marginRight: '14px',
        fontSize: '1.25rem'
    }
}));
const transLink = new HttpLink({
  uri: "https://api.subquery.network/sq/jamesbayly/transaction-list",
});
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([transLink]),
});

function TranscationDetailsPage(props) {
  const [selection, setSelection] = React.useState([]);
  const [daTable, setDaTable] = React.useState(null);
  const [columnsTwo, setColumnsTwo] = React.useState([]);
 
  const classes = useStyles();
  const [allAccounts, setAllAccounts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [ account,value ] = useContext(AppContext);
  if(!account) return (
    <div>
    <span>No account found; Either connect via wallet or search box</span>
    <div></div>
    <Button variant="contained" endIcon={<SendIcon />} component={Link} to="/dashboard">
  Click to return to dashboard
</Button></div>)
  let EXCHANGE_RATES = gql`
  query($toIds: [String!]){
    transfers(
    filter: {
        or: [{
            toId: {in: $toIds
          }},{
        fromId: {
            in: $toIds
        }}]
    }){
        totalCount
        nodes{
            id
            amount
            toId
            fromId
        }
    }
  }`;
  const { loading, data ,fetchMore } = useQuery(EXCHANGE_RATES, {
    variables: {toIds: [account.address].toString()} ,
  });

  if (loading) return 'Loading...';
  // if (error) return `Error! ${error.message}`;
  (account)
     
// const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
// };
const handleClick = async (event) => {
  
  const { loading, data } = await fetchMore( {
    variables: {toIds: selection} ,
  });
  // dTable = data.transfers.nodes;
  setDaTable(data.transfers.nodes);
  // const daTable = data.transfers.nodes

  const columns2 = [
    { field: 'toId', headerName: 'TO ID', width: 500},
    { field: 'fromId', headerName: 'FROM ID', width: 500 },
    { field: 'amount', headerName: 'AMOUNT', type: 'number',width: 300,valueFormatter: (params) => {
      const valueFormatted = Number(params.value / Math.pow(10,10)).toLocaleString();
      return `${valueFormatted}`;
    }, },
  ];
  setColumnsTwo(columns2);

};
const handleSelect = (row) => {
  setSelected(row);
};

const handleClose = () => {
    setAnchorEl(null);
};
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
   // returns an array of all the injected sources
  // (this needs to be called first, before other requests)
  let columns = [
    { field: 'id', headerName: 'TO ID',flex: 1 },
  ];
  
  const dataTable = new Set();
  data.transfers.nodes.forEach(node => {
    dataTable.add({id: node.toId});
  })
  let dTable = [];
  dataTable.forEach(dt => {
    dTable.push(dt);

  })
  
  // dataTable['count']= dataTable.size;
  return (
    <MainCard title="Transactions">
         {/* <Grid container direction="column">
                        <Grid item>
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <Avatar
                                        variant="rounded"
                                        className={classes.avatarRight}
                                        aria-controls="menu-earning-card"
                                        aria-haspopup="true"
                                        onClick={handleClick}
                                    >
                                        <MoreHorizIcon fontSize="inherit" />
                                    </Avatar>
                                    <Menu
                                        id="menu-earning-card"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                        variant="selectedMenu"
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right'
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right'
                                        }}
                                    >           
                                        <MenuItem onClick={handleClose}>
                                            <PictureAsPdfTwoToneIcon fontSize="inherit" className={classes.menuItem} /> Export
                                        </MenuItem>
                                       
                                    </Menu>
                                </Grid>
                            </Grid>
                        </Grid>
                        </Grid> */}
                        <div style={{ height: 550, width: '100%' }}>
                          { !daTable ? <DataGrid
                              rows={dTable}
                              columns={columns}
                              pageSize={20}
                              rowsPerPageOptions={[20]}
                              checkboxSelection
                              onSelectionModelChange={(newSelectionModel) => {
                                setSelection(newSelectionModel);
                              }}
                              selectionModel={selection}
                              components={{
                                Toolbar: CustomToolbar,
                              }}
                        /> :
                        <DataGrid
                              rows={daTable}
                              columns={columnsTwo}
                              pageSize={20}
                              rowsPerPageOptions={[20]}
                              components={{
                                Toolbar: CustomToolbar,
                              }}
                        />} </div>
                        <Button variant="contained" endIcon={<SendIcon />} onClick={(event) => handleClick(event)}>
  Search
</Button>
     {/* <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>toID</TableCell>
            <TableCell align="right">Select</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.transfers.nodes.map((row,index) => {
              const isItemSelected = isSelected(row.id);
              const id = `enhanced-table-checkbox-${index}`;

              return (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              
              <TableCell align="right" padding="checkbox"> 
              <Checkbox
              onClick={(event) => handleClick(event, row.id)}
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': id,
                          }}
                        /></TableCell>
            </TableRow>)
          })}
        </TableBody>
      </Table>
    </TableContainer> */}
</MainCard>
  );
}

TranscationDetailsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(TranscationDetailsPage);