import React from 'react';
// Firebase
import { FirebaseContext } from '../../config/firebase/';

const withFirebase = (WrappedComponent) => (props) => {

    return (
        <FirebaseContext.Consumer>
            {data => {
                return (
                        <WrappedComponent firebase={data} {...props} />
                    );
            }}
        </FirebaseContext.Consumer>
    )

}

export default withFirebase;