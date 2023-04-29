import { useSelector } from 'react-redux';
import React, { useState,useEffect  } from 'react';
import * as nearAPI from "near-api-js";

import {web3Accounts, web3Enable} from "@polkadot/extension-dapp";
 
// material-ui
import { makeStyles, useTheme } from '@material-ui/styles';
import {
    Button,
    Avatar,
    Card,
    CardContent,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    InputAdornment,
    List,
    ListItemIcon,
    ListItemText,
    OutlinedInput,
    Paper,
    Popper,
    Switch,
    Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';

// third-party
import SendIcon from '@material-ui/icons/Send';

// project imports
import MainCard from '../../../../ui-component/cards/MainCard';
import Transitions from '../../../../ui-component/extended/Transitions';

// assets

// style const
const useStyles = makeStyles((theme) => ({
    navContainer: {
        width: '100%',
        maxWidth: '350px',
        minWidth: '300px',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '10px',
        [theme.breakpoints.down('sm')]: {
            minWidth: '100%'
        }
    },
    headerAvatar: {
        cursor: 'pointer',
        ...theme.typography.mediumAvatar,
        margin: '8px 0 8px 8px !important'
    },
    profileChip: {
        height: '48px',
        alignItems: 'center',
        borderRadius: '27px',
        transition: 'all .2s ease-in-out',
        borderColor: theme.palette.primary.light,
        backgroundColor: theme.palette.primary.light,
        '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            '& svg': {
                stroke: theme.palette.primary.light
            }
        }
    },
    profileLabel: {
        lineHeight: 0,
        padding: '12px'
    },
    listItem: {
        marginTop: '5px'
    },
    cardContent: {
        padding: '16px !important'
    },
    card: {
        backgroundColor: theme.palette.primary.light,
        marginBottom: '16px',
        marginTop: '16px'
    },
    searchControl: {
        width: '100%',
        paddingRight: '8px',
        paddingLeft: '16px',
        marginBottom: '16px',
        marginTop: '16px'
    },
    startAdornment: {
        fontSize: '1rem',
        color: theme.palette.grey[500]
    },
    flex: {
        display: 'flex'
    },
    name: {
        marginLeft: '2px',
        fontWeight: 400
    },
    ScrollHeight: {
        height: '100%',
        maxHeight: 'calc(100vh - 250px)',
        overflowX: 'hidden'
    },
    badgeWarning: {
        backgroundColor: theme.palette.warning.dark,
        color: '#fff'
    }
}));

// ===========================|| PROFILE MENU ||=========================== //

const ProfileSection = ({return_data,currentUser, nearConfig, wallet}) => {
    const AccountsContext = React.createContext('account')
   
    const classes = useStyles();
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);

    const [sdm, setSdm] = React.useState(true);
    const [value, setValue] = React.useState('');
    const [notification, setNotification] = React.useState(false);
    const [selectedIndex] = React.useState(1);

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    // const { connect, keyStores, WalletConnection } = nearAPI;

    // const [walletConnection, setWalletConnection] = useState({});
    const [allAccounts, setAllAccounts] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
