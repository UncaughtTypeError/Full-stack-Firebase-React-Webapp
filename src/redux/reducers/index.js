import { combineReducers } from 'redux';
import userLogin from './reducer_userLogin';
import profileObject from './reducer_profileObject';
import { handleLoading } from './reducer_utils';

export default combineReducers({ userLogin, profileObject, handleLoading });