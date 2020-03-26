import React from 'react';
// Components
import Header from '../presentational/Header';
import Footer from '../presentational/Footer';
import UserProps from '../UserProps';
import AddDevice from '../AddDevice';
import UsersList from '../UsersList';

const AppDashboard = () => {

    return (
        <React.Fragment>
            <Header />
            <UserProps />
            <AddDevice />
            <UsersList />
            <Footer />
        </React.Fragment>
    );
}

export default AppDashboard;