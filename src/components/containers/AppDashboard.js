import React from 'react';
// Components
import Header from '../presentational/Header';
import Footer from '../presentational/Footer';
import AddDevice from '../AddDevice';
import UsersList from '../UsersList';

const AppDashboard = () => {

    return (
        <React.Fragment>
            <Header />
            <AddDevice />
            <UsersList />
            <Footer />
        </React.Fragment>
    );
}

export default AppDashboard;