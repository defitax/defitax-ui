import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
// import AuthenticationRoutes from './AuthenticationRoutes';

// ===========================|| ROUTING RENDER ||=========================== //

export default function ThemeRoutes({  currentUser, nearConfig, wallet }) {
    return useRoutes([MainRoutes( currentUser, nearConfig, wallet)]);
}
