import PropTypes from 'prop-types';
import React, { useState,useEffect  } from 'react';

import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import logo from './logo-home-page.png';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid,Skeleton } from '@material-ui/core';
import PolkadotCard from './ui-component/cards/Skeleton/PolkadotCard';
import KusamaCard from './ui-component/cards/Skeleton/KusamaCard';
import ProfileSection from 'components/layout/MainLayout/Header/ProfileSection';
import SearchSection from 'components/layout/MainLayout/Header/SearchSection';
import { gridSpacing } from './store/constant';

import {web3Accounts, web3Enable} from "@polkadot/extension-dapp";

 
import {
  InputBase,
} from '@material-ui/core';

const useStyles = makeStyles({
  cardHeading: {
      marginRight: '8px',
      marginTop: '18px',
      marginBottom: '14px'
  }
});

function Dashboard(props) {
  const classes = useStyles();
  const [allAccounts, setAllAccounts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

  useEffect(() => {
      extensionSetup()
  }, []);
  const extensionSetup = async () => {
    const allInjected = await web3Enable('Wallet-connect-tutorial');
    if (allInjected.length === 0) {
        setError('No extension installed!');
        return;
    }
  
//     // returns an array of { address, meta: { name, source } }
//     // meta.source contains the name of the extension that provides this account
    const allAccounts = await web3Accounts();
    
//     // the address we use to use for signing, as injected
//   //   const SENDER = '5DTestUPts3kjeXSTMyerHihn1uwMfLj8vU8sqF7qYrFabHE';
    
//     // finds an injector for an address
//   //   const injector = await web3FromAddress(SENDER);
    
//   //   // sign and send our transaction - notice here that the address of the account
//   //   // (as retrieved injected) is passed through as the param to the `signAndSend`,
//   //   // the API then calls the extension to present to the user and get it signed.
//   //   // Once complete, the api sends the tx + signature via the normal process
//   //   api.tx.balances
//   //     .signAndSend(SENDER, { signer: injector.signer }, (status) => { ... });
  setAllAccounts(allAccounts);
};

   // returns an array of all the injected sources
  // (this needs to be called first, before other requests)
  

  return (
  

    <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
            <Grid item lg={4} md={6} sm={6} xs={12}>
            
                <PolkadotCard  />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
                <KusamaCard />
            </Grid>
            {/* <Grid item lg={4} md={6} sm={6} xs={12}>
                <PolkadotCard isLoading={isLoading} />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
                <PolkadotCard isLoading={isLoading} />
            </Grid> */}
        </Grid>
    </Grid>

</Grid>
      
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Dashboard);