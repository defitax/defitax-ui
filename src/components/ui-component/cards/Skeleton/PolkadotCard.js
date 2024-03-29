import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, Grid, Menu, MenuItem, Typography,Button  } from '@material-ui/core';
import EarningIcon from '../../../assets/images/icons/earning.svg';
import MainCard from '../MainCard';
import { Link } from 'react-router-dom';
import SendIcon from '@material-ui/icons/Send';


// style constant
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

// ===========================|| SKELETON EARNING CARD ||=========================== //

const PolkadotCard = ({ currentUser, wallet }) => {
    const accountId = currentUser?.accountId;
    const utilities = {
        id: 'utilities',
        title: 'Utilities',
        type: 'group',
        children: [
            {
                id: 'util-typography',
                title: 'Typography',
                type: 'item',
                url: '/transaction/details',
                // icon: icons.IconTypography,
                breadcrumbs: false
            }
        ]
    };
    const classes = useStyles();
    const handleClick = (event) => {
    };
    const signIn = () => {
        wallet.requestSignIn("", "");
        }
    return (
        <MainCard border={false} className={classes.card} contentClass={classes.content} onClick={handleClick}>

<Grid container direction="column" alignItems="center">
                       
                        {accountId ?  
                        <Grid item>
                            <Grid container alignItems="center">
                           
                            <Grid item>
                                    <Typography className={classes.cardHeading}>Welcome</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        :
                        <Grid item>
                        <Grid container alignItems="center">
                            <Grid item>
                                <Typography className={classes.cardHeading}>Please Login First</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                        }
                        {accountId ?  
                        <Grid item>
                            <Grid container alignItems="center">
                           
                                <Grid item>
                                    <Typography className={classes.cardHeading}>{accountId}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        :
                        <Grid item>
                        <Grid container alignItems="center">
                            <Grid item>
                            <Button variant="contained" endIcon={<SendIcon />} onClick={signIn}>
                            Login
                            </Button>

                            </Grid>
                        </Grid>
                    </Grid>
                        }
                                   {accountId &&  
                        <Grid item>
                            <Grid container alignItems="center">
                           
                                <Grid item>
                                <Button component={Link} to="/accounts" variant="contained" endIcon={<SendIcon />} onClick={(event) => handleClick(event)}>
                            Get Start
                            </Button>
                                </Grid>
                            </Grid>
                        </Grid>  }
                       
                    </Grid>
                    </MainCard>
    )
};

export default PolkadotCard;
