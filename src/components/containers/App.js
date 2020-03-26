import React, { useMemo } from 'react';
// Components
import AppDashboard from './AppDashboard';
import AppLogin from './AppLogin';
// Redux
import { useSelector } from 'react-redux';
// Theme
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const App = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light',
                    primary: {
                        main: '#aa1111',
                    },
                },
            }),
        [prefersDarkMode],
    );
    
    const loggedIn = useSelector(state => state.userLogin.loggedIn);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {loggedIn ? (
                <AppDashboard />
            ) : (
                <AppLogin />
            )}
        </ThemeProvider>
    );
}

export default App;