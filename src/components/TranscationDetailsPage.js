
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

 function TranscationDetailsPage({ currentUser, wallet ,selection}) {
  const [daTable, setDaTable] = React.useState([]);
  const [data, setData] = React.useState({});
  const [dTable, setDTable] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [pageSize, setPageSize] = React.useState(10);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 25,
    page: 0,
  });
  const columns2 = [
    { field: 'receiver_account_id', headerName: 'Receiver ID', width: 500},
    { field: 'signer_account_id', headerName: 'Signer ID', width: 500 },
    // { field: 'amount', headerName: 'AMOUNT', type: 'number',width: 300,valueFormatter: (params) => {
    //   const valueFormatted = Number(params.value / Math.pow(10,10)).toLocaleString();
    //   return `${valueFormatted}`;
    // }, },
  ];
  const classes = useStyles();
  const [pageModel, setPageModel] = React.useState(1);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const account = currentUser.accountId;
  var totalCount = 0;
  if(!account) 
  return (
    <div>
    <span>No account found;  Connect via wallet</span>
    <div></div>
    <Button variant="contained" endIcon={<SendIcon />} component={Link} to="/dashboard">
  Click to return to dashboard
</Button></div>)
  if(!selection.length) 
  return (
    <div>
    <span>No account select; </span>
    <div></div>
    <Button variant="contained" endIcon={<SendIcon />} component={Link} to="/accounts">
  Click to return to account
</Button></div>)
useEffect( async () => {
  setLoading(true)

  var from = "sbv2-authority.testnet";
  var to = "switchboard-v2.testnet";
  // selection
  Promise.all(
  selection.map( account => fetch(`https://api-testnet.nearblocks.io/v1/txns/count?from=${account}`,{
    method: 'GET',
  headers: {
    'Authorization': 'Bearer 5CF714ACEE2E410D9C1C593CE0E09C21'
  }}))
  ).then(responses => Promise.all(responses.map(response => response.json())))
      .then((data) => {
        console.log(data)
        totalCount = data.reduce((sum, el) => sum += parseInt(el.txns[0].count), 0);
        // totalCount = parseInt(data.txns[0].count , 10 );
      }).then( () =>{
         Promise.all(
        selection.map( account => fetch(`https://api-testnet.nearblocks.io/v1/txns?from=${account}&page=1&per_page=5&order=desc`,{
          method: 'GET',
        headers: {
          'Authorization': 'Bearer 5CF714ACEE2E410D9C1C593CE0E09C21'
        }}))
        ).then(responses => Promise.all(responses.map(response => response.json())))
  // fetch(`https://api-testnet.nearblocks.io/v1/txns?from=${from}&page=1&per_page=15&order=desc`,{
  //     method: 'GET',
  //   headers: {
  //     'Authorization': 'Bearer 5CF714ACEE2E410D9C1C593CE0E09C21'
  //   }
  // })
  // const myHeaders = new Headers({
  //   "Content-Type": "application/json",
  //   Accept: "application/json"
  // });

  // fetch("http://localhost:3000/test.json", {
  //   headers: myHeaders,

  // })      .then((response) => response.json())
      .then((data) => {
        //  setPosts(data);
        // setData(data);
        const isSelected = (name) => selected.indexOf(name) !== -1;

  
  // const dataTable = new Set();
  // data.transfers.nodes.forEach(node => {
  //   dataTable.add({id: node.toId});
  // })
  // set unique to ids. 
  // data.txns.forEach(node =>{
  //   dataTable.add({id: node.receiver_account_id});
  // })
  var te = data.flatMap(s => s.txns)
  setDaTable(te);
  setPageSize(te.length)
  

  // dTable = dataTable;
  // const array = [];
  // dataTable.forEach(v => setDaTable(oldArray => [...oldArray, {id: v}]));
    // dataTable.forEach(dt => {
  //   dTable.push(dt);
  setLoading(false)

  // })

      })
    });

  // if (loading) return (
  //   <div>
  //   <span>Loading</span>
  //   <div></div></div>);
  // if (error) return `Error! ${error.message}`;
},[]);

     
// const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
// };
const handleClick = async (event) => {
  
  // const { loading, data } = await fetchMore( {
  //   variables: {toIds: selection} ,
  // });
  await fetch(`https://api-testnet.nearblocks.io/v1/txns?from=${selection}&page=1&per_page=25&order=desc`,{
    method: 'GET',
    headers: {
      'Authorization': 'Bearer 5CF714ACEE2E410D9C1C593CE0E09C21'
    }
  })
      .then((response) => response.json())
      .then((data) => {
        //  setPosts(data);
        // setData(data);
        setDaTable(data.txns);


      });

  // dTable = data.transfers.nodes;
  // setDaTable(data.transfers.nodes);
  // const daTable = data.transfers.nodes

};
const handlePageChange = async (page)=>{
  setLoading(true)

  // setPageModel(page);
  await Promise.all(
    selection.map( account => fetch(`https://api-testnet.nearblocks.io/v1/txnsfrom=${account}&page=${page}&per_page=5&order=desc`,{
      method: 'GET',
    headers: {
      'Authorization': 'Bearer 5CF714ACEE2E410D9C1C593CE0E09C21'
    }}))
    ).then(responses => Promise.all(responses.map(response => response.json())))
// })
// 
// const myHeaders = new Headers({
//   "Content-Type": "application/json",
//   Accept: "application/json"
// });

// fetch("http://localhost:3000/test.json", {
//   headers: myHeaders,
// .then((response) => response.json())
    .then((data) => {
      //  console.log(data);
      //  setPosts(data);
      // setData(data);
      const isSelected = (name) => selected.indexOf(name) !== -1;
      setDaTable(data.flatMap(s => s.txns));
      setPageSize(daTable.length)
      setLoading(false)


    });
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
                         <DataGrid
                              rows={daTable}
                              columns={columns2}
                              pageSize={pageSize}
                              // rowsPerPageOptions={pageSize}
                              // autoPageSize
                              // rowCount={totalCount}
                              loading={isLoading}

                              getRowId={(row) => row.transaction_hash}
                              // paginationModel={paginationModel}
                              // onPaginationModelChange={setPaginationModel}
                              onPageChange={(e)=> {handlePageChange(e)}}
                              paginationMode="server"

                              // page={pageModel}
                              // checkboxSelection
                              // onSelectionModelChange={(newSelectionModel) => {
                              //   setSelection(newSelectionModel);
                              // }}
                              // selectionModel={selection}
                              components={{
                                Toolbar: CustomToolbar,
                              }}
                        /> 
                         </div>
                         <Button component={Link} to="/accounts" variant="contained" endIcon={<SendIcon />} 
                        //  onClick={(event) => handleSubmit()}
                         >
  Back
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