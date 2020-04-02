import { combineReducers } from 'redux';
import userLogin from './reducer_userLogin';
import profileObject from './reducer_profileObject';
import devicesObject from './reducer_devicesObject';
import alertObject from './reducer_alertObject';
import dataDisplayObject from './reducer_dataDisplayObject';
import searchFilterResults from './reducer_searchFilterResults';
import { handleLoading } from './reducer_utils';

export default combineReducers({ 
    userLogin, 
    profileObject, 
    devicesObject, 
    alertObject, 
    dataDisplayObject, 
    searchFilterResults, 
    handleLoading 
});