//     if(!currentUser || !currentUser.accountId) 
//     return (
//       <div>
//       <span>No account found;  Connect via wallet</span>
//       <div></div>
//       <Button variant="contained" endIcon={<SendIcon />} component={Link} to="/dashboard">
//     Click to return to dashboard
//   </Button></div>)
      useEffect(() => {
         allAccounts.push(currentUser?.accountId);
          setLoading(false);
      }, []);
      const signOutHere = () => {
        wallet.signOut();
            window.location.replace(
              window.location.origin + window.location.pathname
            );
        }
        const signIn = () => {
            wallet.requestSignIn("", "");
            }
      const handleUser = (e) => {
        handleToggle();
        if (currentUser && e.target.textContent === "Sign Out") {
            signOutHere();
        } else if (!currentUser && e.target.textContent === "Connect to wallet") {
            signIn();
        }
      };
      const handleToggle = () => {
            setOpen((prevOpen) => !prevOpen);
        };
    //   const extensionSetup = async () => {
    //     const allInjected = await web3Enable('Wallet-connect-tutorial');
    //     if (allInjected.length === 0) {
    //         setError('No extension installed!');
    //         return;
    //     }
    
    //     const allAccounts = await web3Accounts();
    //   const nearConnection = await nearAPI.connect(connectionConfig);
    //   const w = new nearAPI.WalletConnection(nearConnection,"");
    //   setWalletConnection(w);
    //   w.requestSignIn({
    //     // contractId: "fd1aeeff566bcca0115a102132dc679a1a4b37eba77445f10200e916edb48c16",
    //     // methodNames: [], // optional
    //     // successUrl: "REPLACE_ME://.com/success", // optional redirect URL on success
    //     // failureUrl: "REPLACE_ME://.com/failure" // optional redirect URL on failure
    //   });
    //   const walletAccountObj = w.account();
    //   console.log("walletAccountObj");

    //   console.log(walletAccountObj);

    //   setAllAccounts(allAccounts);
    //   return_data(allAccounts);
    // };
    // const handleToggle = () => {
    //     setOpen((prevOpen) => !prevOpen);
    // };
    // average black flag rather eight wear bamboo truly tube dilemma royal primary
    // creates keyStore using private key in local storage

// const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();
// const connectionConfig = {
//     networkId: "testnet",
//     keyStore: myKeyStore, // first create a key store 
//     nodeUrl: "https://rpc.testnet.near.org",
//     walletUrl: "https://wallet.testnet.near.org",
//     helperUrl: "https://helper.testnet.near.org",
//     explorerUrl: "https://explorer.testnet.near.org",
//   };
  
//   const signOut = () => {
//     walletConnection.signOut();
//   }
//   const connectToWallet = () => {
//     handleToggle();
//       console.log("connecting to wallet");
//       extensionSetup();
//     console.log("connected");

//   }

   
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);
    return (
        <>
            <Chip
                classes={{ label: classes.profileLabel }}
                className={classes.profileChip}
                // icon={
                //     <Avatar
                //         className={classes.headerAvatar}
                //         ref={anchorRef}
                //         aria-controls={open ? 'menu-list-grow' : undefined}
                //         aria-haspopup="true"
                //         color="inherit" 
                //     >Connect to wallet </Avatar>
                // }
                // label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
                label={currentUser  ? "Show account"  : "Connect to wallet"}
                variant="outlined"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleUser}
                color="primary"
            />
         
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                    <CardContent className={classes.cardContent}>
                                        <Grid container direction="column" spacing={0}>
                                            <Grid item className={classes.flex}>
                                                <Typography variant="subtitle2">Address:</Typography>
                                                <Typography component="span" variant="h4" className={classes.name}>
                                                     {
                                                        allAccounts.map(account => <div style={{ marginTop: 10}}>{account}</div>)
                                                    }
                                                </Typography>
                                               
                                            </Grid>
                                        </Grid>
                                        <Chip
                                                classes={{ label: classes.profileLabel }}
                                                className={classes.profileChip}
                                                // icon={
                                                //     <Avatar
                                                //         className={classes.headerAvatar}
                                                //         ref={anchorRef}
                                                //         aria-controls={open ? 'menu-list-grow' : undefined}
                                                //         aria-haspopup="true"
                                                //         color="inherit" 
                                                //     >Connect to wallet </Avatar>
                                                // }
                                                // label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
                                                label={currentUser  ? "Sign Out"  : "Sign Out"}
                                                variant="outlined"
                                                ref={anchorRef}
                                                aria-controls={open ? 'menu-list-grow' : undefined}
                                                aria-haspopup="true"
                                                onClick={signOutHere}
                                                color="primary"
                                            />
                                    </CardContent>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

export default ProfileSection;
