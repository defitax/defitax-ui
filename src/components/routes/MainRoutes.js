import React, { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';

// dashboard routing
const Dashboard = Loadable(lazy(() => import('../Dashboard')));
const AccountsPage = Loadable(lazy(() => import('../AccountsPage')));
const TransactionDetailsPage = Loadable(lazy(() => import('../TranscationDetailsPage')));

// // utilities routing
// const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
// const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// // sample page routing
// const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ===========================|| MAIN ROUTING ||=========================== //
const MainRoutes = (currentUser, nearConfig, wallet ) => {
    const [selection, setSelection] = React.useState([]);

    return ({
    path: '/',
    element: <MainLayout currentUser={currentUser} nearConfig={nearConfig} wallet={wallet} />,
    children: [
        {
            path: '/',
            element: <Dashboard currentUser={currentUser} wallet={wallet} />
        },
        {
            path: '/dashboard',
            element: <Dashboard currentUser={currentUser} wallet={wallet} />
        },
        {
            path: '/dashboard/default',
            element: <Dashboard currentUser={currentUser} wallet={wallet} />
        },
        {
            path: '/accounts',
            element: <AccountsPage currentUser={currentUser} nearConfig={nearConfig} wallet={wallet} selection={selection} onSelection={setSelection} />
        },
        {
            path: '/transaction/details',
            element: <TransactionDetailsPage currentUser={currentUser} nearConfig={nearConfig} wallet={wallet} selection={selection} />
        }
    ]
})}; 

export default MainRoutes;
