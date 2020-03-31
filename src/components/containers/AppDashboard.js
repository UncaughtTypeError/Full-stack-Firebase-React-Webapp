import React from 'react';
// Components
import Header from '../presentational/Header';
import Body from '../presentational/Body';
import Footer from '../presentational/Footer';
import AddDevice from '../AddDevice';
import UsersList from '../UsersList';
import SnackbarAlert from '../presentational/SnackbarAlert';

const AppDashboard = () => {

    return (
        <React.Fragment>
            <Header />
            <Body>
                <AddDevice />
                <UsersList />
                <SnackbarAlert />
            </Body>
            <Footer />
        </React.Fragment>
    );
}

export default AppDashboard;