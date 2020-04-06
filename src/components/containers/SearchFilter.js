import React, { useState, useEffect } from 'react';
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
        }
    },
    searchIcon: {
        marginTop: '0 !important',
    }
}));

const SearchFilter = (props) => {

    const { userData } = props;

    const classes = useStyles();
    
    const   dispatch                = useDispatch(),
            setSearchFilterResults  = (props) => dispatch(handleSearchFilter(props)),
            setSearchFilterTerm     = (term) => dispatch(storeSearchFilter(term));

    const   [isClear, setIsClear] = useState(false);

    const onSearchFilter = (value) => {

        setIsClear(false);

        const matchArray = userData.filter(user => {
            let regex = new RegExp(escapeRegExp(value), 'gi');
            
            return user.profile.name.match(regex);
        });

        setSearchFilterResults(matchArray);
        setSearchFilterTerm(value);

    }

    const onClear = () => {
        setIsClear(true);
    };

    useEffect(() => {

    }, []);

    return (
        <TextField
            onKeyUp={e => onSearchFilter(e.target.value)}
            className={classes.search}
            id="user-search"
            placeholder="Search Users..."
            variant="filled"
            size="small"
            value={isClear ? '' : null}
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