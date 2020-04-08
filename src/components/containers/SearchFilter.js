import React, { useState, useRef } from 'react';
// Utils
import escapeRegExp from '../../utils/escapeRegExp';
// Redux
import { useDispatch } from 'react-redux';
// Actions
import { handleSearchFilter, storeSearchFilter } from '../../redux/actions/actions';
// Theme
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
// Responsiveness
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
    search: {
        marginLeft: theme.spacing(2),
        '& input': {
            width: '20ch',
            transition: '.3s',
            paddingTop: theme.spacing(1),
        },
        '& input:focus': {
            width: '25ch',
        },
        [theme.breakpoints.down(700)]: { // max-width: 700px
            width: '100%',
            margin: theme.spacing(1, 0),
            '& input': {
                width: '100%',
                padding: theme.spacing(2, 0),
            },
            '& input:focus': {
                width: '100%',
            },
        },
    },
    searchIcon: {
        marginTop: '0 !important',
    }
}));

const SearchFilter = (props) => {

    const { userData } = props;

    const   isBreakpoint = useMediaQuery('(max-width:600px)'),
            classes = useStyles();
    
    const   dispatch                = useDispatch(),
            setSearchFilterResults  = (props) => dispatch(handleSearchFilter(props)),
            setSearchFilterTerm     = (term) => dispatch(storeSearchFilter(term));

    const   [isClear, setIsClear] = useState(false),
            searchField = useRef();

    const onSearchFilter = (value) => {

        setIsClear(false);

        value = value.replace( /\s/g, '');

        let matchArray,
            regex = new RegExp(escapeRegExp(value), 'gi');

        if(value.length) {

            matchArray = userData.filter(user => {
                return user.profile.name.match(regex);
            })

            setSearchFilterResults(matchArray);
            setSearchFilterTerm(value);

        } else {

            setSearchFilterResults(null);
            setSearchFilterTerm(null);

        }
    }

    const onClear = () => {
        setIsClear(true);
        searchField.current.value = '';

        setSearchFilterResults(null);
        setSearchFilterTerm(null);
    };

    return (
        <TextField
            onKeyUp={e => onSearchFilter(e.target.value)}
            className={classes.search}
            id="user-search"
            placeholder="Search Users..."
            variant="filled"
            size={ isBreakpoint ? "medium" : "small" }
            defaultValue={isClear ? '' : undefined}
            inputRef={searchField}
            InputProps={{
                'aria-label': "Search Users...",
                startAdornment: (
                    <InputAdornment className={classes.searchIcon} position="start">
                        <SearchIcon fontSize="small" color="action" />
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="Clear Field"
                            onClick={() => onClear()}
                            size="small"
                        >
                            <ClearIcon fontSize="small" />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );

}

export default SearchFilter;