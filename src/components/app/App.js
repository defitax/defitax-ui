import React from 'react';
import { useSelector } from 'react-redux';

import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, StyledEngineProvider } from '@material-ui/core';

// routing
import Routes from '../routes';

// defaultTheme
import themes from '../themes';

// project imports
import NavigationScroll from '../layout/NavigationScroll';

// ===========================|| APP ||=========================== //

const App = ({ currentUser, nearConfig, wallet }) => {
    const customization = useSelector((state) => state.customization);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <Routes currentUser={currentUser} nearConfig={nearConfig} wallet={wallet}/>
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
