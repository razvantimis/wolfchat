import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';
import { searchRoomByName as searchRoomByNameAction } from '../redux/room';
const useStyles = makeStyles({
  root: {
    padding: '2px 4px',
    display: 'flex',
    width: 250,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },

});

export function ChatRoomSearch() {
  const classes = useStyles();

  const [searchName, setSearchName] = useState('');

  const dispatch = useDispatch()
  const searchRoom = useCallback(
    (searchName) => dispatch(searchRoomByNameAction({ searchName })),
    [dispatch]
  )


  return (
    <Paper className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="Search" onClick={() => searchRoom(searchName)}>
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search rooms"
        inputProps={{ 'aria-label': 'Search Google Maps' }}
        value={searchName}
        onChange={e => {
          setSearchName(e.target.value);
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            searchRoom(searchName)
          }
        }}
      />

    </Paper>
  );
}