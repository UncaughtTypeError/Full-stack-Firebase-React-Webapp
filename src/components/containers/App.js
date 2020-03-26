import React from 'react';
// Redux
import { useSelector } from 'react-redux';
// Components
import AppDashboard from './AppDashboard';
import AppLogin from './AppLogin';

const App = () => {
    
    const loggedIn = useSelector(state => state.userLogin.loggedIn);

    return (
        <React.Fragment>
            {loggedIn ? (
                <AppDashboard />
            ) : (
                <AppLogin />
            )}
        </React.Fragment>
    );
}

export default App;